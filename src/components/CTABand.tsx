import { motion } from "framer-motion";
import { useReveal } from "@/lib/reveal";

interface CTABandProps {
  title: React.ReactNode;
  text?: string;
  actions: React.ReactNode;
}

// Green closing band used at the foot of inner pages
export default function CTABand({ title, text, actions }: CTABandProps) {
  const reveal = useReveal();
  return (
    <section className="tp pb-20 md:pb-28">
      <div className="tp-container">
        <motion.div
          {...reveal()}
          className="relative flex flex-wrap items-end justify-between gap-10 overflow-hidden rounded-[36px] bg-primary p-[clamp(36px,6vw,88px)] text-warm"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 700 400"
            preserveAspectRatio="none"
            className="pointer-events-none absolute right-0 top-0 h-full w-[60%] opacity-30"
          >
            <motion.path
              d="M0 400 C 200 360, 380 240, 480 160 S 640 40, 720 20"
              stroke="#A7E3C9"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 3, ease: [0.6, 0.1, 0.2, 1] }}
            />
            <motion.path
              d="M80 400 C 260 350, 420 260, 520 190 S 660 90, 720 70"
              stroke="#F8F6F1"
              strokeWidth="1.2"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 3, ease: [0.6, 0.1, 0.2, 1], delay: 0.3 }}
            />
          </svg>
          <div className="relative flex max-w-[720px] flex-col gap-5">
            <h2 className="tp-h2 text-[clamp(38px,4.8vw,68px)] leading-none tracking-[-0.045em]">
              {title}
            </h2>
            {text && <p className="max-w-[520px] text-[19px] leading-[1.6] text-warm/90">{text}</p>}
          </div>
          <div className="relative flex flex-wrap gap-3.5">{actions}</div>
        </motion.div>
      </div>
    </section>
  );
}
