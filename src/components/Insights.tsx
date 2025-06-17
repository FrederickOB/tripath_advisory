import { motion } from "framer-motion";
import { insights } from "@/constants";
import Button from "./ui/Button";
import Heading from "./Heading";

const Insights = () => {
  return (
    <section className="py-20 bg-warm">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
          {/* <div className="mb-8 md:mb-0 md:max-w-xl">
            <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm mb-4">
              ✨ Features
            </span>
            <h2 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
              Built to Keep You Moving,
              <br />
              Not Micro-Managing
            </h2>
          </div> */}
          <Heading
            label="INSIGHTS"
            title="Our Latest "
            subtitle="Thought Leadership"
            description="Explore our latest articles, research, and commentary on ESG, sustainable finance, social policy, and inclusive development. Stay informed with perspectives from our team and guest experts."
            className="my-8"
            align="left"
          />
          <div className="md:max-w-lg text-slate-600 text-lg">
            From planning to progress tracking, Dash gives CEOs, founders, and
            teams the tools they need to manage tasks, lead projects, and hit
            goals.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-slate-500 mb-2 font-normal">
                  {insight.date} • By {insight.author}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 hover:text-teal-700 transition-colors">
                  <a href="#">{insight.title}</a>
                </h3>
                <p className="text-slate-600 mb-4 font-normal">
                  {insight.excerpt}
                </p>
                <Button
                  href="#"
                  variant="link"
                  className="text-primary hover:underline"
                >
                  Read More
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            href="/insights"
            variant="outline"
            size="md"
            className="border-primary text-primary hover:bg-primary/10"
          >
            View All Insights
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Insights;
