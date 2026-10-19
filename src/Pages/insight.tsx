import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import InsightCard from "@/components/InsightCard";
import SectionTitle, { Accent } from "@/components/ui/SectionTitle";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useInsightBySlug } from "@/hooks/useSanityData";
import { formatDate, readingTime } from "@/lib/format";
import { sanityImage } from "@/lib/image";
import { portableTextComponents } from "@/lib/portableTextComponents";
import { useReveal } from "@/lib/reveal";

const BackLink = ({ className = "self-start" }: { className?: string }) => (
  <Link to="/insights" className={`tp-link group ${className}`}>
    <span className="tp-arr transition-transform group-hover:-translate-x-1.5" aria-hidden="true">
      ←
    </span>
    Back to insights
  </Link>
);

export default function InsightPage() {
  const { slug } = useParams();
  const { data, loading, error } = useInsightBySlug(slug || "");
  const reveal = useReveal();
  const article = data?.insight;
  usePageMeta({
    title: article?.title ?? (loading ? "Insights" : "Insight not found"),
    description: article?.summary,
    image: article?.mainImage?.url ? sanityImage(article.mainImage.url, 1200) : undefined,
    path: `/insights/${slug ?? ""}`,
    type: article ? "article" : "website",
    noindex: !loading && !article,
  });

  if (loading) {
    return (
      <div className="tp flex min-h-screen items-center justify-center" role="status" aria-label="Loading">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (error || !data?.insight) {
    return (
      <div className="tp flex min-h-screen items-center justify-center px-5 pt-24">
        <div className="flex max-w-md flex-col items-center gap-5 text-center">
          <h1 className="tp-h2">Insight not found</h1>
          <p className="tp-lead">
            The insight you're looking for doesn't exist or has been removed.
          </p>
          <BackLink className="self-center" />
        </div>
      </div>
    );
  }

  const { insight, relatedInsights } = data;
  const minutes = readingTime(insight.body);
  const meta = [
    insight.author?.name && `By ${insight.author.name}`,
    formatDate(insight.publishedAt),
    minutes && `${minutes} min read`,
  ].filter(Boolean);

  return (
    <div className="relative min-h-screen antialiased text-dark">
      <section className="tp relative overflow-hidden pb-12 pt-32 md:pt-40">
        <div aria-hidden="true" className="tp-grid-bg absolute inset-0" />
        <div className="tp-container relative">
          <motion.div {...reveal(0, 24)} className="mx-auto flex max-w-[960px] flex-col gap-7">
            <BackLink />
            {insight.categories && insight.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {insight.categories.map((category) => (
                  <span key={category._id ?? category.title} className="tp-tag">
                    {category.title}
                  </span>
                ))}
              </div>
            )}
            <h1 className="tp-serif text-[clamp(38px,5vw,68px)] leading-[1.08] tracking-[-0.02em]">
              {insight.title}
            </h1>
            {insight.summary && <p className="tp-lead text-xl">{insight.summary}</p>}
            {meta.length > 0 && (
              <p className="text-[15px] text-muted">{meta.join(" · ")}</p>
            )}
          </motion.div>
          {insight.mainImage?.url && (
            <motion.div
              {...reveal(0.1)}
              className="mx-auto mt-12 aspect-video max-w-[1160px] overflow-hidden rounded-[28px] bg-forest"
            >
              <img
                src={sanityImage(insight.mainImage.url, 1800)}
                alt={insight.title}
                className="h-full w-full object-cover"
              />
            </motion.div>
          )}
        </div>
      </section>

      <section className="tp pb-20 md:pb-28">
        <div className="tp-container">
          <article className="mx-auto max-w-[760px] text-lg">
            {insight.body && (
              <PortableText value={insight.body} components={portableTextComponents} />
            )}
          </article>
        </div>
      </section>

      {relatedInsights && relatedInsights.length > 0 && (
        <section className="tp tp-section bg-warm">
          <div className="tp-container flex flex-col gap-11">
            <SectionTitle
              eyebrow="Keep reading"
              title={
                <>
                  Related <Accent>insights</Accent>
                </>
              }
            />
            <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]">
              {relatedInsights.map((related, i) => (
                <InsightCard key={related._id} insight={related} delay={(i % 3) * 0.08} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
