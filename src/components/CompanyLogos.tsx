import { motion } from "framer-motion";
import { animations } from "@/lib/animation";
import { useClients } from "@/hooks/useSanityData";

export const CompanyLogos = () => {
  const { data: clients } = useClients();
  return clients && clients.length > 0 ? (
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
              stroke="#0e5c4b"
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
          {clients.map((client) => (
            <motion.div
              key={client.name}
              className="relative group"
              variants={animations.fadeIn}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative aspect-[3/2] grayscale hover:grayscale-0  rounded-lg p-4 flex items-center justify-center  duration-300">
                {client && (
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 animate-pulse rounded-lg" />
                )}
                <img
                  src={client.logo.url}
                  alt={client.name}
                  className={`w-2/3 h-full object-contain transition-opacity duration-300 ${
                    client.name ? "opacity-100" : "opacity-0"
                  }`}
                  loading="lazy"
                  // onLoad={() => handleImageLoad(logo.name)}
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
  ) : (
    <></>
  );
};
