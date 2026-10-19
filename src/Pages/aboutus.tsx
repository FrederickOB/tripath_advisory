import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import CTABand from "@/components/CTABand";
import PageHeader from "@/components/PageHeader";
import ProfileModal from "@/components/ProfileModal";
import ActionButton from "@/components/ui/ActionButton";
import SectionTitle, { Accent } from "@/components/ui/SectionTitle";
import { aboutPurpose, pillars } from "@/constants";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useBio, useTeamMembers } from "@/hooks/useSanityData";
import { sanityImage } from "@/lib/image";
import { portableTextComponents } from "@/lib/portableTextComponents";
import { useReveal } from "@/lib/reveal";
import { Team } from "@/types/schema";

const EASE: [number, number, number, number] = [0.6, 0.1, 0.2, 1];

const purposeIcons = [
  <>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.2" />
  </>,
  <>
    <circle cx="9" cy="8" r="3.2" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <path d="M15 14.5c3 0 6 1.8 6 5.5" />
  </>,
  <>
    <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </>,
];

// The middle node uses a deeper sage so white numerals keep 4.5:1 contrast
const PILLAR_NODE = ["bg-primary", "bg-[#517a68]", "bg-dark"];

// Portraits of the team side by side, revealed with a rising clip
const HeroPortraits = ({ team }: { team: Team[] }) => {
  const reduceMotion = useReducedMotion();
  const portraits = team.filter((m) => m.image?.url).slice(0, 3);
  return (
    <motion.div
      initial={reduceMotion ? false : { clipPath: "inset(100% 0 0 0 round 28px)" }}
      animate={{ clipPath: "inset(0% 0 0 0 round 28px)" }}
      transition={{ duration: 1.4, ease: [0.7, 0, 0.2, 1], delay: 0.3 }}
      className="relative grid h-[420px] gap-1.5 overflow-hidden rounded-[28px] bg-sand md:h-[520px]"
      style={{ gridTemplateColumns: `repeat(${Math.max(portraits.length, 1)}, 1fr)` }}
    >
      {portraits.length > 0 ? (
        portraits.map((member) => (
          <motion.img
            key={member._id}
            src={sanityImage(member.image?.url, 700)}
            alt={member.name}
            initial={reduceMotion ? false : { scale: 1.25 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.2, ease: [0.2, 0.7, 0.2, 1], delay: 0.3 }}
            className="h-full w-full object-cover object-top"
          />
        ))
      ) : (
        <img src="/assets/girl.jpg" alt="" className="h-full w-full object-cover" />
      )}
    </motion.div>
  );
};

// "Three paths, one outcome" diagram: Policy, People and Planet converge on impact
const PathsDiagram = () => {
  const reduceMotion = useReducedMotion();
  const draw = (delay: number) => ({
    initial: reduceMotion ? false : { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, margin: "0px 0px -20% 0px" },
    transition: { duration: 1.8, ease: EASE, delay },
  });
  return (
    <svg
      role="img"
      aria-label="Three paths, Policy, People and Planet, converging on one point of impact"
      viewBox="0 0 560 560"
      className="block h-full w-full"
    >
      <g stroke="rgba(248,246,241,.06)">
        <path d="M0 140 H560 M0 280 H560 M0 420 H560 M140 0 V560 M280 0 V560 M420 0 V560" />
      </g>
      <motion.path {...draw(0)} d="M70 520 C 90 380, 260 300, 280 110" stroke="#A7E3C9" strokeWidth="3" fill="none" strokeLinecap="round" />
      <motion.path {...draw(0.15)} d="M280 520 C 280 380, 280 260, 280 110" stroke="#F8F6F1" strokeWidth="3" fill="none" strokeLinecap="round" />
      <motion.path {...draw(0.3)} d="M490 520 C 470 380, 300 300, 280 110" stroke="#A7E3C9" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="280" cy="110" r="26" fill="#A7E3C9" opacity=".25" />
      <circle cx="280" cy="110" r="12" fill="#F8F6F1" />
      <g fontFamily="Lato, sans-serif" fontWeight="900" fontSize="14" letterSpacing="3" fill="#F8F6F1">
        <text x="40" y="545">POLICY</text>
        <text x="250" y="545">PEOPLE</text>
        <text x="450" y="545">PLANET</text>
      </g>
      <text x="280" y="66" textAnchor="middle" fontFamily="'Playfair Display', serif" fontStyle="italic" fontSize="26" fill="#F8F6F1">
        Impact
      </text>
    </svg>
  );
};

function AboutUs() {
  const [selectedMember, setSelectedMember] = useState<Team | null>(null);
  const reveal = useReveal();
  usePageMeta({
    title: "About us",
    description:
      "TriPath Advisory is a Ghana-based consultancy bridging global frameworks with local realities across policy, people and planet. Meet the team.",
    path: "/about",
  });

  const { data: bioData } = useBio();
  const { data: teamData } = useTeamMembers();
  const bio = bioData?.[0]?.body;
  const team = teamData ?? [];

  return (
    <div className="relative antialiased text-dark">
      <PageHeader
        breadcrumb="About"
        eyebrow="About TriPath"
        title={
          <>
            We bridge global frameworks <Accent>with local realities.</Accent>
          </>
        }
        description="TriPath Advisory is a Ghana-based consulting firm helping organisations align strategy with sustainability, inclusion and impact."
        aside={<HeroPortraits team={team} />}
      />

      {/* Purpose */}
      <section className="tp bg-warm py-20 md:py-24">
        <div className="tp-container grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr))]">
          {aboutPurpose.map((item, i) => {
            const featured = i === 0;
            return (
              <motion.article
                key={item.label}
                {...reveal([0, 0.08, 0.16][i % 3])}
                className={
                  featured
                    ? "tp-bento flex min-h-[340px] flex-col gap-5 rounded-[28px] bg-primary p-10 text-warm"
                    : "tp-bento flex min-h-[340px] flex-col gap-5 rounded-[28px] bg-white p-10"
                }
              >
                <svg
                  className="tp-icon"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={featured ? "#A7E3C9" : "#0E5C4B"}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {purposeIcons[i]}
                </svg>
                <span className={featured ? "tp-eyebrow text-mint before:hidden" : "tp-eyebrow before:hidden"}>
                  {item.label}
                </span>
                <p className="tp-serif text-[28px] leading-[1.3]">{item.text}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Three paths */}
      <section className="tp tp-section">
        <div className="tp-container grid items-center gap-16 [grid-template-columns:repeat(auto-fit,minmax(min(480px,100%),1fr))]">
          <motion.div
            {...reveal()}
            className="aspect-square w-full max-w-[560px] overflow-hidden rounded-[32px] bg-deep"
          >
            <PathsDiagram />
          </motion.div>
          <div className="flex flex-col gap-7">
            <SectionTitle
              eyebrow="Our model"
              title={
                <>
                  Three paths, <Accent>one outcome.</Accent>
                </>
              }
            />
            <ol className="flex flex-col border-t border-dark/[.12]">
              {pillars.map((pillar, i) => (
                <motion.li
                  key={pillar.title}
                  {...reveal([0, 0.08, 0.16][i % 3], 32)}
                  className="tp-prow grid gap-5 rounded-xl border-b border-dark/[.12] px-3 py-[22px] [grid-template-columns:56px_1fr]"
                >
                  <span
                    className={`tp-pnode tp-black flex h-12 w-12 items-center justify-center rounded-full text-white ${PILLAR_NODE[i]}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex flex-col gap-1.5">
                    <strong className="tp-black text-xl">{pillar.title}</strong>
                    <span className="text-base leading-[1.6] text-muted">{pillar.description}</span>
                  </span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Our story — from the Sanity bio */}
      {bio && bio.length > 0 && (
        <section className="tp pb-20 md:pb-28">
          <div className="tp-container">
            <motion.div
              {...reveal()}
              className="grid items-start gap-12 rounded-[32px] bg-warm p-[clamp(32px,6vw,80px)] [grid-template-columns:repeat(auto-fit,minmax(min(380px,100%),1fr))]"
            >
              <div className="flex flex-col gap-[18px]">
                <span className="tp-eyebrow">Our story</span>
                <h2 className="tp-serif text-[clamp(34px,3.6vw,52px)] leading-[1.1]">
                  How TriPath <span className="tp-italic text-primary">came to be.</span>
                </h2>
              </div>
              <div className="text-lg leading-[1.7]">
                <PortableText value={bio} components={portableTextComponents} />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Team */}
      {team.length > 0 && (
        <section className="tp tp-section bg-dark text-warm">
          <div className="tp-container flex flex-col gap-[52px]">
            <SectionTitle
              light
              eyebrow="Our team"
              title={
                <>
                  The people <Accent light>behind the work.</Accent>
                </>
              }
              aside="Specialists across environmental policy, social governance and sustainable finance."
            />
            <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
              {team.map((member, i) => (
                <motion.article
                  key={member._id}
                  {...reveal([0, 0.08, 0.16, 0.08][i % 4])}
                  tabIndex={0}
                  aria-label={`${member.name}, ${member.role}`}
                  className="tp-member relative aspect-[4/5] overflow-hidden rounded-3xl bg-secondary outline-offset-4 focus-visible:outline-2 focus-visible:outline-mint"
                >
                  {member.image?.url && (
                    <img
                      src={sanityImage(member.image.url, 700)}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                  )}
                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-b from-transparent to-deep/[.92] p-5 pt-16">
                    <strong className="tp-black text-[19px] leading-tight">{member.name}</strong>
                    <span className="text-sm text-mint">{member.role}</span>
                  </div>
                  <div className="tp-ov absolute inset-0 flex flex-col justify-between gap-5 overflow-y-auto bg-primary/[.94] p-6">
                    {member.bio && <p className="text-[15px] leading-[1.6]">{member.bio}</p>}
                    <div className="flex flex-wrap gap-2">
                      {member.fullProfile && member.fullProfile.length > 0 && (
                        <ActionButton
                          variant="mint"
                          size="sm"
                          onClick={() => setSelectedMember(member)}
                        >
                          Full profile
                        </ActionButton>
                      )}
                      {member.linkedin_link && (
                        <a
                          href={member.linkedin_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tp-btn tp-btn--outline-light tp-btn--sm"
                        >
                          LinkedIn{" "}
                          <span className="tp-arr" aria-hidden="true">
                            →
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
            <p className="text-sm text-warm/75">Hover or tab onto a profile to see the bio.</p>
          </div>
        </section>
      )}

      <ProfileModal
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        member={selectedMember as Team}
      />

      {/* Breathing room after the dark team band */}
      <div className={team.length > 0 ? "pt-20 md:pt-28" : undefined}>
        <CTABand
          title={
            <>
              Let's work <Accent light>together.</Accent>
            </>
          }
          actions={
            <>
              <ActionButton href="/contact" variant="mint" arrow>
                Book a consultation
              </ActionButton>
              <ActionButton href="/services" variant="soft">
                Our services
              </ActionButton>
            </>
          }
        />
      </div>
    </div>
  );
}

export default AboutUs;
