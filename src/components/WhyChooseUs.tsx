import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReveal } from "@/lib/reveal";
import SectionTitle, { Accent } from "./ui/SectionTitle";

const Icon = ({
  size,
  color,
  strokeWidth,
  children,
}: {
  size: number;
  color: string;
  strokeWidth: number;
  children: React.ReactNode;
}) => (
  <svg
    className="tp-icon relative"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const features = [
  {
    title: "Industry expertise",
    description:
      "Specialists across environmental policy, social governance and sustainable finance bring deep sector knowledge to every project.",
    variant: "feature",
    icon: (
      <>
        <path d="M12 3l8 4v6c0 4-3.5 7-8 8-4.5-1-8-4-8-8V7z" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </>
    ),
  },
  {
    title: "Data-driven approach",
    description:
      "Evidence-based strategies, backed by research and analysis, that deliver measurable results.",
    icon: (
      <>
        <path d="M4 20V10" />
        <path d="M10 20V4" />
        <path d="M16 20v-7" />
        <path d="M22 20H2" />
      </>
    ),
  },
  {
    title: "Stakeholder engagement",
    description:
      "Diverse voices at the table, so solutions address the needs of every affected community.",
    icon: (
      <>
        <circle cx="9" cy="8" r="3.2" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <path d="M15 14.5c3 0 6 1.8 6 5.5" />
      </>
    ),
  },
  {
    title: "Regulatory compliance",
    description:
      "Stay ahead of evolving ESG regulation with frameworks built for what's coming next.",
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6" />
        <path d="M9 12h6" />
        <path d="M9 16h3" />
      </>
    ),
  },
  {
    title: "Sustainable growth",
    description:
      "Business objectives aligned with environmental stewardship and social responsibility.",
    icon: (
      <>
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M15 7h6v6" />
      </>
    ),
  },
  {
    title: "Social policy, equity & inclusion",
    description:
      "Global inclusion standards turned into programmes that boost gender equity, empower youth and elevate under-represented voices across Ghana and Africa.",
    variant: "wide",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10" />
        <path d="M7 12h10" />
      </>
    ),
  },
];

function WhyChooseUs() {
  const reveal = useReveal();

  return (
    <section
      id="approach"
      className="tp tp-section scroll-mt-20 bg-warm"
      aria-label="Why choose TriPath Advisory"
    >
      <div className="tp-container flex flex-col gap-[52px]">
        <SectionTitle
          eyebrow="Why choose us"
          title={
            <>
              Our approach <Accent>makes the difference.</Accent>
            </>
          }
        />

        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(380px,100%),1fr))]">
          {features.map((feature, i) => {
            if (feature.variant === "feature") {
              return (
                <motion.article
                  key={feature.title}
                  {...reveal(0)}
                  className="tp-bento row-span-2 flex min-h-[420px] flex-col justify-between gap-6 rounded-[28px] bg-primary p-10 text-warm"
                >
                  <span className="tp-glow" aria-hidden="true" />
                  <Icon size={52} color="#A7E3C9" strokeWidth={1.5}>
                    {feature.icon}
                  </Icon>
                  <div className="relative flex flex-col gap-4">
                    <h3 className="tp-serif text-[40px] leading-[1.08]">{feature.title}</h3>
                    <p className="text-[17px] leading-[1.65] text-warm/90">
                      {feature.description}
                    </p>
                  </div>
                </motion.article>
              );
            }

            if (feature.variant === "wide") {
              return (
                <motion.article
                  key={feature.title}
                  {...reveal(0)}
                  className="tp-bento col-span-full rounded-[28px] bg-dark p-8 text-warm"
                >
                  <span className="tp-glow" aria-hidden="true" />
                  <div className="relative flex flex-wrap items-center justify-between gap-8">
                    <div className="flex items-center gap-5">
                      <Icon size={44} color="#A7E3C9" strokeWidth={1.6}>
                        {feature.icon}
                      </Icon>
                      <h3 className="tp-serif text-[30px] leading-tight">{feature.title}</h3>
                    </div>
                    <p className="max-w-[560px] text-base leading-[1.6] text-warm/85">
                      {feature.description}
                    </p>
                  </div>
                </motion.article>
              );
            }

            return (
              <motion.article
                key={feature.title}
                {...reveal(i % 2 === 0 ? 0.16 : 0.08)}
                className={cn("tp-bento flex flex-col gap-3.5 rounded-[28px] bg-white p-8")}
              >
                <span className="tp-glow" aria-hidden="true" />
                <Icon size={38} color="#0E5C4B" strokeWidth={1.7}>
                  {feature.icon}
                </Icon>
                <h3 className="tp-sans tp-black relative text-[22px]">{feature.title}</h3>
                <p className="relative text-base leading-[1.6] text-muted">
                  {feature.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
