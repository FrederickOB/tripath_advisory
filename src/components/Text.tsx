import { motion } from "framer-motion";
import { AnimatedNumber, stats } from "./ImpactStats";
import { useState } from "react";

export default function Text() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="py-20 bg-white" aria-label="About TriPath Advisory">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              variants={itemVariants}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl"
            >
              <div
                className={`w-full h-full transition-opacity duration-500 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src="/assets/girl.jpg"
                  alt="Professional consultant working on sustainable development projects"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 animate-pulse" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
            {/* Decorative elements */}
            <div
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-100/30 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -top-6 -left-6 w-32 h-32 bg-blue-100/30 rounded-full blur-3xl"
              aria-hidden="true"
            />
          </motion.div>

          {/* Right Column - Text and Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8 flex flex-col justify-between h-full py-10"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-4xl font-bold text-slate-800">
                Transforming Organizations Through{" "}
                <span className="text-emerald-600">Sustainable</span> Solutions
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                TriPath Advisory is a Ghana-based consulting firm helping
                organisations align strategy with{" "}
                <span className="text-emerald-600 font-medium">
                  sustainability
                </span>
                , <span className="text-blue-600 font-medium">inclusion</span>,
                and <span className="text-slate-800 font-medium">impact</span>.
                We bridge global frameworks with local realities to co-create
                ESG solutions, policy reforms, and inclusive development models
                that work.
              </p>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              aria-label="Key statistics"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={itemVariants}
                >
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                  <p className="mt-4 text-slate-600 font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
