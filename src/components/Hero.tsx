import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { animations } from "@/lib/animation";
import { useState, useRef } from "react";
import Button from "./ui/Button";

const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = () => {
    console.error("Error loading video");
    setVideoLoaded(true); // Set to true to show fallback
  };

  return (
    <section
      id="home"
      className="relative pt-20 min-h-screen lg:h-screen flex items-end overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background with parallax effect */}
      {/* <div className="absolute inset-0 z-0"> */}
      {/* Animated gradient overlay */}
      {/* <motion.div
          className="absolute inset-0 z-20"
          // style={{
          //   background: `linear-gradient(to bottom right, color-mix(in srgb, var(--color-primary) 95%, black), color-mix(in srgb, var(--color-primary) 90%, black), color-mix(in srgb, var(--color-primary) 95%, black))`,
          // }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          aria-hidden="true"
        /> */}

      {/* Animated geometric shapes */}
      {/*  */}

      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0 z-10"
        // style={{ y: scrollY * 0.2 }}
      >
        <div
          className={`w-full h-full transition-opacity duration-500 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <video
            ref={videoRef}
            src="/assets/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-screen object-cover object-top"
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
          />
        </div>
        {!videoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 animate-pulse" />
        )}
      </motion.div>
      {/* </div> */}

      {/* Content */}
      <div className="container mx-auto px-6 z-20 py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-white max-w-2xl"
            initial="initial"
            animate="animate"
            variants={animations.stagger}
          >
            <motion.div
              className="inline-block overflow-hidden mb-6"
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.span
                className="inline-block text-[0.55rem] px-2 md:px-4 py-1 border rounded-full bg-white/20 md:text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                Environmental Sustainability Consultancy
              </motion.span>
            </motion.div>

            <motion.div
              className="text-4xl sm:text-5xl lg:text-8xl font-bold mb-6 tracking-tight"
              variants={animations.fadeIn}
            >
              <motion.h1
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                Policy.
              </motion.h1>{" "}
              <motion.h1
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                People.
              </motion.h1>{" "}
              <motion.h1
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                Planet.
              </motion.h1>
            </motion.div>

            <motion.p
              className=" md:text-2xl mb-8 text-gray-100 leading-relaxed font-normal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
            >
              Empowering inclusive, data-driven, and sustainable transformation
              across Africa and beyond.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
            >
              <Button
                href="#services"
                variant="primary"
                size="lg"
                icon={ArrowRight}
                className="shadow-lg"
                // style={{
                //   boxShadow:
                //     "0 10px 30px color-mix(in srgb, var(--color-primary) 30%, transparent)",
                // }}
              >
                Explore Our Services
              </Button>
              <Button
                href="#case-studies"
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white backdrop-blur-sm"
              >
                See Our Impact
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute hidden bottom-10 left-1/2 transform -translate-x-1/2 md:flex flex-col items-center z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="text-white/70 text-sm mb-2 font-light">
          Scroll to discover
        </span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-3 bg-gradient-to-b from-emerald-400 to-blue-600 rounded-full mt-2"
            animate={{
              y: [0, 12, 0],
              opacity: [0.8, 0.2, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
