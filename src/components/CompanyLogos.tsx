// import logo1 from "/src/assets/company_logo/GCM.png";
// import logo2 from "/src/assets/company_logo/adoa.png";
// import logo3 from "/src/assets/company_logo/bible_league.png";
// import logo4 from "/src/assets/company_logo/bsg.png";
// import logo5 from "/src/assets/company_logo/cbod.png";
// import logo6 from "/src/assets/company_logo/gbc.png";
// import logo7 from "/src/assets/company_logo/lic.png";
// import logo8 from "/src/assets/company_logo/mcg.png";
// import logo9 from "/src/assets/company_logo/vision.jpg";
import { motion } from "framer-motion";
import { animations } from "@/lib/animation";
import { useState } from "react";
// import { AnimatedHeading } from "./Heading";

const logos = [
  { src: "/assets/company_logo/GCM.png", alt: "GCM logo", name: "GCM" },
  { src: "/assets/company_logo/adoa.png", alt: "ADOA logo", name: "ADOA" },
  {
    src: "/assets/company_logo/bible_league.png",
    alt: "Bible League logo",
    name: "Bible League",
  },
  { src: "/assets/company_logo/bsg.png", alt: "BSG logo", name: "BSG" },
  { src: "/assets/company_logo/cbod.png", alt: "CBOD logo", name: "CBOD" },
  // { src: logo6, alt: "GBC logo", name: "GBC" },
  // { src: logo7, alt: "LIC logo", name: "LIC" },
  // { src: logo8, alt: "MCG logo", name: "MCG" },
  // { src: logo9, alt: "Vision logo", name: "Vision" },
];

export const CompanyLogos = () => {
  const [loadedLogos, setLoadedLogos] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleImageLoad = (name: string) => {
    setLoadedLogos((prev) => ({ ...prev, [name]: true }));
  };

  return (
    <section
      className="w-full min-h-[20vh] bg-white overflow-hidden py-20"
      aria-label="Our trusted partners"
    >
      <motion.h2
        className="text-4xl text-center md:text-5xl font-bold text-gray-900 relative z-10 mb-16"
        variants={animations.fadeIn}
      >
        <h1 className="relative inline-block">
          Organizations Who Trust Us
          <svg
            className="absolute -bottom-2 left-0 w-full"
            height="6"
            viewBox="0 0 200 6"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M0 3C50 3 50 1 100 1C150 1 150 5 200 5"
              stroke="#10b981"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </h1>
      </motion.h2>

      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-12"
          variants={animations.stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {logos.map((logo) => (
            <motion.div
              key={logo.name}
              className="relative group"
              variants={animations.fadeIn}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative aspect-[3/2] grayscale hover:grayscale-0  rounded-lg p-4 flex items-center justify-center  duration-300">
                {!loadedLogos[logo.name] && (
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 animate-pulse rounded-lg" />
                )}
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={`w-2/3 h-full object-contain transition-opacity duration-300 ${
                    loadedLogos[logo.name] ? "opacity-100" : "opacity-0"
                  }`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(logo.name)}
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-2">
                  <span className="text-sm font-medium text-gray-700">
                    {logo.name}
                  </span>
                </div> */}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
