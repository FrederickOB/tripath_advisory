import CaseStudy from "@/components/CaseStudy";
import { CompanyLogos } from "@/components/CompanyLogos";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import ImpactStats from "@/components/ImpactStats";
import Insights from "@/components/Insights";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Ticker from "@/components/Ticker";
import WhyChooseUs from "@/components/WhyChooseUs";
import { usePageMeta } from "@/hooks/usePageMeta";
import {
  useClientServices,
  useImpactStats,
  useTestimonials,
} from "@/hooks/useSanityData";

function Home() {
  usePageMeta({ path: "/" });

  // The hero's "See Our Impact" button targets #case-studies. When there is no
  // case study or testimonial yet, that anchor moves to the next best section.
  const { data: cases } = useClientServices();
  const { data: testimonials } = useTestimonials();
  const { data: stats } = useImpactStats();
  const hasCase = !!cases?.length || !!testimonials?.length;
  const hasStats = !!stats?.length;

  return (
    <div className="relative antialiased text-dark">
      {/* The hero headline is drawn on a canvas; this gives the page a real heading */}
      <h1 className="sr-only">TriPath Advisory: Policy. People. Planet.</h1>
      <Hero />
      <Ticker />
      <CompanyLogos />
      <Services />
      <WhyChooseUs />
      <ImpactStats id={hasCase ? "impact" : "case-studies"} />
      <Process id={!hasCase && !hasStats ? "case-studies" : undefined} />
      <CaseStudy />
      <Insights />
      <Contact />
    </div>
  );
}

export default Home;
