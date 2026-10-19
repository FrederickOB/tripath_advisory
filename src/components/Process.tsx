import { motion, useReducedMotion } from "framer-motion";
import { processSteps } from "@/constants";
import { useReveal } from "@/lib/reveal";
import SectionTitle, { Accent } from "./ui/SectionTitle";

export default function Process({ id }: { id?: string }) {
  const reveal = useReveal();
  const reduceMotion = useReducedMotion();

  return (
    <section id={id} className="tp tp-section scroll-mt-32" aria-label="How we work">
      <div className="tp-container flex flex-col gap-16">
        <SectionTitle
          eyebrow="How we work"
          title={
            <>
              From diagnosis <Accent>to measurable change.</Accent>
            </>
          }
        />

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-7 right-7 top-[27px] hidden h-0.5 bg-dark/10 xl:block"
          >
            <motion.span
              className="block h-full origin-left bg-primary"
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
            />
          </div>

          <ol className="relative grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(250px,100%),1fr))]">
            {processSteps.map((step, i) => (
              <motion.li
                key={step.title}
                {...reveal([0, 0.08, 0.16, 0.08][i % 4])}
                className="tp-step flex flex-col gap-[18px]"
              >
                <span className="tp-node tp-black flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_0_8px_#fff]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="tp-sans tp-black text-2xl">{step.title}</h3>
                <p className="text-base leading-[1.6] text-muted">{step.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
