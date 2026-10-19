import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src?: string;
  alt?: string;
  className?: string;
  children?: React.ReactNode;
}

// Image that drifts slightly against the scroll inside a rounded frame
const ParallaxImage = ({ src, alt = "", className, children }: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-forest", className)}>
      {src && (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          style={reduceMotion ? undefined : { y, scale: 1.14 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {children}
    </div>
  );
};

export default ParallaxImage;
