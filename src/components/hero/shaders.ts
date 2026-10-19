// GLSL for the hero scene. Colours are passed in as raw sRGB vec3s and the
// renderer outputs without colour conversion, so hex values map 1:1 to screen.

// 2D simplex noise — Ian McEwan / Ashima Arts (MIT)
const noise = /* glsl */ `
  vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x   + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
    for (int i = 0; i < 3; i++) {
      v += a * snoise(p);
      p = r * p * 2.03;
      a *= 0.45;
    }
    return v;
  }
`;

const hash = /* glsl */ `
  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }
`;

/* ------------------------------------------------------------------ */
/* Sky                                                                 */
/* ------------------------------------------------------------------ */

export const skyVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const skyFragment = /* glsl */ `
  uniform vec2 uFocus;
  uniform float uAspect;
  uniform float uGlow;
  uniform vec3 uTop;
  uniform vec3 uHorizon;
  uniform vec3 uBottom;
  uniform vec3 uGlowColor;
  uniform vec3 uWarm;
  varying vec2 vUv;
  ${hash}

  void main() {
    float y = vUv.y;
    vec3 col = mix(uBottom, uTop, smoothstep(0.0, 1.0, y));

    // Soft band of light along the horizon line
    float band = exp(-pow((y - uFocus.y) * 3.4, 2.0));
    col = mix(col, uHorizon, band * 0.85);

    // Dawn glow around the point where the paths converge
    // Tighter on portrait screens so the glow doesn't flood a narrow viewport
    vec2 d = (vUv - uFocus) * vec2(uAspect, 1.0) / max(min(uAspect, 1.0), 0.6);
    float r = length(d);
    float stretched = length(d * vec2(0.55, 1.6));
    col += uGlowColor * exp(-r * 2.8) * 0.4 * uGlow;
    col += uWarm * exp(-stretched * stretched * 10.0) * 0.32 * uGlow;
    col += uWarm * exp(-r * r * 45.0) * 0.4 * uGlow;

    // Dither to break up banding in the dark gradient
    col += (hash12(gl_FragCoord.xy) - 0.5) / 255.0;
    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ------------------------------------------------------------------ */
/* Terrain — topographic contour lines over flowing fbm hills          */
/* ------------------------------------------------------------------ */

export const terrainVertex = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  uniform float uFlow;
  uniform sampler2D uValley;
  uniform vec4 uMapBounds;
  varying float vH;
  varying vec3 vWorld;
  varying float vDepth;
  varying float vValley;
  ${noise}

  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);

    vec2 p = world.xz * 0.065 + vec2(0.0, -uTime * uFlow);
    float n = fbm(p) * 1.15;
    n += 0.25 * smoothstep(0.0, 1.0, 1.0 - abs(snoise(p * 0.5 + 3.7))) - 0.12;

    // Hills grow taller towards the horizon and stay calm near the camera
    float distanceRamp = mix(0.35, 1.0, smoothstep(6.0, -18.0, world.z));

    // The three paths carve gentle valleys through the land
    vec2 mapUv = (world.xz - uMapBounds.xy) / uMapBounds.zw;
    float valley = 0.0;
    if (mapUv.x > 0.0 && mapUv.x < 1.0 && mapUv.y > 0.0 && mapUv.y < 1.0) {
      valley = clamp(texture2D(uValley, mapUv).r * 1.3, 0.0, 1.0);
    }

    float h = n * uAmp * distanceRamp;
    h = mix(h, min(h, 0.0) * 0.3 - 0.35, valley * 0.92);
    world.y += h;

    vH = h;
    vWorld = world.xyz;
    vValley = valley;
    vec4 mv = viewMatrix * world;
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

export const terrainFragment = /* glsl */ `
  uniform float uTime;
  uniform float uReveal;
  uniform float uIntro;
  uniform vec3 uFocus;
  uniform vec3 uPointer;
  uniform float uPointerStrength;
  uniform sampler2D uSpill;
  uniform vec4 uMapBounds;
  uniform vec3 uBase;
  uniform vec3 uLine;
  uniform vec3 uLineHigh;
  uniform vec3 uWarm;
  uniform vec3 uFog;
  varying float vH;
  varying vec3 vWorld;
  varying float vDepth;
  varying float vValley;

  // Anti-aliased iso-line for value v; fades out when lines get too dense
  float isoLine(float v, float width) {
    float fw = fwidth(v);
    float f = fract(v);
    float d = min(f, 1.0 - f);
    float line = 1.0 - smoothstep(fw * width * 0.5, fw * (width * 0.5 + 1.0), d);
    return line * (1.0 - smoothstep(0.18, 0.45, fw));
  }

  void main() {
    float level = vH * 4.5;
    float minor = isoLine(level, 1.0);
    float major = isoLine(level / 4.0, 1.8);
    float lines = minor * 0.4 + major * 0.9;

    float heightTint = smoothstep(-0.8, 1.6, vH);
    vec3 lineCol = mix(uLine, uLineHigh, heightTint);

    // Light from the convergence point, plus ripples spreading outward
    float dF = length(vWorld.xz - uFocus.xz);
    float focusLight = exp(-dF * 0.085);
    float ripple = pow(0.5 + 0.5 * sin(dF * 0.75 - uTime * 1.1), 10.0) * exp(-dF * 0.045);

    // Coloured light cast by the paths onto the land below them
    vec2 mapUv = clamp((vWorld.xz - uMapBounds.xy) / uMapBounds.zw, 0.0, 1.0);
    vec3 spill = texture2D(uSpill, mapUv).rgb;

    // Soft lantern that follows the cursor
    vec2 dp = vWorld.xz - uPointer.xz;
    float pointer = exp(-dot(dp, dp) * 0.09) * uPointerStrength;

    float lightAmt = 0.45 + focusLight * 1.4 + ripple * 0.9 + pointer * 1.6;
    vec3 col = uBase * (0.75 + heightTint * 0.5);
    col += lineCol * lines * lightAmt;
    col += uWarm * lines * focusLight * 0.55;
    col += spill * (0.12 + lines * 1.5);
    col += uLineHigh * pointer * 0.04;

    // Scanning front during the intro reveal
    float front = exp(-pow((vDepth - uReveal + 3.0) * 0.45, 2.0)) * (1.0 - uIntro);
    col += uLineHigh * lines * front * 2.5;

    float reveal = 1.0 - smoothstep(uReveal - 6.0, uReveal, vDepth);
    float far = smoothstep(26.0, 52.0, vDepth);
    col = mix(col, uFog, far * 0.6);
    float edge = 1.0 - smoothstep(26.0, 38.0, abs(vWorld.x));
    float alpha = reveal * (1.0 - smoothstep(40.0, 56.0, vDepth)) * edge;

    gl_FragColor = vec4(col, alpha);
  }
`;

/* ------------------------------------------------------------------ */
/* Path ribbons — screen-aligned glowing lines with travelling pulses */
/* ------------------------------------------------------------------ */

export const ribbonVertex = /* glsl */ `
  uniform vec2 uResolution;
  uniform float uWidth;
  uniform float uMinPx;
  attribute vec3 aPrev;
  attribute vec3 aNext;
  attribute float aSide;
  attribute float aProgress;
  varying float vSide;
  varying float vProgress;
  varying float vDepth;

  void main() {
    mat4 mvp = projectionMatrix * modelViewMatrix;
    vec4 c = mvp * vec4(position, 1.0);
    vec4 p = mvp * vec4(aPrev, 1.0);
    vec4 n = mvp * vec4(aNext, 1.0);

    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 dir = normalize(n.xy / n.w * aspect - p.xy / p.w * aspect);
    vec2 normal = vec2(-dir.y, dir.x);

    // World-space width, but never thinner than a couple of pixels
    float w = uWidth * projectionMatrix[1][1] / c.w;
    w = max(w, uMinPx * 2.0 / uResolution.y);
    w *= smoothstep(0.0, 0.05, aProgress) * mix(1.0, 0.55, smoothstep(0.75, 1.0, aProgress));

    normal *= w * 0.5;
    normal.x /= aspect.x;
    c.xy += normal * aSide * c.w;

    vSide = aSide;
    vProgress = aProgress;
    vDepth = c.w;
    gl_Position = c;
  }
`;

export const ribbonFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uDraw;
  uniform float uOffset;
  uniform float uIntensity;
  varying float vSide;
  varying float vProgress;
  varying float vDepth;

  void main() {
    if (vProgress > uDraw) discard;

    float d = abs(vSide);
    float glow = exp(-d * d * 5.0);
    float core = exp(-d * d * 55.0);

    // Comet-like pulses travelling toward the convergence point
    float pulse = pow(fract(vProgress * 2.6 - uTime * 0.11 + uOffset), 14.0);
    // Bright head while the path is being drawn in
    float head = exp(-pow((uDraw - vProgress) * 45.0, 2.0)) * (1.0 - step(0.999, uDraw));

    float ends = smoothstep(0.0, 0.08, vProgress);
    float distFade = mix(1.0, 0.6, smoothstep(10.0, 40.0, vDepth));

    vec3 col = uColor * (glow * 0.45 + core * 1.1);
    col += vec3(1.0) * core * (pulse * 0.9 + head * 1.6);
    col += uColor * glow * pulse * 0.6;

    float a = (glow * 0.6 + core) * ends * distFade * uIntensity;
    gl_FragColor = vec4(col, a);
  }
`;

/* ------------------------------------------------------------------ */
/* Particles streaming along the paths, and ambient motes              */
/* ------------------------------------------------------------------ */

export const pointsVertex = /* glsl */ `
  uniform float uScale;
  uniform float uTime;
  attribute float aSize;
  attribute float aAlpha;
  attribute float aSeed;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = max(aSize * uScale / -mv.z, 1.5);
    float twinkle = 0.65 + 0.35 * sin(uTime * 2.4 + aSeed * 43.0);
    vAlpha = aAlpha * twinkle;
    vColor = aColor;
  }
`;

export const motesVertex = /* glsl */ `
  uniform float uScale;
  uniform float uTime;
  uniform float uOpacity;
  attribute float aSize;
  attribute float aSeed;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    float range = 7.0;
    float rise = mod(pos.y + uTime * (0.08 + aSeed * 0.12), range);
    pos.y = 0.2 + rise;
    pos.x += sin(uTime * 0.3 + aSeed * 31.0) * 0.6;
    pos.z += cos(uTime * 0.25 + aSeed * 17.0) * 0.6;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = max(aSize * uScale / -mv.z, 1.0);

    float lifeFade = smoothstep(0.0, 1.2, rise) * (1.0 - smoothstep(range - 1.8, range, rise));
    float distFade = 1.0 - smoothstep(30.0, 50.0, -mv.z);
    float twinkle = 0.5 + 0.5 * sin(uTime * (1.0 + aSeed * 2.0) + aSeed * 61.0);
    vAlpha = lifeFade * distFade * twinkle * uOpacity;
    vColor = aColor;
  }
`;

export const pointsFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float soft = smoothstep(0.5, 0.0, d);
    soft *= soft;
    float core = smoothstep(0.16, 0.0, d);
    gl_FragColor = vec4(vColor + core * 0.6, vAlpha * soft);
  }
`;

/* ------------------------------------------------------------------ */
/* Convergence glow — camera-facing flare                              */
/* ------------------------------------------------------------------ */

export const flareVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const flareFragment = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;
  uniform vec3 uColor;
  uniform vec3 uWarm;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv - 0.5;
    float d = length(p) * 2.0;
    float breathe = 1.0 + 0.08 * sin(uTime * 1.3);

    float core = exp(-d * d * 220.0 / breathe);
    float inner = exp(-d * d * 28.0 / breathe);
    float halo = exp(-d * 4.5);
    float streak = exp(-abs(p.y) * 160.0) * exp(-abs(p.x) * 5.0);

    vec3 col = vec3(1.0, 0.96, 0.86) * core * 2.2;
    col += uWarm * inner * 0.8;
    col += mix(uColor, uWarm, 0.4) * halo * 0.22;
    col += mix(uWarm, vec3(1.0), 0.4) * streak * 0.55;

    float a = clamp(core + inner + halo * 0.5 + streak, 0.0, 1.0) * uIntensity * (1.0 - smoothstep(0.85, 1.0, d));
    gl_FragColor = vec4(col, a);
  }
`;
