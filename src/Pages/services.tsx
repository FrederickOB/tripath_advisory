import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import clsx from "clsx";
import CTABand from "@/components/CTABand";
import PageHeader from "@/components/PageHeader";
import Process from "@/components/Process";
import ActionButton from "@/components/ui/ActionButton";
import ParallaxImage from "@/components/ui/ParallaxImage";
import SectionTitle, { Accent } from "@/components/ui/SectionTitle";
import { audiences, brochureUrl } from "@/constants";
import { usePageMeta } from "@/hooks/usePageMeta";
import {
  useClients,
  useClientServices,
  useServices,
} from "@/hooks/useSanityData";
import { sanityImage } from "@/lib/image";
import { pillarOf } from "@/lib/pillar";
import { useReveal } from "@/lib/reveal";
import type { Service } from "@/types/schema";

const NUMBER_WORDS = ["one", "two", "three", "four", "five", "six", "seven", "eight"];
const NUMBER_COLOURS = ["text-primary", "text-secondary", "text-dark"];
const FLOAT_CARDS = [
  { card: "bg-warm text-dark", number: "text-primary", offset: "md:mr-0" },
  { card: "bg-mint text-deep", number: "", offset: "md:mr-16" },
  { card: "border border-warm/20 bg-primary text-warm", number: "text-mint", offset: "md:mr-6" },
];

const audienceIcons = [
  <>
    <path d="M3 21h18" />
    <path d="M5 21V10l7-5 7 5v11" />
    <path d="M9 21v-6h6v6" />
  </>,
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c3 3 3 15 0 18" />
    <path d="M12 3c-3 3-3 15 0 18" />
  </>,
  <>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 13h18" />
  </>,
];

// "Social Policy & Inclusive Development" → ["Social Policy &", "Inclusive Development"]
function splitTitle(title: string): [string, string] {
  const amp = title.lastIndexOf(" & ");
  if (amp > 0) return [title.slice(0, amp + 2), title.slice(amp + 3)];
  const space = title.lastIndexOf(" ");
  return space > 0 ? [title.slice(0, space), title.slice(space + 1)] : [title, ""];
}

const Spinner = () => (
  <div className="flex justify-center py-20" role="status" aria-label="Loading">
    <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
  </div>
);

const ServiceSection = ({ service, index }: { service: Service; index: number }) => {
  const reveal = useReveal();
  const flipped = index % 2 === 1;
  const [lead, accent] = splitTitle(service.title);

  return (
    <section
      id={`path-${index + 1}`}
      className={clsx("tp scroll-mt-36 py-16 md:py-24", flipped && "bg-warm")}
    >
      <div className="tp-container grid items-center gap-12 lg:gap-16 [grid-template-columns:repeat(auto-fit,minmax(min(480px,100%),1fr))]">
        <div className={clsx("flex flex-col gap-[26px]", flipped && "md:order-2")}>
          <motion.span
            {...reveal(0, 32)}
            className={clsx("tp-serif tp-italic text-[96px] leading-[0.8]", NUMBER_COLOURS[index % 3])}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
          <motion.h2 {...reveal(0.04, 32)} className="tp-h2 text-[clamp(36px,4vw,56px)]">
            {lead} {accent && <Accent>{accent}</Accent>}
          </motion.h2>
          <motion.p {...reveal(0.08, 32)} className="text-lg leading-[1.7] text-muted">
            {service.description}
          </motion.p>
          {service.approach && service.approach.length > 0 && (
            <ul className="flex flex-col gap-2">
              {service.approach.map((item, i) => (
                <motion.li
                  key={item}
                  {...reveal(0.04 * i, 24)}
                  className={clsx("tp-del", flipped ? "bg-white" : "bg-warm")}
                >
                  <span aria-hidden="true" className="text-primary">
                    →
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          )}
          {service.frameworks && service.frameworks.length > 0 && (
            <motion.div {...reveal(0.08, 24)} className="flex flex-col gap-3">
              <span className="tp-kicker">Frameworks</span>
              <ul className="flex flex-wrap gap-2">
                {service.frameworks.map((framework) => (
                  <li
                    key={framework}
                    className={clsx(
                      "rounded-full px-3.5 py-1.5 text-sm",
                      flipped ? "bg-white" : "bg-warm"
                    )}
                  >
                    {framework}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
          <Link className="tp-link self-start" to="/contact">
            Discuss this engagement{" "}
            <span className="tp-arr" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
        <motion.div {...reveal(0.1)}>
          <ParallaxImage
            src={sanityImage(service.image?.url, 1200)}
            className="h-[400px] rounded-[28px] md:h-[560px]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default function ServicesPage() {
  const reveal = useReveal();
  const { data: services, loading, error } = useServices();
  const { data: clients } = useClients();
  const { data: clientServices } = useClientServices();
  const [activeId, setActiveId] = useState<string | null>(null);
  usePageMeta({
    title: "Services",
    description:
      "Gender, youth and community empowerment, social policy and inclusive development, and ESG and sustainable finance advisory for organisations across Africa.",
    path: "/services",
  });

  const count = services?.length ?? 0;
  const hasClients = !!clients?.length;
  const hasCases = !!clientServices?.length;

  // Highlight the sub-nav link for the section currently on screen
  useEffect(() => {
    if (!count) return;
    const ids = [...Array.from({ length: count }, (_, i) => `path-${i + 1}`), "process"];
    const inView = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) inView.add(entry.target.id);
          else inView.delete(entry.target.id);
        });
        setActiveId(ids.find((id) => inView.has(id)) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [count]);

  const subNav = [
    ...(services ?? []).map((service, i) => ({
      id: `path-${i + 1}`,
      label: `${String(i + 1).padStart(2, "0")} ${pillarOf(service.title) ?? "Path"}`,
    })),
    { id: "process", label: "How we work" },
  ];

  return (
    <div className="relative antialiased text-dark">
      <PageHeader
        tone="dark"
        breadcrumb="Services"
        eyebrow="Our services"
        title={
          <>
            Comprehensive ESG and <Accent light>sustainable development</Accent> solutions.
          </>
        }
        description={`For organisations across Africa, built on ${
          NUMBER_WORDS[count - 1] ?? "three"
        } connected paths.`}
        aside={
          count > 0 && (
            <div aria-hidden="true" className="flex flex-col gap-4 md:items-end">
              {services!.slice(0, 3).map((service, i) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 24, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.3, 1.4, 0.4, 1], delay: 0.7 + i * 0.15 }}
                  className={FLOAT_CARDS[i].offset}
                >
                  <div
                    className={clsx(
                      "tp-float flex items-center gap-[18px] rounded-[22px] px-7 py-[22px] md:w-[420px]",
                      FLOAT_CARDS[i].card
                    )}
                    style={{ animationDelay: `${-i * 2.3}s` }}
                  >
                    <span className={clsx("tp-serif tp-italic text-[44px] leading-none", FLOAT_CARDS[i].number)}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="tp-black text-xl leading-tight md:text-[22px]">{service.title}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )
        }
      />

      {/* Intro */}
      <section className="tp pb-12 pt-20 md:pb-16 md:pt-28">
        <div className="tp-container">
          <div className="flex max-w-[1100px] flex-col gap-7">
            <motion.span {...reveal(0, 24)} className="tp-eyebrow self-start">
              Our approach
            </motion.span>
            <motion.h2
              {...reveal(0.06)}
              className="tp-h2 text-[clamp(40px,5.2vw,76px)] leading-none tracking-[-0.045em]"
            >
              Transforming challenges <Accent>into opportunities.</Accent>
            </motion.h2>
            <motion.p {...reveal(0.12)} className="max-w-[820px] text-[21px] leading-[1.65] text-muted">
              Our integrated approach combines deep expertise in ESG, social policy and
              community development to deliver holistic solutions that drive meaningful
              change across the continent.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Sticky sub-navigation */}
      {count > 0 && (
        <div className="tp sticky top-[74px] z-20 px-5 py-3">
          <nav
            aria-label="Service paths"
            className="mx-auto flex w-fit max-w-full gap-1.5 overflow-x-auto rounded-full border border-dark/[.08] bg-warm/[.92] p-1.5 backdrop-blur-md"
          >
            {subNav.map((item) => (
              <Link
                key={item.id}
                to={`#${item.id}`}
                className={clsx("tp-sub", activeId === item.id && "is-active")}
                aria-current={activeId === item.id ? "true" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="tp tp-container py-20 text-center text-red-700">
          Error loading services. Please try again later.
        </p>
      ) : (
        services?.map((service, index) => (
          <ServiceSection key={service._id} service={service} index={index} />
        ))
      )}

      {/* Who we work with */}
      <section className="tp bg-warm py-20 md:py-24">
        <div className="tp-container flex flex-col gap-12">
          <SectionTitle
            eyebrow="Who we work with"
            title={
              <>
                Built for those <Accent>shaping change.</Accent>
              </>
            }
          />
          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]">
            {audiences.map((audience, i) => (
              <motion.article
                key={audience.title}
                {...reveal([0, 0.08, 0.16][i % 3])}
                className="tp-bento flex flex-col gap-4 rounded-[26px] bg-white p-9"
              >
                <svg
                  className="tp-icon"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0E5C4B"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {audienceIcons[i]}
                </svg>
                <h3 className="tp-sans tp-black text-2xl">{audience.title}</h3>
                <p className="text-base leading-[1.6] text-muted">{audience.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Clients and case studies from Sanity, when there are any */}
      {(hasClients || hasCases) && (
        <section className="tp tp-section bg-deep text-warm">
          <div className="tp-container flex flex-col gap-12">
            <SectionTitle
              light
              eyebrow="Our clients"
              title={
                <>
                  Trusted by leading <Accent light>organisations.</Accent>
                </>
              }
              aside="We've partnered with organisations across Africa to drive sustainable impact and create lasting change in their communities."
            />

            {hasClients && (
              <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(min(200px,100%),1fr))]">
                {clients!.map((client, i) => (
                  <motion.div
                    key={client._id}
                    {...reveal((i % 4) * 0.06)}
                    className="flex h-28 items-center justify-center rounded-[20px] bg-white p-6"
                  >
                    {client.logo?.url ? (
                      <img
                        src={sanityImage(client.logo.url, 320)}
                        alt={client.name}
                        className="max-h-14 w-auto object-contain"
                      />
                    ) : (
                      <span className="tp-black text-dark">{client.name}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {hasCases && (
              <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(440px,100%),1fr))]">
                {clientServices!.map((item, i) => (
                  <motion.article
                    key={item._id}
                    {...reveal((i % 2) * 0.08)}
                    className="flex flex-col gap-5 rounded-3xl border border-warm/[.12] bg-warm/[.05] p-8"
                  >
                    <span className="tp-eyebrow text-mint">
                      {[item.service?.title, item.client?.name].filter(Boolean).join(" · ")}
                    </span>
                    <h3 className="tp-serif text-[clamp(26px,2.4vw,34px)] leading-[1.2]">
                      {item.title}
                    </h3>
                    <p className="text-base leading-[1.6] text-warm/80">{item.description}</p>
                    {item.metrics && item.metrics.length > 0 && (
                      <dl className="mt-auto grid grid-cols-2 gap-3">
                        {item.metrics.map((metric) => (
                          <div
                            key={metric.label}
                            className="flex flex-col gap-1 rounded-2xl bg-warm/[.06] p-4"
                          >
                            <dt className="text-sm text-warm/75">{metric.label}</dt>
                            <dd className="tp-black order-first text-3xl tracking-[-0.03em] text-mint">
                              {metric.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <Process id="process" />

      <CTABand
        title={
          <>
            Ready to create <Accent light>sustainable impact?</Accent>
          </>
        }
        text="Let's work together to develop solutions that drive positive change and create lasting value for your organisation and stakeholders."
        actions={
          <>
            <ActionButton href="/contact" variant="mint" arrow>
              Get in touch
            </ActionButton>
            {brochureUrl && (
              <a href={brochureUrl} className="tp-btn tp-btn--outline-light" download>
                Download brochure
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 4v12" />
                  <path d="M6 10l6 6 6-6" />
                  <path d="M4 20h16" />
                </svg>
              </a>
            )}
          </>
        }
      />
    </div>
  );
}
