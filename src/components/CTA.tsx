import { animations } from "@/lib/animation";
import { motion } from "framer-motion";
import { Link } from "react-router";

const MotionLink = motion(Link);

export default function CTA() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 py-24"
      aria-label="Call to action"
    >
      {/* Simplified Background Pattern */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* Subtle Decorative Elements */}
      <div
        className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Ready to Transform Your Organization?
            </h2>
            <p className="text-slate-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Join us in creating sustainable impact. Let's work together to
              align your strategy with meaningful change.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div className="text-center" variants={animations.fadeIn}>
                <MotionLink
                  to="/contact"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-emerald-700 transition-colors shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Reach Out to Us</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </MotionLink>
              </motion.div>
              <motion.div className="text-center" variants={animations.fadeIn}>
                <MotionLink
                  to="/services"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-slate-700/80 hover:bg-slate-600 rounded-full transition-all duration-200 shadow-lg hover:shadow-slate-500/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Learn More</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </MotionLink>
              </motion.div>
            </div>

            {/* Enhanced Trust Indicators */}
            <motion.div
              className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-slate-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-slate-800/50 backdrop-blur-sm">
                <div className="p-3 rounded-full bg-emerald-500/10">
                  <svg
                    className="w-6 h-6 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="font-medium">Expert Consultation</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-slate-800/50 backdrop-blur-sm">
                <div className="p-3 rounded-full bg-emerald-500/10">
                  <svg
                    className="w-6 h-6 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="font-medium">Quick Response</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-slate-800/50 backdrop-blur-sm">
                <div className="p-3 rounded-full bg-emerald-500/10">
                  <svg
                    className="w-6 h-6 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <span className="font-medium">Secure Process</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
