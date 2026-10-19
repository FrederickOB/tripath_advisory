import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import InsightCard from "@/components/InsightCard";
import PageHeader from "@/components/PageHeader";
import ActionButton from "@/components/ui/ActionButton";
import { Accent } from "@/components/ui/SectionTitle";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useInsights, useCategories } from "@/hooks/useSanityData";
import { formatDate, readingTime } from "@/lib/format";
import { submitNetlifyForm } from "@/lib/forms";
import { sanityImage } from "@/lib/image";
import { useReveal } from "@/lib/reveal";
import type { Insight } from "@/types/schema";

const PAGE_SIZE = 10;

const FeaturedInsight = ({ insight }: { insight: Insight }) => {
  const reveal = useReveal();
  const minutes = readingTime(insight.body);
  const meta = [
    insight.categories?.[0]?.title,
    formatDate(insight.publishedAt),
    minutes && `${minutes} min read`,
  ].filter(Boolean);

  return (
    <motion.div {...reveal(0.2, 32)}>
      <Link
        to={`/insights/${insight.slug?.current}`}
        className="group grid overflow-hidden rounded-[32px] bg-deep text-warm no-underline [grid-template-columns:repeat(auto-fit,minmax(min(480px,100%),1fr))]"
      >
        <div className="relative min-h-[320px] overflow-hidden bg-forest md:min-h-[440px]">
          {insight.mainImage?.url && (
            <img
              src={sanityImage(insight.mainImage.url, 1200)}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]"
            />
          )}
          <span className="tp-tag absolute left-5 top-5">Featured</span>
        </div>
        <div className="flex flex-col justify-between gap-8 p-[clamp(32px,5vw,64px)]">
          <div className="flex flex-col gap-5">
            {meta.length > 0 && (
              <span className="tp-bold text-sm text-mint">{meta.join(" · ")}</span>
            )}
            <h2 className="tp-serif text-[clamp(32px,3.4vw,50px)] leading-[1.12]">{insight.title}</h2>
            {insight.summary && (
              <p className="text-lg leading-[1.65] text-warm/85">{insight.summary}</p>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            {insight.author?.name && (
              <span className="flex items-center gap-3 text-[15px]">
                {insight.author.image?.url ? (
                  <img
                    src={sanityImage(insight.author.image.url, 120)}
                    alt=""
                    className="h-11 w-11 rounded-full object-cover"
                  />
                ) : (
                  <span aria-hidden="true" className="h-11 w-11 rounded-full bg-secondary" />
                )}
                <strong className="tp-black">{insight.author.name}</strong>
              </span>
            )}
            <span className="tp-black inline-flex items-center gap-2.5 text-mint">
              Read article{" "}
              <span className="tp-arr transition-transform group-hover:translate-x-1.5" aria-hidden="true">
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Sign-ups arrive as Netlify form submissions until a mailing-list service is chosen
const Newsletter = () => {
  const reveal = useReveal();
  const [email, setEmail] = useState("");
  const [botField, setBotField] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitNetlifyForm("newsletter", { email, "bot-field": botField });
      setStatus("sent");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="tp pb-20 md:pb-28">
      <div className="tp-container">
        <motion.div
          {...reveal()}
          className="relative grid items-center gap-10 overflow-hidden rounded-[36px] bg-primary p-[clamp(36px,6vw,80px)] text-warm [grid-template-columns:repeat(auto-fit,minmax(min(420px,100%),1fr))]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 700 400"
            preserveAspectRatio="none"
            className="pointer-events-none absolute bottom-0 left-0 h-full w-[60%] opacity-25"
          >
            <path d="M0 400 C 200 360, 380 240, 480 160 S 640 40, 720 20" stroke="#A7E3C9" strokeWidth="1.5" fill="none" />
          </svg>
          <div className="relative flex flex-col gap-4">
            <h2 className="tp-h2 text-[clamp(34px,4vw,56px)]">
              Insights, <Accent light>in your inbox.</Accent>
            </h2>
            <p className="text-lg leading-[1.6] text-warm/85">
              Briefings on ESG, policy and inclusive development. No spam.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            aria-label="Newsletter sign-up"
            className="relative flex flex-wrap items-end gap-2.5"
          >
            <label className="tp-label flex-[1_1_260px] text-warm">
              Email address
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@organisation.org"
                className="tp-input tp-input--light"
              />
            </label>
            <input
              type="text"
              name="bot-field"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={botField}
              onChange={(e) => setBotField(e.target.value)}
              className="hidden"
            />
            <ActionButton
              type="submit"
              variant="mint"
              arrow={status !== "sending"}
              disabled={status === "sending"}
            >
              {status === "sending" ? "Subscribing…" : "Subscribe"}
            </ActionButton>
            <p role="status" className="w-full text-sm text-mint">
              {status === "sent" && "You're on the list. Thank you for subscribing."}
              {status === "error" && "Sorry, that didn't go through. Please try again in a moment."}
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  usePageMeta({
    title: "Insights",
    description:
      "Articles, research and commentary on ESG, sustainable finance, social policy and inclusive development from TriPath Advisory.",
    path: "/insights",
  });

  const { data, loading, error, filterByCategory, updateParams, queryParams } = useInsights({
    limit: PAGE_SIZE,
    filters: { category: "" },
  });
  const { data: categoriesData } = useCategories();

  const insights = data?.insights ?? [];
  const total = data?.total ?? 0;
  const [featured, ...rest] = insights;
  const canLoadMore = insights.length < total;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterByCategory(category);
  };

  // "Load more" widens the window instead of paging, so earlier cards stay put
  const loadMore = () => updateParams({ limit: (queryParams.limit ?? PAGE_SIZE) + PAGE_SIZE });

  // Remember the unfiltered total so the "All" chip keeps its count while filtering
  const [allCount, setAllCount] = useState(0);
  useEffect(() => {
    if (selectedCategory === "All" && data) setAllCount(data.total);
  }, [selectedCategory, data]);

  const filters = [
    { id: "all", title: "All", count: allCount },
    ...(categoriesData ?? []).map((c) => ({ id: c._id, title: c.title, count: c.count })),
  ];

  return (
    <div className="relative min-h-screen antialiased text-dark">
      <PageHeader
        grid={false}
        breadcrumb="Insights"
        eyebrow="Our latest"
        title={
          <>
            Thought <Accent>leadership.</Accent>
          </>
        }
        titleClassName="text-[clamp(56px,8vw,128px)] leading-[0.92]"
        description="Explore our latest articles, research and commentary on ESG, sustainable finance, social policy and inclusive development."
      />

      {featured && (
        <section className="tp -mt-4 pb-16 md:-mt-8 md:pb-[72px]">
          <div className="tp-container">
            <FeaturedInsight insight={featured} />
          </div>
        </section>
      )}

      <section className="tp pb-20 md:pb-28">
        <div className="tp-container flex flex-col gap-10">
          <div className="flex flex-wrap items-center justify-between gap-5 border-b border-dark/[.12] pb-6">
            <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className="tp-filter"
                  aria-pressed={selectedCategory === filter.title}
                  onClick={() => handleCategoryChange(filter.title)}
                >
                  {filter.title} <span>{filter.count}</span>
                </button>
              ))}
            </div>
            {!loading && (
              <span className="text-[15px] text-muted" aria-live="polite">
                Showing <strong className="tp-black text-dark">{insights.length}</strong>
                {total > insights.length && <> of {total}</>} {total === 1 ? "article" : "articles"}
              </span>
            )}
          </div>

          {loading && insights.length === 0 ? (
            <div className="flex justify-center py-12" role="status" aria-label="Loading">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
            </div>
          ) : error ? (
            <p className="py-12 text-center text-red-700">
              Error loading insights. Please try again later.
            </p>
          ) : insights.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-[28px] bg-warm px-6 py-16 text-center">
              <h2 className="tp-serif text-[28px]">
                {selectedCategory === "All"
                  ? "New insights are on the way"
                  : "Nothing in this topic yet"}
              </h2>
              <p className="text-muted">
                {selectedCategory === "All"
                  ? "Check back soon for research and commentary from our team."
                  : "Try another topic, or browse all insights."}
              </p>
            </div>
          ) : (
            <>
              {rest.length > 0 && (
                <div className="grid gap-x-6 gap-y-8 [grid-template-columns:repeat(auto-fill,minmax(min(360px,100%),1fr))]">
                  {rest.map((insight, i) => (
                    <InsightCard
                      key={insight._id}
                      insight={insight}
                      delay={(i % 3) * 0.07}
                      showSummary
                    />
                  ))}
                </div>
              )}
              {canLoadMore && (
                <div className="flex justify-center">
                  <ActionButton onClick={loadMore} disabled={loading}>
                    Load more articles{" "}
                    <span className="tp-arr" aria-hidden="true">
                      ↓
                    </span>
                  </ActionButton>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
