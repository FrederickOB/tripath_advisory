import { animations } from "@/lib/animation";
import clsx from "clsx";
import { motion } from "framer-motion";

interface HeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  description: string;
  badgeColor?: "emerald" | "blue" | "amber" | "rose";
  underlineColor?: string;
  className?: string;
  align?: "left" | "center";
}

function Heading({
  label,
  title,
  subtitle,
  description,
  badgeColor = "emerald",
  underlineColor = "#10b981",
  className = "",
  align = "center",
}: HeadingProps) {
  const colorVariants = {
    emerald: {
      badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
      gradient: "from-emerald-100 to-emerald-50",
    },
    blue: {
      badge: "bg-blue-50 text-blue-700 border-blue-100",
      gradient: "from-blue-100 to-blue-50",
    },
    amber: {
      badge: "bg-amber-50 text-amber-700 border-amber-100",
      gradient: "from-amber-100 to-amber-50",
    },
    rose: {
      badge: "bg-rose-50 text-rose-700 border-rose-100",
      gradient: "from-rose-100 to-rose-50",
    },
  };

  const selectedColor = colorVariants[badgeColor];

  return (
    <div
      className={clsx(
        "text-center mb-16 relative",
        className,
        align === "left" ? "text-left" : "text-center"
      )}
    >
      <motion.span
        className={`inline-block px-4 py-1.5 ${selectedColor.badge} rounded-full text-sm font-medium mb-4 relative z-10 border`}
        variants={animations.scale}
      >
        {label}
      </motion.span>

      <motion.h2
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative z-10"
        variants={animations.fadeIn}
      >
        <h1 className="relative  inline-block">
          {title}
          <svg
            className="absolute -bottom-2 left-0 w-full"
            height="6"
            viewBox="0 0 200 6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 3C50 3 50 1 100 1C150 1 150 5 200 5"
              stroke={underlineColor}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </h1>
        {subtitle && (
          <>
            <br />
            {subtitle}
          </>
        )}
      </motion.h2>

      <motion.p
        className="max-w-2xl mx-auto text-lg text-gray-600 mt-6"
        variants={animations.fadeIn}
      >
        {description}
      </motion.p>
    </div>
  );
}

export default Heading;
