import React, { useState, useEffect, useRef } from "react";
import { caseStudies } from "../constants";
import { motion, AnimatePresence } from "framer-motion";

const AUTO_ROTATE_INTERVAL = 7000; // ms

const CaseStudies = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate logic
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % caseStudies.length);
    }, AUTO_ROTATE_INTERVAL);
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight")
        setActiveIndex((i) => (i + 1) % caseStudies.length);
      if (e.key === "ArrowLeft")
        setActiveIndex(
          (i) => (i - 1 + caseStudies.length) % caseStudies.length
        );
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <section
      id="case-studies"
      className="py-20 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">
            Case Studies
          </h2>
          <div className="w-20 h-1.5 bg-amber-600 mx-auto mb-6 rounded"></div>
          <p className="max-w-2xl mx-auto text-slate-600 text-lg">
            Explore how we've helped organizations transform challenges into
            opportunities for sustainable growth and positive impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Card Content */}
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-10 rounded-2xl border border-slate-100 shadow-xl"
              >
                <div className="inline-flex items-center px-4 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-4">
                  <svg
                    className="w-4 h-4 mr-2 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M12 6v6l4 2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {caseStudies[activeIndex].category}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  {caseStudies[activeIndex].title}
                </h3>
                <p className="text-slate-600 mb-8">
                  {caseStudies[activeIndex].description}
                </p>
                <motion.a
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#fbbf24",
                    color: "#fff",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  href="#contact"
                  className="inline-flex items-center px-5 py-3 bg-amber-50 text-amber-700 font-semibold rounded-lg shadow hover:shadow-lg transition-all"
                >
                  Discuss a similar project
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </motion.a>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="mt-8 flex space-x-4 justify-center">
              {caseStudies.map((cs, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-4 h-4 rounded-full border-2 border-amber-600 flex items-center justify-center transition-all duration-300
                    ${
                      activeIndex === index
                        ? "bg-amber-600 scale-125 shadow-lg"
                        : "bg-white hover:bg-amber-100"
                    }
                  `}
                  aria-label={`View case study: ${cs.title}`}
                  title={cs.title}
                >
                  {activeIndex === index && (
                    <span className="block w-2 h-2 bg-white rounded-full"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Image with Animation */}
          <div className="order-1 lg:order-2">
            <div className="relative h-80 md:h-96 lg:h-[32rem] overflow-hidden rounded-2xl shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={caseStudies[activeIndex].image}
                  src={caseStudies[activeIndex].image}
                  alt={caseStudies[activeIndex].title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
