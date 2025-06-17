import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import Button from "./ui/Button";

export default function CTA() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/90" />
      <div className="absolute inset-0 bg-[url('/assets/pattern.png')] opacity-10" />

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
            <p className="text-slate-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-normal">
              Join us in creating sustainable impact. Let's work together to
              align your strategy with meaningful change.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                icon={ArrowRight}
                className="bg-white text-primary hover:bg-white/90"
              >
                Reach Out to Us
              </Button>
              <Button
                href="/services"
                variant="outline"
                size="lg"
                icon={ArrowRight}
                className="border-white text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>

            {/* Enhanced Trust Indicators */}
            <motion.div
              className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-slate-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-slate-800/10 backdrop-blur-sm">
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
              <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-slate-800/10 backdrop-blur-sm">
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
              <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-slate-800/10 backdrop-blur-sm">
                <div className="p-3 rounded-full bg-emerald-500/10">
                  <Flame className="w-6 h-6 text-emerald-500" />
                </div>
                <span className="font-medium">Exceptional Results</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
