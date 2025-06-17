import { motion } from "framer-motion";
import Heading from "./Heading";

interface Testimonial {
  name: string;
  position: string;
  company: string;
  image: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    position: "Sustainability Director",
    company: "Global Impact Corp",
    image: "/testimonials/sarah.jpg",
    text: "TriPath Advisory transformed our approach to sustainability. Their expertise in ESG frameworks and local implementation helped us achieve our sustainability goals while creating meaningful impact in our communities.",
  },
  {
    name: "Kwame Mensah",
    position: "CEO",
    company: "AfriTech Solutions",
    image: "/testimonials/kwame.jpg",
    text: "Working with TriPath Advisory has been transformative. Their deep understanding of both global standards and local contexts helped us develop strategies that are both ambitious and achievable.",
  },
  {
    name: "Amina Osei",
    position: "Development Manager",
    company: "West African Ventures",
    image: "/testimonials/amina.jpg",
    text: "The team at TriPath Advisory brings a unique perspective to sustainable development. Their ability to bridge international best practices with local realities has been invaluable to our organization.",
  },
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

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-primary/5 py-20">
      {/* Enhanced Background Patterns */}
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-warm/80 via-warm/40 to-transparent" />

        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(14,92,75,0.1)_25%,rgba(14,92,75,0.1)_50%,transparent_50%,transparent_75%,rgba(14,92,75,0.1)_75%)] bg-[length:20px_20px]" />
        </div>

        {/* Dots pattern */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,134,115,0.2)_1px,transparent_1px)] bg-[length:20px_20px]" />
        </div>
      </div>

      {/* Enhanced Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/30 rounded-full blur-3xl" />

      {/* Floating shapes */}
      <div className="absolute top-20 left-20 w-24 h-24 bg-secondary/30 rounded-lg rotate-12 blur-sm" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary/30 rounded-full blur-sm" />
      <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-secondary/30 rounded-lg -rotate-12 blur-sm" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"></h2>
          <p className="text-slate-600 max-w-2xl mx-auto"></p>
        </motion.div>
        <Heading
          label="TESTIMONIALS"
          title="What Our Clients Say"
          subtitle=""
          description=" Hear from organizations that have transformed their approach to
            sustainability and development with our guidance."
          className="my-8"
          align="center"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group"
              variants={itemVariants}
            >
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(16,185,129,0.05)_25%,rgba(16,185,129,0.05)_50%,transparent_50%,transparent_75%,rgba(16,185,129,0.05)_75%)] bg-[length:10px_10px]" />
              </div>

              {/* Quote Icon */}
              <div className="text-primary mb-6 relative">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Testimonial Text */}
              <p className="text-slate-600 mb-6 md:leading-relaxed relative text-sm">
                {testimonial.text}
              </p>

              {/* Author Info */}
              <div className="flex items-center relative">
                <div className="relative size-24 rounded-full overflow-hidden mr-4 ">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-slate-500">
                    {testimonial.position}
                  </p>
                  <p className="text-sm text-primary font-medium">
                    {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
