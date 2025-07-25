import { motion } from "framer-motion";
import Heading from "./Heading";
import { animations } from "@/lib/animation";
import { useState } from "react";
import Button from "./ui/Button";
import { ArrowRight } from "lucide-react";

function WhyChooseUs() {
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>(
    {}
  );

  const features = [
    {
      title: "Industry Expertise",
      description:
        "With specialists across environmental policy, social governance, and sustainable finance, we bring deep sector knowledge to every project.",
      imageSrc: "/assets/whychooseus/industry_expertise.png",
      imagePosition: "background",
    },
    {
      title: "Data-Driven Approach",
      description:
        "Our recommendations are backed by comprehensive research and analysis, ensuring evidence-based strategies that deliver measurable results.",
      className:
        "md:col-span-1 lg:col-span-2 bg-gradient-to-br from-white to-emerald-50",
      imageSrc: "/assets/whychooseus/data_driven.png",
    },
    {
      title: "Stakeholder Engagement",
      description:
        "We excel at bringing diverse voices to the table, ensuring inclusive solutions that address the needs of all affected communities.",
      imageSrc: "/assets/whychooseus/stakeholder_engagement.png",
    },
    {
      title: "Regulatory Compliance",
      description:
        "Stay ahead of evolving ESG regulations with our comprehensive compliance frameworks and future-proofed sustainability strategies.",
      imageSrc: "/assets/whychooseus/regulatory.png",
    },
    {
      title: "Sustainable Growth",
      description:
        "We help organizations achieve long-term prosperity by aligning business objectives with environmental stewardship and social responsibility.",
      imageSrc: "/assets/whychooseus/sustainable_growth.png",
    },
    {
      title: "Social Policy, Equity & Inclusion",
      description:
        "We turn global inclusion standards into actionable programmes that boost gender equity, empower youth and elevate under‑represented voices across Ghana and Africa.",

      imageSrc: "/assets/whychooseus/social_policy.png",
    },
  ];

  const handleImageLoad = (title: string) => {
    setLoadedImages((prev) => ({ ...prev, [title]: true }));
  };

  return (
    <section
      style={{ backgroundColor: "var(--color-warm)" }}
      className="py-24 relative overflow-hidden"
      aria-label="Why choose TriPath Advisory"
    >
      {/* Enhanced Background Patterns */}
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-warm/90 via-warm/60 to-transparent" />

        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(45deg, transparent 25%, color-mix(in srgb, var(--color-primary) 10%, transparent) 25%, color-mix(in srgb, var(--color-primary) 10%, transparent) 50%, transparent 50%, transparent 75%, color-mix(in srgb, var(--color-primary) 10%, transparent) 75%)`,
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        {/* Dots pattern */}
        <div className="absolute inset-0 opacity-15">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at center, color-mix(in srgb, var(--color-secondary) 20%, transparent) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />
        </div>
      </div>

      {/* Enhanced Decorative Elements */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-secondary) 30%, transparent)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-primary) 30%, transparent)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-dark) 20%, transparent)",
        }}
      />

      {/* Floating shapes */}
      <div
        className="absolute top-20 left-20 w-24 h-24 rounded-lg rotate-12 blur-sm"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-secondary) 20%, transparent)",
        }}
      />
      <div
        className="absolute bottom-20 right-20 w-32 h-32 rounded-full blur-sm"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-primary) 20%, transparent)",
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-20 h-20 rounded-lg -rotate-12 blur-sm"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-dark) 20%, transparent)",
        }}
      />

      <motion.div
        className="container mx-auto px-6 relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={animations.fadeIn}
      >
        {/* Section Header */}
        <Heading
          label="Why Choose Us"
          title="Our Approach"
          subtitle="Makes the Difference"
          description="We combine deep industry expertise with innovative methodologies to deliver sustainable solutions that create lasting impact."
          className="my-8"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8"
          variants={animations.stagger}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="overflow-hidden rounded-2xl shadow-md  hover:shadow-xl transition-all duration-300"
              variants={animations.card}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white p-6">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  {!loadedImages[feature.title] && (
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 animate-pulse" />
                  )}
                  <img
                    src={feature.imageSrc}
                    alt={`${feature.title} illustration`}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      loadedImages[feature.title] ? "opacity-100" : "opacity-0"
                    }`}
                    loading="lazy"
                    onLoad={() => handleImageLoad(feature.title)}
                  />
                </div>
              </div>

              <div className="pb-6 px-6 bg-white">
                <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h2>
                <p className="text-gray-600 text-sm md:text-base line-clamp-4">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}

        <motion.div className="mt-16 text-center" variants={animations.fadeIn}>
          <Button
            href="/contact"
            variant="primary"
            size="md"
            icon={ArrowRight}
            className="shadow-lg text-white"
          >
            Learn More About Our Approach
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default WhyChooseUs;
