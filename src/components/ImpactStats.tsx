import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef } from "react";

import { useImpactStats } from "@/hooks/useSanityData";
import { useReveal } from "@/lib/reveal";
import type { ImpactStat } from "@/types/schema";
import SectionTitle, { Accent } from "./ui/SectionTitle";

const RING = 2 * Math.PI * 45;
const EASE: [number, number, number, number] = [0.2, 0.7, 0.2, 1];

const CountUp = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;
    if (reduceMotion) {
      node.textContent = value.toLocaleString();
      return;
    }
    const controls = animate(0, value, {
      duration: 2.4,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = Math.round(v).toLocaleString();
      },
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  // Own weight class: the global `span` rule would reset it to 400
  return (
    <span ref={ref} className="tp-black">
      0
    </span>
  );
};

const StatCard = ({
  stat,
  fill,
  delay,
}: {
  stat: ImpactStat;
  fill: number;
  delay: number;
}) => {
  const reveal = useReveal();
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      {...reveal(delay)}
      className="flex items-center gap-[22px] rounded-3xl border border-warm/[.12] bg-warm/[.05] p-7"
    >
      <svg
        width="92"
        height="92"
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="shrink-0 -rotate-90"
      >
        <circle cx="50" cy="50" r="45" stroke="rgba(248,246,241,.12)" strokeWidth="6" fill="none" />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="#A7E3C9"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={RING}
          initial={{ strokeDashoffset: reduceMotion ? RING * (1 - fill) : RING }}
          whileInView={{ strokeDashoffset: RING * (1 - fill) }}
          viewport={{ once: true }}
          transition={{ duration: 2.6, ease: EASE, delay }}
        />
      </svg>
      <div className="flex flex-col gap-1.5">
        <span className="tp-black text-[46px] leading-none tracking-[-0.03em] text-warm">
          {stat.prefix}
          <CountUp value={stat.value} />
          {stat.suffix}
        </span>
        <span className="text-[15px] text-warm/80">{stat.statType}</span>
      </div>
    </motion.div>
  );
};

export default function ImpactStats({ id = "impact" }: { id?: string }) {
  const { data: stats } = useImpactStats();
  if (!stats || stats.length === 0) return null;

  // Rings are decorative: each fills relative to the largest figure
  const max = Math.max(...stats.map((s) => s.value), 1);

  return (
    <section
      id={id}
      className="tp tp-section relative scroll-mt-20 overflow-hidden bg-deep text-warm"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
      >
        <motion.path
          d="M-20 520 C 360 460, 700 380, 1000 260 S 1380 80, 1460 40"
          stroke="#5B8673"
          strokeWidth="1.2"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.4, ease: EASE }}
        />
        <motion.path
          d="M-20 580 C 380 520, 760 440, 1060 320 S 1400 160, 1460 120"
          stroke="#5B8673"
          strokeWidth="1.2"
          fill="none"
          opacity=".6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.4, ease: EASE, delay: 0.3 }}
        />
      </svg>

      <div className="tp-container relative flex flex-col gap-14">
        <SectionTitle
          light
          title={
            <>
              Impact you can <Accent light>measure.</Accent>
            </>
          }
          aside="Evidence over promises. Every engagement is tracked against outcomes agreed with the client."
        />
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]">
          {stats.map((stat, i) => (
            <StatCard
              key={stat._id}
              stat={stat}
              fill={0.45 + 0.45 * (stat.value / max)}
              delay={[0, 0.08, 0.16, 0.08][i % 4]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
