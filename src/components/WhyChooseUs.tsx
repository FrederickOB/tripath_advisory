import { motion } from "framer-motion";
import Heading from "./Heading";
import { animations } from "@/lib/animation";
import { useState } from "react";

function WhyChooseUs() {
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>(
    {}
  );

  const features = [
    {
      title: "Industry Expertise",
      description:
        "With specialists across environmental policy, social governance, and sustainable finance, we bring deep sector knowledge to every project.",
      imageSrc: "src/assets/whychooseus/industry_expertise.png",
      imagePosition: "background",
    },
    {
      title: "Data-Driven Approach",
      description:
        "Our recommendations are backed by comprehensive research and analysis, ensuring evidence-based strategies that deliver measurable results.",
      className:
        "md:col-span-1 lg:col-span-2 bg-gradient-to-br from-white to-emerald-50",
      imageSrc: "src/assets/whychooseus/data_driven.png",
    },
    {
      title: "Stakeholder Engagement",
      description:
        "We excel at bringing diverse voices to the table, ensuring inclusive solutions that address the needs of all affected communities.",
      imageSrc: "src/assets/whychooseus/stakeholder_engagement.png",
    },
    {
      title: "Regulatory Compliance",
      description:
        "Stay ahead of evolving ESG regulations with our comprehensive compliance frameworks and future-proofed sustainability strategies.",
      imageSrc: "src/assets/whychooseus/regulatory.png",
    },
    {
      title: "Sustainable Growth",
      description:
        "We help organizations achieve long-term prosperity by aligning business objectives with environmental stewardship and social responsibility.",
      imageSrc: "src/assets/whychooseus/sustainable_growth.png",
    },
  ];

  const handleImageLoad = (title: string) => {
    setLoadedImages((prev) => ({ ...prev, [title]: true }));
  };

  return (
    <section
      className="py-24 bg-slate-50 relative overflow-hidden"
      aria-label="Why choose TriPath Advisory"
    >
      {/* Enhanced Background Patterns */}
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-slate-50/60 to-transparent" />

        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(16,185,129,0.1)_25%,rgba(16,185,129,0.1)_50%,transparent_50%,transparent_75%,rgba(16,185,129,0.1)_75%)] bg-[length:20px_20px]" />
        </div>

        {/* Dots pattern */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2)_1px,transparent_1px)] bg-[length:20px_20px]" />
        </div>
      </div>

      {/* Enhanced Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-200/20 rounded-full blur-3xl" />

      {/* Floating shapes */}
      <div className="absolute top-20 left-20 w-24 h-24 bg-blue-200/20 rounded-lg rotate-12 blur-sm" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-emerald-200/20 rounded-full blur-sm" />
      <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-slate-200/20 rounded-lg -rotate-12 blur-sm" />

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
          badgeColor="blue"
          underlineColor="#3b82f6"
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
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h2>
                <p className="text-gray-600 line-clamp-4">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div className="mt-16 text-center" variants={animations.fadeIn}>
          <motion.button
            className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-emerald-700 transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Learn More About Our Approach</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default WhyChooseUs;
