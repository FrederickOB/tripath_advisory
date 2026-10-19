import { motion } from "framer-motion";
import ActionButton from "@/components/ui/ActionButton";
import { Accent } from "@/components/ui/SectionTitle";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useReveal } from "@/lib/reveal";

export default function NotFound() {
  const reveal = useReveal();
  usePageMeta({ title: "Page not found", path: "/404", noindex: true });

  return (
    <section className="tp relative flex min-h-[80vh] items-center overflow-hidden pb-20 pt-36">
      <div aria-hidden="true" className="tp-grid-bg absolute inset-0" />
      <div className="tp-container relative">
        <motion.div {...reveal()} className="flex max-w-[720px] flex-col gap-7">
          <span className="tp-eyebrow">Error 404</span>
          <h1 className="tp-h1 text-[clamp(48px,7vw,104px)]">
            This path <Accent>doesn't lead anywhere.</Accent>
          </h1>
          <p className="max-w-[520px] text-[20px] leading-[1.6] text-muted">
            The page you're looking for has moved or never existed. These will get you
            back on track.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <ActionButton href="/" arrow>
              Back to home
            </ActionButton>
            <ActionButton href="/services" variant="soft">
              Our services
            </ActionButton>
            <ActionButton href="/contact" variant="soft">
              Contact us
            </ActionButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
