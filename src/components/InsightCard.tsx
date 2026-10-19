import { motion } from "framer-motion";
import { Link } from "react-router";
import { formatDate, readingTime } from "@/lib/format";
import { sanityImage } from "@/lib/image";
import { useReveal } from "@/lib/reveal";
import type { Insight } from "@/types/schema";

const InsightCard = ({
  insight,
  delay = 0,
  showSummary = false,
}: {
  insight: Insight;
  delay?: number;
  showSummary?: boolean;
}) => {
  const reveal = useReveal();
  const tag = insight.categories?.[0]?.title;
  const minutes = readingTime(insight.body);
  const meta = [formatDate(insight.publishedAt), minutes && `${minutes} min read`]
    .filter(Boolean)
    .join(" · ");

  return (
    <motion.article {...reveal(delay)}>
      <Link to={`/insights/${insight.slug?.current}`} className="tp-card">
        <div className="tp-card-img relative h-[260px] overflow-hidden rounded-[22px] bg-primary">
          {insight.mainImage?.url && (
            <img
              src={sanityImage(insight.mainImage.url, 800)}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          )}
          {tag && <span className="tp-tag absolute left-4 top-4">{tag}</span>}
        </div>
        {meta && <span className="text-sm text-muted">{meta}</span>}
        <h3 className="tp-card-title tp-serif self-start text-[26px] leading-[1.25]">
          {insight.title}
        </h3>
        {showSummary && insight.summary && (
          <p className="-mt-1 line-clamp-2 text-base leading-[1.6] text-muted">{insight.summary}</p>
        )}
      </Link>
    </motion.article>
  );
};

export default InsightCard;
