import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface StatItem {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

export const stats: StatItem[] = [
  { value: 50, label: "Projects Completed", suffix: "+" },
  { value: 1000, label: "Lives Touched", suffix: "+" },
  { value: 20, label: "Clients Satisfied", suffix: "+" },
  //   { value: 95, label: "Client Satisfaction", suffix: "%" },
];

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

export const AnimatedNumber = ({
  value,
  suffix,
  prefix,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 steps for smooth animation
      const increment = value / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(Math.round(increment * step), value);
        setCount(current);

        if (step >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      className="flex items-baseline justify-center"
      variants={itemVariants}
    >
      {prefix && (
        <span className="text-2xl md:text-3xl text-emerald-600 font-light">
          {prefix}
        </span>
      )}
      <span className="text-xl md:text-2xl lg:text-3xl font-bold bg-emerald-600  bg-clip-text text-transparent">
        {count}
      </span>
      {suffix && (
        <span className="text-lg md:text-xl text-emerald-600 font-light">
          {suffix}
        </span>
      )}
    </motion.div>
  );
};

export default function ImpactStats() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-warm via-white to-warm py-20">
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/50 via-transparent to-transparent" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(14,92,75,0.05)_25%,rgba(14,92,75,0.05)_50%,transparent_50%,transparent_75%,rgba(14,92,75,0.05)_75%)] bg-[length:20px_20px]" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Discover the tangible results of our commitment to sustainable
            development and organizational transformation.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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
              <p className="mt-4 text-slate-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
