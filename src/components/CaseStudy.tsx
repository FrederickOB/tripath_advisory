import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import clsx from "clsx";
import { useClientServices, useTestimonials } from "@/hooks/useSanityData";
import { sanityImage } from "@/lib/image";
import { useReveal } from "@/lib/reveal";
import type { Testimonial } from "@/types/schema";
import ParallaxImage from "./ui/ParallaxImage";
import SectionTitle, { Accent } from "./ui/SectionTitle";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const Quote = ({ testimonial }: { testimonial: Testimonial }) => (
  <>
    <blockquote className="tp-serif tp-italic text-xl leading-[1.45]">
      “{testimonial.text}”
    </blockquote>
    <figcaption className="flex items-center gap-3 text-sm">
      {testimonial.image?.url ? (
        <img
          src={sanityImage(testimonial.image.url, 120)}
          alt=""
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="tp-black flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-xs text-white"
        >
          {initials(testimonial.name)}
        </span>
      )}
      <span>
        <strong className="tp-black">{testimonial.name}</strong>
        {[testimonial.position, testimonial.company].filter(Boolean).length > 0 &&
          ` · ${[testimonial.position, testimonial.company].filter(Boolean).join(", ")}`}
      </span>
    </figcaption>
  </>
);

// Rotating quote with dot controls when there is more than one testimonial
const TestimonialFigure = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const [index, setIndex] = useState(0);
  const current = testimonials[index % testimonials.length];
  return (
    <figure className="flex flex-col gap-3.5 rounded-[18px] bg-white p-6">
      <motion.div
        key={current._id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-3.5"
      >
        <Quote testimonial={current} />
      </motion.div>
      {testimonials.length > 1 && (
        <div className="flex gap-2 pt-1">
          {testimonials.map((t, i) => (
            <button
              key={t._id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial from ${t.name}`}
              aria-pressed={i === index}
              className={clsx(
                "h-2 rounded-full transition-all duration-300",
                i === index ? "w-6 bg-primary" : "w-2 bg-dark/20 hover:bg-dark/40"
              )}
            />
          ))}
        </div>
      )}
    </figure>
  );
};

export default function CaseStudy() {
  const { data: cases } = useClientServices();
  const { data: testimonials } = useTestimonials();
  const reveal = useReveal();

  const featured = cases?.[0];
  const quotes = testimonials ?? [];

  if (!featured && quotes.length === 0) return null;

  // No case study yet: show client testimonials on their own
  if (!featured) {
    return (
      <section id="case-studies" className="tp scroll-mt-20 pb-20 md:pb-28">
        <div className="tp-container flex flex-col gap-11">
          <SectionTitle
            eyebrow="Testimonials"
            title={
              <>
                What our clients <Accent>say.</Accent>
              </>
            }
          />
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(360px,100%),1fr))]">
            {quotes.map((testimonial, i) => (
              <motion.figure
                key={testimonial._id}
                {...reveal([0, 0.08, 0.16][i % 3])}
                className="flex flex-col justify-between gap-6 rounded-[28px] bg-warm p-8"
              >
                <Quote testimonial={testimonial} />
              </motion.figure>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const eyebrow = [featured.service?.title, featured.client?.name]
    .filter(Boolean)
    .join(" · ");
  const metrics = featured.metrics?.filter((m) => m.value || m.label) ?? [];
  const rows = [
    { term: "Client", detail: featured.client?.name },
    { term: "Approach", detail: featured.description },
    {
      term: "Result",
      detail: metrics.length
        ? metrics.map((m) => `${m.value} ${m.label}`.trim()).join(" · ")
        : undefined,
    },
  ].filter((row) => row.detail);
  const image = sanityImage(featured.service?.image?.url, 1200) || "/assets/hero.png";

  return (
    <section id="case-studies" className="tp scroll-mt-20 pb-20 md:pb-28">
      <motion.div {...reveal()} className="tp-container">
        <div className="grid overflow-hidden rounded-[32px] bg-warm [grid-template-columns:repeat(auto-fit,minmax(min(440px,100%),1fr))]">
          <ParallaxImage src={image} className="min-h-[360px] md:min-h-[520px]">
            <span className="tp-tag absolute left-[18px] top-[18px]">Featured case</span>
          </ParallaxImage>

          <div className="flex flex-col justify-center gap-7 p-[clamp(32px,5vw,64px)]">
            {eyebrow && <span className="tp-eyebrow">{eyebrow}</span>}
            <h2 className="tp-serif text-[clamp(30px,3vw,44px)] leading-[1.15]">
              {featured.title}
            </h2>
            {rows.length > 0 && (
              <dl className="grid border-t border-dark/[.12]">
                {rows.map((row) => (
                  <div
                    key={row.term}
                    className="grid gap-4 border-b border-dark/[.12] py-[18px] [grid-template-columns:110px_1fr] md:[grid-template-columns:130px_1fr]"
                  >
                    <dt className="tp-black text-[13px] uppercase tracking-[0.1em] text-primary">
                      {row.term}
                    </dt>
                    <dd className="text-base leading-[1.6]">{row.detail}</dd>
                  </div>
                ))}
              </dl>
            )}
            {quotes.length > 0 && <TestimonialFigure testimonials={quotes} />}
            <Link className="tp-link" to="#contact">
              Discuss a similar project{" "}
              <span className="tp-arr" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
