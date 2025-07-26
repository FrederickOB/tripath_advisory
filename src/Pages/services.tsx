import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Target,
  Lightbulb,
  Shield,
  TrendingUp,
} from "lucide-react";
import { animations } from "@/lib/animation";
import Button from "@/components/ui/Button";
import { useServices } from "@/hooks/useSanityData";

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

export default function ServicesPage() {
  const { data: services, loading, error } = useServices();

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm via-white to-warm">
      <section className="relative h-[40vh] bg-gradient-to-br from-primary to-primary/90 flex items-center justify-center">
        <div className="absolute inset-0 bg-dark/30" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6"
            variants={animations.fadeIn}
            initial="initial"
            animate="animate"
          >
            Our Services
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl mx-auto font-normal"
            variants={animations.fadeIn}
            initial="initial"
            animate="animate"
          >
            Comprehensive ESG and sustainable development solutions for
            organizations across Africa
          </motion.p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-20"
            variants={animations.fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
              Transforming Challenges into Opportunities
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Our integrated approach combines deep expertise in ESG, social
              policy, and community development to deliver holistic solutions
              that drive meaningful change across the continent.
            </p>
          </motion.div>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-500">
              <p>Error loading services. Please try again later.</p>
            </div>
          ) : (
            <motion.div
              className="grid  gap-24"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {services &&
                services?.length > 0 &&
                services.map((service, index) => {
                  return (
                    <motion.div
                      key={index}
                      className="relative"
                      variants={itemVariants}
                    >
                      {/* Service Header */}
                      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        <div
                          className={`order-2 ${
                            index % 2 === 0 ? "md:order-1" : "md:order-2"
                          }`}
                        >
                          <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-3xl font-bold underline text-slate-800">
                              {service?.title}
                            </h2>
                          </div>
                          <p className="text-lg text-slate-600 leading-relaxed mb-8">
                            {service?.description}
                          </p>
                          <Button
                            href="#services"
                            variant="primary"
                            size="sm"
                            icon={ArrowRight}
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            Learn More
                          </Button>
                        </div>
                        <div
                          className={`order-1 ${
                            index % 2 === 0 ? "md:order-2" : "md:order-1"
                          }`}
                        >
                          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group">
                            <img
                              src={service?.image?.url}
                              alt={service?.title}
                              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                      </div>

                      {/* Service Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Benefits */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                              <TrendingUp className="w-6 h-6 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">
                              Benefits
                            </h3>
                          </div>
                          <ul className="space-y-4">
                            {service?.benefits &&
                              service?.benefits?.length > 0 &&
                              service.benefits?.map((benefit, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-3 text-slate-600"
                                >
                                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                          </ul>
                        </div>

                        {/* Approach */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                              <Lightbulb className="w-6 h-6 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">
                              Our Approach
                            </h3>
                          </div>
                          <ul className="space-y-4">
                            {service?.approach &&
                              service?.approach.length > 0 &&
                              service?.approach?.map((item, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-3 text-slate-600"
                                >
                                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                          </ul>
                        </div>

                        {/* Frameworks */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                              <Shield className="w-6 h-6 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">
                              Frameworks
                            </h3>
                          </div>
                          <ul className="space-y-4">
                            {service?.frameworks &&
                              service?.frameworks.length > 0 &&
                              service?.frameworks?.map((framework, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-3 text-slate-600"
                                >
                                  <ChevronRight className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                                  <span>{framework}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </motion.div>
          )}
        </div>
      </section>

      {/* Client Showcase Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-16"
            variants={animations.fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
              Trusted by Leading Organizations
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              We've partnered with organizations across Africa to drive
              sustainable impact and create lasting change in their communities.
            </p>
          </motion.div>

          {/* Client Logos */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Global Impact Corp",
                logo: "/src/assets/clients/global-impact.png",
              },
              {
                name: "AfriTech Solutions",
                logo: "/src/assets/clients/afritech.png",
              },
              {
                name: "West African Ventures",
                logo: "/src/assets/clients/wav.png",
              },
              {
                name: "Ghana Development Bank",
                logo: "/src/assets/clients/gdb.png",
              },
            ].map((client, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Client Success Stories */}
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "ESG Transformation",
                client: "Global Impact Corp",
                description:
                  "Helped implement comprehensive ESG strategies resulting in 40% reduction in carbon emissions and improved stakeholder engagement.",
                metrics: [
                  { label: "Carbon Reduction", value: "40%" },
                  { label: "Stakeholder Satisfaction", value: "85%" },
                ],
              },
              {
                title: "Community Development",
                client: "West African Ventures",
                description:
                  "Developed and implemented community engagement programs that benefited over 10,000 people across rural communities.",
                metrics: [
                  { label: "Communities Reached", value: "15+" },
                  { label: "People Impacted", value: "10,000+" },
                ],
              },
            ].map((story, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Target className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      {story.title}
                    </h3>
                    <p className="text-emerald-600 font-medium">
                      {story.client}
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 mb-6">{story.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {story.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="bg-slate-50 rounded-xl p-4 text-center"
                    >
                      <p className="text-2xl font-bold text-emerald-600 mb-1">
                        {metric.value}
                      </p>
                      <p className="text-sm text-slate-600">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-900 to-teal-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/pattern.png')] opacity-10" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            className="max-w-4xl mx-auto text-center text-white"
            variants={animations.fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to Create Sustainable Impact?
            </h2>
            <p className="text-xl mb-12 text-teal-100 leading-relaxed font-normal">
              Let's work together to develop solutions that drive positive
              change and create lasting value for your organization and
              stakeholders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/contact"
                variant="primary"
                size="sm"
                icon={ArrowRight}
                className="bg-white text-primary hover:bg-white/90"
              >
                Get in Touch
              </Button>
              <Button
                href="/brochure"
                variant="outline"
                size="sm"
                icon={ArrowRight}
                className="border-white text-white hover:bg-white/10"
              >
                Download Brochure
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
