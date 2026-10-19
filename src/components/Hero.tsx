import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { animations } from "@/lib/animation";
import { lazy, Suspense, useState } from "react";
import Button from "./ui/Button";
import WarpText from "./WarpText.jsx";
import "./WarpText.css";

// three.js is loaded on demand so the headline renders immediately
const HeroCanvas = lazy(() => import("./hero/HeroCanvas"));

const Hero = () => {
  const [sceneReady, setSceneReady] = useState(false);

  return (
    <section
      id="home"
      className="relative pt-20 min-h-screen lg:h-screen flex items-center overflow-hidden bg-[#03110d]"
      aria-label="Hero section"
    >
      {/* CSS fallback shown until (or instead of) the WebGL scene */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 72% 48%, rgba(31,143,115,0.35), transparent 70%), linear-gradient(to bottom, #020a08, #0c3a2f 52%, #03110d)",
        }}
        aria-hidden="true"
      />

      {/* Three paths — Policy, People, Planet — converging on one horizon */}
      <div
        className={`absolute inset-0 z-10 transition-opacity duration-[1500ms] ease-out ${
          sceneReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <Suspense fallback={null}>
          <HeroCanvas onReady={() => setSceneReady(true)} />
        </Suspense>
      </div>

      {/* Legibility scrims behind the copy */}
      <div
        className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#020a08]/90 via-[#020a08]/35 to-transparent lg:bg-gradient-to-r lg:from-[#020a08]/80 lg:via-[#020a08]/30 lg:to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 z-10 pointer-events-none bg-gradient-to-t from-[#020a08]/70 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container mx-auto px-6 z-20 py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-white text-center lg:col-span-2"
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
                className="text-sm"
                // className="inline-block text-[0.55rem] px-2 md:px-4 py-1 border border-white/25 rounded-full bg-white/10 backdrop-blur-sm md:text-sm font-medium"
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
              <WarpText
                text="Policy. People. Planet."
                warpStrength={0.08}
                warpScale={1.7}
                speed={0.55}
                lens="bulge"
                pointerInfluence={0.42}
                pointerStrength={0.38}
                refraction={0.018}
                chromatic={0.35}
                idleDrift={0.2}
                ripple
                clickRipple
                intro
                fontSize="calc(clamp(6rem, 13vw, 16rem) + 3rem)"
                // fontWeight={900}
                // style={{ height: "250px" }}
                fontFamily="inherit"
                letterSpacing="-0.06em"
                lineHeight={0.9}
              />
              {/* <motion.h1
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                
              </motion.h1>{" "}
              <motion.h1
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                
              </motion.h1>{" "}
              <motion.h1
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                Planet.
              </motion.h1> */}
            </motion.div>

            <motion.p
              className="max-w-2xl mx-auto md:text-xl mb-8 text-gray-100 leading-relaxed font-normal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
            >
              We help governments, development partners and businesses across
              Africa turn ESG commitments, policy reform and inclusion goals
              into results that can be measured.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center gap-4"
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
