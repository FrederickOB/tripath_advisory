import { CompanyLogos } from "@/components/CompanyLogos";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
// import ImpactStats from "@/components/ImpactStats";
import Insights from "@/components/Insights";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Text from "@/components/Text";
import WhyChooseUs from "@/components/WhyChooseUs";

function Home() {
  return (
    <div className="font-sans relative  antialiased text-slate-800">
      <Hero />
      <Text />
      <CompanyLogos />
      {/* <ImpactStats /> */}
      <WhyChooseUs />
      <Services />
      <Testimonials />
      <Insights />
      <CTA />
    </div>
  );
}

export default Home;
