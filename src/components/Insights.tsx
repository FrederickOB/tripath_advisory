import { useInsights } from "@/hooks/useSanityData";
import InsightCard from "./InsightCard";
import ActionButton from "./ui/ActionButton";
import SectionTitle, { Accent } from "./ui/SectionTitle";

const Insights = () => {
  const { data } = useInsights({ limit: 3 });
  const insights = data?.insights ?? [];
  if (insights.length === 0) return null;

  return (
    <section id="insights" className="tp scroll-mt-20 pb-20 md:pb-28">
      <div className="tp-container flex flex-col gap-11">
        <SectionTitle
          eyebrow="Thought leadership"
          title={
            <>
              Latest <Accent>insights</Accent>
            </>
          }
          aside={
            <ActionButton href="/insights" variant="soft" arrow>
              All insights
            </ActionButton>
          }
        />
        <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(360px,100%),1fr))]">
          {insights.map((insight, i) => (
            <InsightCard key={insight._id} insight={insight} delay={[0, 0.08, 0.16][i % 3]} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;
