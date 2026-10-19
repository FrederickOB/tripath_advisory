import * as THREE from "three";
import {
  flareFragment,
  flareVertex,
  motesVertex,
  pointsFragment,
  pointsVertex,
  ribbonFragment,
  ribbonVertex,
  skyFragment,
  skyVertex,
  terrainFragment,
  terrainVertex,
} from "./shaders";

/*
 * "Three paths, one horizon" — Policy, People and Planet travel as streams of
 * light across a living topographic landscape and converge at a dawn glow.
 */

const rgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
};
const vec3 = (hex: string) => {
  const [r, g, b] = rgb(hex);
  return new THREE.Vector3(r / 255, g / 255, b / 255);
};

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

const PALETTE = {
  skyTop: "#020a08",
  skyBottom: "#04140f",
  horizon: "#0c3a2f",
  glow: "#1f8f73",
  warm: "#f3c98b",
  base: "#03100c",
  line: "#175f4c",
  lineHigh: "#62d3aa",
  fog: "#0a2b23",
};

// Where the three paths meet
const FOCUS = new THREE.Vector3(11, 2.4, -32);

const PATHS: { name: string; color: string; points: [number, number, number][] }[] = [
  {
    name: "policy",
    color: "#5aa6ec",
    points: [
      [-11, 0.75, 4],
      [-6, 0.8, -1.5],
      [-5, 0.8, -7.5],
      [-0.5, 0.85, -12],
      [5.5, 1.0, -18],
      [8.4, 1.25, -24.5],
      [10, 1.8, -29],
    ],
  },
  {
    name: "people",
    color: "#2fd0aa",
    points: [
      [3, 0.7, 6],
      [2.2, 0.75, -1],
      [0.5, 0.8, -8],
      [5.8, 0.85, -14.5],
      [7.8, 1.15, -21.5],
      [10.2, 1.7, -27.8],
    ],
  },
  {
    name: "planet",
    color: "#93e46f",
    points: [
      [9, 0.75, 4],
      [6.5, 0.8, -3],
      [8.6, 0.8, -10],
      [5.2, 0.9, -16.5],
      [9.4, 1.2, -22.5],
      [10.9, 1.7, -28.2],
    ],
  },
];

// World-space XZ rectangle covered by the spill / valley maps
const MAP = { minX: -16, minZ: -38, sizeX: 32, sizeZ: 48 };
const MAP_W = 256;
const MAP_H = 384;

const SAMPLES = 360;
const CAMERA_BASE = new THREE.Vector3(0, 4.2, 10);

type Lut = { p: Float32Array; n: Float32Array; b: Float32Array };

function buildLut(curve: THREE.CatmullRomCurve3): Lut {
  const pts = curve.getSpacedPoints(SAMPLES - 1);
  const frames = curve.computeFrenetFrames(SAMPLES - 1, false);
  const p = new Float32Array(SAMPLES * 3);
  const n = new Float32Array(SAMPLES * 3);
  const b = new Float32Array(SAMPLES * 3);
  for (let i = 0; i < SAMPLES; i++) {
    pts[i].toArray(p, i * 3);
    frames.normals[i].toArray(n, i * 3);
    frames.binormals[i].toArray(b, i * 3);
  }
  return { p, n, b };
}

function buildRibbon(lut: Lut) {
  const position = new Float32Array(SAMPLES * 6);
  const prev = new Float32Array(SAMPLES * 6);
  const next = new Float32Array(SAMPLES * 6);
  const side = new Float32Array(SAMPLES * 2);
  const progress = new Float32Array(SAMPLES * 2);
  const index: number[] = [];

  for (let i = 0; i < SAMPLES; i++) {
    const ip = Math.max(i - 1, 0);
    const inx = Math.min(i + 1, SAMPLES - 1);
    for (let s = 0; s < 2; s++) {
      const v = i * 2 + s;
      for (let c = 0; c < 3; c++) {
        position[v * 3 + c] = lut.p[i * 3 + c];
        prev[v * 3 + c] = lut.p[ip * 3 + c];
        next[v * 3 + c] = lut.p[inx * 3 + c];
      }
      side[v] = s === 0 ? -1 : 1;
      progress[v] = i / (SAMPLES - 1);
    }
    if (i < SAMPLES - 1) {
      // Counter-clockwise on screen, since the width is applied in screen space
      const a = i * 2;
      index.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(position, 3));
  geo.setAttribute("aPrev", new THREE.BufferAttribute(prev, 3));
  geo.setAttribute("aNext", new THREE.BufferAttribute(next, 3));
  geo.setAttribute("aSide", new THREE.BufferAttribute(side, 1));
  geo.setAttribute("aProgress", new THREE.BufferAttribute(progress, 1));
  geo.setIndex(index);
  return geo;
}

function createMap() {
  const canvas = document.createElement("canvas");
  canvas.width = MAP_W;
  canvas.height = MAP_H;
  const ctx = canvas.getContext("2d")!;
  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return { ctx, texture };
}

export interface HeroSceneOptions {
  reducedMotion?: boolean;
  onReady?: () => void;
}

export class HeroScene {
  private container: HTMLElement;
  private options: HeroSceneOptions;
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(42, 1, 0.1, 120);
  private mobile: boolean;

  private luts: Lut[];
  private spill = createMap();
  private valley = createMap();
  private spillComplete = false;

  private skyMat: THREE.ShaderMaterial;
  private terrainMat: THREE.ShaderMaterial;
  private ribbonMats: THREE.ShaderMaterial[] = [];
  private particleMat: THREE.ShaderMaterial;
  private moteMat: THREE.ShaderMaterial;
  private flareMat: THREE.ShaderMaterial;
  private flare: THREE.Mesh;

  private particleGeo = new THREE.BufferGeometry();
  private particle!: {
    path: Uint8Array;
    t: Float32Array;
    speed: Float32Array;
    radius: Float32Array;
    theta: Float32Array;
    omega: Float32Array;
    seed: Float32Array;
  };

  private draw = [0, 0, 0];
  private time = 0;
  private introTime = 0;
  private last = 0;
  private raf = 0;
  private running = false;
  private visible = true;
  private readyFired = false;
  private frameMs = 16;
  private slowFrames = 0;
  private downgraded = false;

  private pointer = new THREE.Vector2();
  private pointerTarget = new THREE.Vector2();
  private pointerWorld = new THREE.Vector3(FOCUS.x, 0, FOCUS.z);
  private pointerStrength = 0;
  private lastMouseMove = -Infinity;
  private scroll = 0;
  private scrollTarget = 0;
  private framing = { x: 0.36, y: 0.12 };

  private raycaster = new THREE.Raycaster();
  private groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.3);
  private tmpV3 = new THREE.Vector3();
  private tmpV2 = new THREE.Vector2();
  private camPos = new THREE.Vector3();

  private resizeObserver: ResizeObserver;
  private intersectionObserver: IntersectionObserver;

  constructor(container: HTMLElement, options: HeroSceneOptions = {}) {
    this.container = container;
    this.options = options;
    this.mobile =
      Math.min(window.innerWidth, window.innerHeight) < 640 ||
      window.matchMedia("(pointer: coarse)").matches;

    // Throws when WebGL is unavailable — the caller falls back to CSS
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.mobile ? 1.5 : 1.75));
    this.renderer.setClearColor(PALETTE.skyBottom);
    const canvas = this.renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.appendChild(canvas);

    const curves = PATHS.map(
      (p) =>
        new THREE.CatmullRomCurve3(
          [...p.points.map(([x, y, z]) => new THREE.Vector3(x, y, z)), FOCUS.clone()],
          false,
          "centripetal"
        )
    );
    this.luts = curves.map(buildLut);
    this.drawValleyMap();

    this.skyMat = this.createSky();
    this.terrainMat = this.createTerrain();
    this.createRibbons();
    this.particleMat = this.createParticles();
    this.moteMat = this.createMotes();
    this.flareMat = this.createFlareMaterial();
    this.flare = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), this.flareMat);
    this.flare.position.copy(FOCUS);
    this.flare.renderOrder = 10;
    this.flare.frustumCulled = false;
    this.scene.add(this.flare);

    if (options.reducedMotion) {
      // Settle straight into the finished composition
      this.introTime = 100;
      this.time = 14;
    }

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      this.updateRunning();
    });
    this.intersectionObserver.observe(container);

    document.addEventListener("visibilitychange", this.updateRunning);
    window.addEventListener("scroll", this.onScroll, { passive: true });
    if (!options.reducedMotion) {
      window.addEventListener("pointermove", this.onPointerMove, { passive: true });
    }

    this.resize();
    this.onScroll();
    this.updateRunning();
  }

  /* ---------------------------------------------------------------- */
  /* Scene construction                                                 */
  /* ---------------------------------------------------------------- */

  private createSky() {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3)
    );
    const mat = new THREE.ShaderMaterial({
      vertexShader: skyVertex,
      fragmentShader: skyFragment,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uFocus: { value: new THREE.Vector2(0.7, 0.6) },
        uAspect: { value: 1 },
        uGlow: { value: 0 },
        uTop: { value: vec3(PALETTE.skyTop) },
        uHorizon: { value: vec3(PALETTE.horizon) },
        uBottom: { value: vec3(PALETTE.skyBottom) },
        uGlowColor: { value: vec3(PALETTE.glow) },
        uWarm: { value: vec3(PALETTE.warm) },
      },
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.frustumCulled = false;
    mesh.renderOrder = -10;
    this.scene.add(mesh);
    return mat;
  }

  private createTerrain() {
    const segX = this.mobile ? 180 : 340;
    const segZ = this.mobile ? 170 : 300;
    const geo = new THREE.PlaneGeometry(1, 1, segX, segZ);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const zNear = 11;
    const zFar = -58;
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i) + 0.5;
      const v = pos.getY(i) + 0.5;
      // Rows are packed tighter near the camera, where they're largest on screen
      pos.setXYZ(i, (u - 0.5) * 78, 0, zNear - (zNear - zFar) * Math.pow(v, 1.6));
    }
    geo.deleteAttribute("normal");
    geo.deleteAttribute("uv");
    geo.computeBoundingSphere();

    const mapBounds = new THREE.Vector4(MAP.minX, MAP.minZ, MAP.sizeX, MAP.sizeZ);
    const mat = new THREE.ShaderMaterial({
      vertexShader: terrainVertex,
      fragmentShader: terrainFragment,
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uAmp: { value: 0.4 },
        uFlow: { value: 0.045 },
        uValley: { value: this.valley.texture },
        uSpill: { value: this.spill.texture },
        uMapBounds: { value: mapBounds },
        uReveal: { value: 0 },
        uIntro: { value: 0 },
        uFocus: { value: FOCUS },
        uPointer: { value: this.pointerWorld },
        uPointerStrength: { value: 0 },
        uBase: { value: vec3(PALETTE.base) },
        uLine: { value: vec3(PALETTE.line) },
        uLineHigh: { value: vec3(PALETTE.lineHigh) },
        uWarm: { value: vec3(PALETTE.warm) },
        uFog: { value: vec3(PALETTE.fog) },
      },
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.renderOrder = 1;
    this.scene.add(mesh);
    return mat;
  }

  private createRibbons() {
    PATHS.forEach((path, k) => {
      const mat = new THREE.ShaderMaterial({
        vertexShader: ribbonVertex,
        fragmentShader: ribbonFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uResolution: { value: new THREE.Vector2(1, 1) },
          uWidth: { value: 0.26 },
          uMinPx: { value: 3 },
          uColor: { value: vec3(path.color) },
          uTime: { value: 0 },
          uDraw: { value: 0 },
          uOffset: { value: k * 0.37 },
          uIntensity: { value: 1 },
        },
      });
      const mesh = new THREE.Mesh(buildRibbon(this.luts[k]), mat);
      mesh.frustumCulled = false;
      mesh.renderOrder = 3;
      this.scene.add(mesh);
      this.ribbonMats.push(mat);
    });
  }

  private createParticles() {
    const perPath = this.mobile ? 120 : 260;
    const count = perPath * PATHS.length;
    const p = {
      path: new Uint8Array(count),
      t: new Float32Array(count),
      speed: new Float32Array(count),
      radius: new Float32Array(count),
      theta: new Float32Array(count),
      omega: new Float32Array(count),
      seed: new Float32Array(count),
    };
    const color = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const white = new THREE.Vector3(1, 1, 1);

    for (let i = 0; i < count; i++) {
      const k = Math.floor(i / perPath);
      const c = vec3(PATHS[k].color).lerp(white, Math.random() * 0.35);
      p.path[i] = k;
      p.t[i] = Math.random();
      p.speed[i] = 0.025 + Math.random() * 0.035;
      p.radius[i] = 0.04 + Math.pow(Math.random(), 2) * 0.32;
      p.theta[i] = Math.random() * Math.PI * 2;
      p.omega[i] = (Math.random() - 0.5) * 2.4;
      p.seed[i] = Math.random();
      c.toArray(color, i * 3);
      size[i] = 0.07 + Math.pow(Math.random(), 3) * 0.16;
    }
    this.particle = p;

    const geo = this.particleGeo;
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(count * 3), 3).setUsage(THREE.DynamicDrawUsage)
    );
    geo.setAttribute(
      "aAlpha",
      new THREE.BufferAttribute(new Float32Array(count), 1).setUsage(THREE.DynamicDrawUsage)
    );
    geo.setAttribute("aColor", new THREE.BufferAttribute(color, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(p.seed, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader: pointsVertex,
      fragmentShader: pointsFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uScale: { value: 1 }, uTime: { value: 0 } },
    });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    points.renderOrder = 4;
    this.scene.add(points);
    return mat;
  }

  private createMotes() {
    const count = this.mobile ? 240 : 520;
    const position = new Float32Array(count * 3);
    const color = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const seed = new Float32Array(count);
    const tints = [vec3("#cdf3e2"), vec3("#f6dcaa"), vec3("#9fe0c6")];

    for (let i = 0; i < count; i++) {
      position[i * 3] = -22 + Math.random() * 46;
      position[i * 3 + 1] = Math.random() * 7;
      position[i * 3 + 2] = -42 + Math.random() * 48;
      tints[i % tints.length].toArray(color, i * 3);
      size[i] = 0.03 + Math.pow(Math.random(), 2) * 0.07;
      seed[i] = Math.random();
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(position, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(color, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader: motesVertex,
      fragmentShader: pointsFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uScale: { value: 1 }, uTime: { value: 0 }, uOpacity: { value: 0 } },
    });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    points.renderOrder = 2;
    this.scene.add(points);
    return mat;
  }

  private createFlareMaterial() {
    return new THREE.ShaderMaterial({
      vertexShader: flareVertex,
      fragmentShader: flareFragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: 0 },
        uColor: { value: vec3(PALETTE.glow) },
        uWarm: { value: vec3(PALETTE.warm) },
      },
    });
  }

  /* ---------------------------------------------------------------- */
  /* Light maps                                                         */
  /* ---------------------------------------------------------------- */

  private strokePath(ctx: CanvasRenderingContext2D, lut: Lut, last: number) {
    ctx.beginPath();
    for (let i = 0; i <= last; i += 2) {
      const x = ((lut.p[i * 3] - MAP.minX) / MAP.sizeX) * MAP_W;
      const y = (1 - (lut.p[i * 3 + 2] - MAP.minZ) / MAP.sizeZ) * MAP_H;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Many thin-to-wide passes build a smooth falloff instead of hard-edged steps
  private strokeSoft(
    ctx: CanvasRenderingContext2D,
    lut: Lut,
    last: number,
    [r, g, b]: readonly number[],
    maxWidth: number,
    peak: number
  ) {
    const passes = 10;
    for (let i = 1; i <= passes; i++) {
      ctx.strokeStyle = `rgba(${r},${g},${b},${peak / passes})`;
      ctx.lineWidth = (maxWidth * i) / passes;
      this.strokePath(ctx, lut, last);
    }
  }

  private prepareMap(ctx: CanvasRenderingContext2D) {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, MAP_W, MAP_H);
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }

  private drawValleyMap() {
    const { ctx, texture } = this.valley;
    this.prepareMap(ctx);
    for (const lut of this.luts) {
      this.strokeSoft(ctx, lut, SAMPLES - 1, [255, 255, 255], 80, 1.15);
    }
    texture.needsUpdate = true;
  }

  private drawSpillMap() {
    const { ctx, texture } = this.spill;
    this.prepareMap(ctx);
    PATHS.forEach((path, k) => {
      const last = Math.floor(this.draw[k] * (SAMPLES - 1));
      if (last < 2) return;
      this.strokeSoft(ctx, this.luts[k], last, rgb(path.color), 44, 0.6);
    });
    texture.needsUpdate = true;
  }

  /* ---------------------------------------------------------------- */
  /* Frame loop                                                         */
  /* ---------------------------------------------------------------- */

  private updateRunning = () => {
    const shouldRun =
      this.visible && document.visibilityState === "visible" && !this.options.reducedMotion;
    if (shouldRun && !this.running) {
      this.running = true;
      this.last = performance.now();
      this.raf = requestAnimationFrame(this.tick);
    } else if (!shouldRun && this.running) {
      this.running = false;
      cancelAnimationFrame(this.raf);
    }
  };

  private tick = (now: number) => {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.tick);
    const rawMs = now - this.last;
    this.last = now;
    const dt = Math.min(rawMs / 1000, 1 / 20);
    this.time += dt;
    // The intro follows the wall clock so slow devices still finish it on cue
    this.introTime += Math.min(rawMs / 1000, 0.25);
    this.update(dt);
    this.render();
    this.watchPerformance(rawMs);
  };

  private render() {
    this.renderer.render(this.scene, this.camera);
    if (!this.readyFired) {
      this.readyFired = true;
      this.options.onReady?.();
    }
  }

  // Drop to 1x pixel ratio once if the device is clearly struggling
  private watchPerformance(ms: number) {
    if (this.downgraded || this.introTime < 4) return;
    this.frameMs += (ms - this.frameMs) * 0.05;
    this.slowFrames = this.frameMs > 26 ? this.slowFrames + 1 : 0;
    if (this.slowFrames > 120) {
      this.downgraded = true;
      this.renderer.setPixelRatio(1);
      this.resize();
    }
  }

  private update(dt: number) {
    const t = this.introTime;
    const time = this.time;

    // Intro timeline
    const reveal = easeOutCubic(clamp01(t / 2.8));
    const glow = easeOutCubic(clamp01((t - 2.3) / 1.6));
    const introCam = 1 - easeInOutCubic(clamp01(t / 4.4));
    for (let k = 0; k < PATHS.length; k++) {
      this.draw[k] = easeInOutCubic(clamp01((t - 0.5 - k * 0.28) / 2.5));
    }

    // Smoothed inputs
    const damp = (rate: number) => 1 - Math.exp(-dt * rate);
    this.pointer.lerp(this.pointerTarget, damp(2.5));
    this.scroll += (this.scrollTarget - this.scroll) * damp(6);
    const mouseActive = performance.now() - this.lastMouseMove < 2500 ? 1 : 0;
    this.pointerStrength += (mouseActive * glow - this.pointerStrength) * damp(mouseActive ? 3 : 1.2);

    // Camera — always framed so the convergence point holds its place on screen
    this.camPos.set(
      CAMERA_BASE.x + this.pointer.x * 0.9 - introCam * 2.5,
      CAMERA_BASE.y - this.pointer.y * 0.35 + introCam * 2.4 + this.scroll * 1.4,
      CAMERA_BASE.z + introCam * 8 - this.scroll * 7
    );
    this.frameCamera(this.camPos);

    // Cursor lantern on the terrain
    if (this.pointerStrength > 0.001) {
      this.raycaster.setFromCamera(this.pointer, this.camera);
      if (this.raycaster.ray.intersectPlane(this.groundPlane, this.tmpV3)) {
        this.pointerWorld.lerp(this.tmpV3, damp(8));
      }
    }

    const terrain = this.terrainMat.uniforms;
    terrain.uTime.value = time;
    terrain.uReveal.value = reveal * 64;
    terrain.uIntro.value = smoothstep(2.0, 3.4, t);
    terrain.uAmp.value = 0.4 + 1.3 * easeOutCubic(clamp01((t - 0.2) / 3));
    terrain.uPointerStrength.value = this.pointerStrength;

    this.ribbonMats.forEach((mat, k) => {
      mat.uniforms.uTime.value = time;
      mat.uniforms.uDraw.value = this.draw[k];
    });

    if (!this.spillComplete) {
      this.drawSpillMap();
      this.spillComplete = this.draw.every((d) => d >= 1);
    }

    this.updateParticles(dt, time);
    this.particleMat.uniforms.uTime.value = time;
    this.moteMat.uniforms.uTime.value = time;
    this.moteMat.uniforms.uOpacity.value = smoothstep(0.8, 3.5, t);

    // Convergence flare + sky glow
    this.flare.quaternion.copy(this.camera.quaternion);
    this.flare.scale.setScalar(this.mobile ? 8 : 11);
    this.flareMat.uniforms.uTime.value = time;
    this.flareMat.uniforms.uIntensity.value = glow;

    this.tmpV3.copy(FOCUS).project(this.camera);
    this.skyMat.uniforms.uFocus.value.set(this.tmpV3.x * 0.5 + 0.5, this.tmpV3.y * 0.5 + 0.5);
    this.skyMat.uniforms.uGlow.value = 0.35 + 0.65 * glow;
  }

  private updateParticles(dt: number, time: number) {
    const p = this.particle;
    const position = this.particleGeo.attributes.position as THREE.BufferAttribute;
    const alpha = this.particleGeo.attributes.aAlpha as THREE.BufferAttribute;
    const pos = position.array as Float32Array;
    const al = alpha.array as Float32Array;
    const last = SAMPLES - 1;

    for (let i = 0; i < p.t.length; i++) {
      let t = p.t[i] + p.speed[i] * dt;
      if (t >= 1) t -= 1;
      p.t[i] = t;

      const k = p.path[i];
      const lut = this.luts[k];
      const f = t * last;
      const i0 = Math.floor(f);
      const i1 = Math.min(i0 + 1, last);
      const a = f - i0;
      const o0 = i0 * 3;
      const o1 = i1 * 3;

      // Particles spiral around the path and gather in as they approach the focus
      const r = p.radius[i] * (1 - smoothstep(0.78, 1, t)) * (0.7 + 0.3 * Math.sin(time * 0.8 + p.seed[i] * 20));
      const th = p.theta[i] + time * p.omega[i];
      const cr = Math.cos(th) * r;
      const sr = Math.sin(th) * r;

      for (let c = 0; c < 3; c++) {
        const base = lut.p[o0 + c] + (lut.p[o1 + c] - lut.p[o0 + c]) * a;
        const nrm = lut.n[o0 + c] + (lut.n[o1 + c] - lut.n[o0 + c]) * a;
        const bin = lut.b[o0 + c] + (lut.b[o1 + c] - lut.b[o0 + c]) * a;
        pos[i * 3 + c] = base + nrm * cr + bin * sr;
      }

      const visible = t <= this.draw[k] ? 1 : 0;
      al[i] = smoothstep(0, 0.05, t) * (1 - smoothstep(0.92, 1, t)) * visible * 0.9;
    }
    position.needsUpdate = true;
    alpha.needsUpdate = true;
  }

  private frameCamera(position: THREE.Vector3) {
    const cam = this.camera;
    cam.position.copy(position);
    cam.lookAt(FOCUS);
    const tanV = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
    const tanH = tanV * cam.aspect;
    cam.rotateY(Math.atan(this.framing.x * tanH));
    cam.rotateX(-Math.atan(this.framing.y * tanV));
    cam.updateMatrixWorld();
  }

  /* ---------------------------------------------------------------- */
  /* Events                                                             */
  /* ---------------------------------------------------------------- */

  private resize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (!width || !height) return;

    this.renderer.setSize(width, height, false);
    const aspect = width / height;
    const cam = this.camera;
    cam.aspect = aspect;
    // Portrait screens get a wider lens and a centred, higher focal point
    const wide = smoothstep(0.7, 1.4, aspect);
    cam.fov = 60 - 18 * wide;
    cam.updateProjectionMatrix();
    this.framing.x = 0.04 + 0.32 * wide;
    this.framing.y = 0.36 - 0.24 * wide;

    const buffer = this.renderer.getDrawingBufferSize(this.tmpV2);
    const dpr = this.renderer.getPixelRatio();
    const scale = buffer.y * 0.5 * cam.projectionMatrix.elements[5];
    this.ribbonMats.forEach((mat) => {
      mat.uniforms.uResolution.value.copy(buffer);
      mat.uniforms.uMinPx.value = 2.4 * dpr;
    });
    this.particleMat.uniforms.uScale.value = scale;
    this.moteMat.uniforms.uScale.value = scale;
    this.skyMat.uniforms.uAspect.value = aspect;

    if (!this.running) {
      // Static (reduced motion or paused) — refresh the frame in place
      this.update(0);
      this.render();
    }
  }

  private onScroll = () => {
    const height = this.container.clientHeight || window.innerHeight;
    this.scrollTarget = clamp01(window.scrollY / height);
  };

  private onPointerMove = (e: PointerEvent) => {
    const rect = this.container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    if (x < 0 || x > 1 || y < 0 || y > 1) return;
    this.pointerTarget.set(x * 2 - 1, -(y * 2 - 1));
    if (e.pointerType === "mouse") this.lastMouseMove = performance.now();
  };

  dispose() {
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.resizeObserver.disconnect();
    this.intersectionObserver.disconnect();
    document.removeEventListener("visibilitychange", this.updateRunning);
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("pointermove", this.onPointerMove);

    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
        obj.geometry.dispose();
        (obj.material as THREE.Material).dispose();
      }
    });
    this.spill.texture.dispose();
    this.valley.texture.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.domElement.remove();
  }
}
