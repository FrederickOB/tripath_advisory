import { useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.2, 0.7, 0.2, 1];

// Rise-into-view motion props shared by the redesigned sections.
// Spread onto any motion element: <motion.div {...reveal(0.1)} />
export function useReveal() {
  const reduce = useReducedMotion();
  return (delay = 0, distance = 56) => ({
    initial: reduce ? false : { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -10% 0px" },
    transition: { duration: 0.9, ease: EASE, delay },
  });
}
