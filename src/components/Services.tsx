import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router";
import { useServices } from "@/hooks/useSanityData";
import { sanityImage } from "@/lib/image";
import { pillarOf } from "@/lib/pillar";
import { useReveal } from "@/lib/reveal";
import SectionTitle, { Accent } from "./ui/SectionTitle";

const ADVANCE_MS = 7000;
const NUMBER_WORDS = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];

const Services = () => {
  const { data: services } = useServices();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduceMotion = useReducedMotion();
  const reveal = useReveal();

  const count = services?.length ?? 0;
  const autoAdvance = count > 1 && !paused && !reduceMotion;

  useEffect(() => {
    if (!autoAdvance) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % count), ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [active, autoAdvance, count]);

  // Warm the cache so switching tabs never shows an empty image panel
  useEffect(() => {
    services?.forEach((service) => {
      const src = sanityImage(service.image?.url, 1100);
      if (src) new Image().src = src;
    });
  }, [services]);

  if (!services || count === 0) return null;

  const index = active % count;
  const current = services[index];
  const word = NUMBER_WORDS[count - 1] ?? String(count);

  const select = (i: number, focus = false) => {
    setActive(i);
    setPaused(true);
    if (focus) tabRefs.current[i]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      select((index + 1) % count, true);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      select((index - 1 + count) % count, true);
    }
  };

  return (
    <section id="services" className="tp tp-section scroll-mt-20">
      <div className="tp-container flex flex-col gap-12">
        <SectionTitle
          eyebrow="Our services"
          title={
            <>
              One firm. {word} {count === 1 ? "path" : "paths"}{" "}
              <Accent>to lasting impact.</Accent>
            </>
          }
          aside={
            count > 1
              ? `Choose a path to see what we deliver. Most clients draw on all ${word.toLowerCase()}.`
              : undefined
          }
        />

        <motion.div
          {...reveal(0.1)}
          className="flex flex-col gap-3 rounded-[30px] bg-warm p-3"
        >
          <div
            role="tablist"
            aria-label="Service paths"
            onKeyDown={handleKeyDown}
            className="grid gap-2 [grid-template-columns:repeat(auto-fit,minmax(min(250px,100%),1fr))]"
          >
            {services.map((service, i) => {
              const selected = i === index;
              const pillar = pillarOf(service.title);
              return (
                <button
                  key={service._id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`service-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="service-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  className="tp-tab"
                >
                  <span className="tp-tab-kicker">
                    {String(i + 1).padStart(2, "0")} · {pillar ?? "Path"}
                  </span>
                  <span className="tp-tab-title">{service.title}</span>
                  {selected && autoAdvance && (
                    <span className="tp-tab-progress" aria-hidden="true">
                      <span key={index} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div
            key={current._id}
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${index}`}
            className="tp-panel grid items-center gap-10 rounded-[22px] bg-white p-[clamp(24px,4vw,52px)] md:gap-14 [grid-template-columns:repeat(auto-fit,minmax(min(380px,100%),1fr))]"
          >
            <div className="flex flex-col gap-6">
              <h3 className="tp-serif text-[clamp(28px,2.6vw,38px)] leading-[1.15]">
                {current.title}
              </h3>
              <p className="tp-lead">{current.description}</p>
              {current.approach && current.approach.length > 0 && (
                <ul className="tp-numbered">
                  {current.approach.map((item, i) => (
                    <li key={item}>
                      <span className="tp-black text-primary" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                <Link className="tp-link" to="#contact">
                  Discuss an engagement{" "}
                  <span className="tp-arr" aria-hidden="true">
                    →
                  </span>
                </Link>
                <Link className="tp-link tp-link--muted" to="/services">
                  Full service details
                </Link>
              </div>
            </div>

            <div className="tp-clip-x relative h-[300px] overflow-hidden rounded-[20px] bg-forest md:h-[400px]">
              {current.image?.url && (
                <img
                  src={sanityImage(current.image.url, 1100)}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
