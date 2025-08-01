import { animations } from "@/lib/animation";
// import { services } from "../constants";
import { AnimatePresence, motion } from "framer-motion";
import Heading from "./Heading";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Service } from "@/types/schema";
import { useServices } from "@/hooks/useSanityData";

const ProgressBar: React.FC<{ progress: number; duration: number }> = ({
  progress,
  // duration,
}) => {
  return (
    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-primary"
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1, ease: "linear" }}
      />
    </div>
  );
};

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const AUTO_ADVANCE_DURATION = 10000; // 10 seconds

  const { data: services } = useServices();

  console.log("Services fetched:", services);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % (services?.length || 0));
      setProgress(0);
    }, AUTO_ADVANCE_DURATION);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 100 / (AUTO_ADVANCE_DURATION / 50);
      });
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [services?.length]);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  return (
    <section id="services" className="py-24 relative">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-white opacity-80 z-0"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMGI5ODEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50 z-0"></div>

      <motion.div
        className="container mx-auto px-6 relative z-10"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={animations.fadeIn}
      >
        <Heading
          label="OUR SERVICES"
          title="Tailored Solutions"
          subtitle="For Your Business Needs"
          description="Our expert team delivers customized strategies that address your unique challenges and drive sustainable growth."
          className="my-8"
        />

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              {services && services?.length > 0 && services[activeIndex]?.title}{" "}
              ({activeIndex + 1} of {services?.length})
            </span>
            <span className="text-sm text-gray-500">Auto-advancing</span>
          </div>
          <ProgressBar progress={progress} duration={AUTO_ADVANCE_DURATION} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {services &&
              services.map((service, index) => (
                <ServiceCard
                  key={service.title + index}
                  service={service}
                  index={index}
                  isActive={index === activeIndex}
                  onClick={() => handleCardClick(index)}
                />
              ))}
          </div>
          {services && services?.length > 0 && (
            <div className="overflow-hidden hidden md:block rounded-xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={services[activeIndex]?.title}
                  src={
                    (services[activeIndex]?.image?.url as string) ||
                    "src/assets/hero.png"
                  }
                  alt={services[activeIndex]?.title}
                  className="w-full h-full object-cover aspect-video"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>{" "}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Services;
const ServiceCard: React.FC<{
  service: Service;
  index: number;
  isActive: boolean;
  onClick: () => void;
}> = ({ service, index, isActive, onClick }) => {
  const formattedNumber = (index + 1).toString().padStart(2, "0");

  return (
    <motion.div
      className="relative cursor-pointer group"
      onClick={onClick}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div
        className={clsx(
          "flex items-start md:gap-8 gap-4  md:py-8 md:px-6 rounded-2xl   bg-white hover:bg-gray-50 transition-all duration-300 group-hover:shadow-lg",
          isActive ? "border-primary" : ""
        )}
      >
        {/* Number */}
        <div className="flex-shrink-0">
          <span className="text-lg md:text-2xl font-light text-gray-400 group-hover:text-gray-600 transition-colors">
            {formattedNumber}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 ">
          <h3
            className={clsx(
              "text-lg md:text-2xl font-semibold  mb-3 group-hover:text-primary transition-colors",
              isActive ? "text-primary underline" : "text-gray-900 "
            )}
          >
            {service.title}
          </h3>
          <p
            className={clsx(
              isActive
                ? "text-gray-600 leading-relaxed text-sm md:text-base"
                : "hidden"
            )}
          >
            {service.description}
          </p>
        </div>
      </div>
      <div
        className={clsx(
          isActive ? "md:hidden block" : "hidden",
          " overflow-hidden rounded-xl mt-4"
        )}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={service.title}
            src={service?.image.url || "src/assets/hero.png"}
            alt={service.title}
            className="w-full h-full object-cover aspect-video"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>{" "}
      </div>
    </motion.div>
  );
};
