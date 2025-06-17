import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { animations } from "@/lib/animation";
import { useState } from "react";

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section
      id="home"
      className="relative top-0 min-h-screen flex items-end overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background with parallax effect */}
      <div className="absolute inset-0 z-0">
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          aria-hidden="true"
        />

        {/* Animated geometric shapes */}
        <div
          className="absolute inset-0 z-30 overflow-hidden opacity-20 mix-blend-soft-light"
          aria-hidden="true"
        >
          <motion.div
            className="absolute top-[10%] right-[15%] w-64 h-64 rounded-full bg-emerald-300/30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-[20%] left-[10%] w-96 h-96 rounded-full bg-blue-600/20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute top-[40%] left-[30%] w-48 h-48 rounded-full bg-amber-300/20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0.8, 1, 0.8],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        {/* Parallax background image */}
        <motion.div
          className="absolute inset-0 z-10 scale-x-[-1]"
          style={{ y: scrollY * 0.2 }}
        >
          <div
            className={`w-full h-full transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src="src/assets/hero.png"
              alt="Sustainable development landscape with modern architecture and green spaces"
              className="w-full h-full object-cover object-right"
              loading="eager"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 animate-pulse" />
          )}
        </motion.div>
      </div>

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
                className="inline-block px-4 py-1 border rounded-full bg-white/20 text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                Environmental Sustainability Consultancy
              </motion.span>
            </motion.div>

            <motion.div
              className="text-4xl sm:text-5xl lg:text-8xl  font-extrabold mb-6 tracking-tight"
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
              className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
            >
              Empowering inclusive, data-driven, and sustainable transformation
              across Africa and beyond.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 font-lato"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
            >
              <motion.a
                href="#services"
                className="px-8 py-4 bg-blue-600 transition-all rounded-full text-center sm:text-left flex items-center justify-center sm:justify-start gap-2 group shadow-lg shadow-emerald-900/30"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                aria-label="Explore our services"
              >
                Explore Our Services
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                >
                  <div className="size-6 bg-white rounded-full flex items-center justify-center">
                    <ArrowRight size={18} className="text-blue-600" />
                  </div>
                </motion.div>
              </motion.a>
              <motion.a
                href="#case-studies"
                className="px-8 py-4 bg-transparent border-2 border-white/30 rounded-full backdrop-blur-sm text-white font-medium hover:bg-white/10 hover:border-white transition-all text-center sm:text-left shadow-lg shadow-emerald-900/10"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                aria-label="View our case studies"
              >
                See Our Impact
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
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
