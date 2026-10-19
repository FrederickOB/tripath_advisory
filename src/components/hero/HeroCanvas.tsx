import { useEffect, useRef } from "react";
import { HeroScene } from "./HeroScene";

interface HeroCanvasProps {
  onReady?: () => void;
}

export default function HeroCanvas({ onReady }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let scene: HeroScene | undefined;
    try {
      scene = new HeroScene(container, {
        reducedMotion,
        onReady: () => onReadyRef.current?.(),
      });
    } catch (error) {
      // No WebGL — the hero keeps its CSS gradient background
      console.warn("Hero animation unavailable:", error);
    }

    return () => scene?.dispose();
  }, []);

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />;
}
