import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { insights } from "@/constants";
import { ArrowLeft, Calendar, User } from "lucide-react";

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

export default function InsightPage() {
  const { id } = useParams();
  const insight = insights.find((i) => i.id === id);

  if (!insight) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">
            Insight Not Found
          </h1>
          <p className="text-slate-600 mb-8">
            The insight you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-50/50 via-transparent to-transparent" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </Link>

            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700">
                  {insight.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                {insight.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-slate-600 mb-8">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{insight.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{insight.date}</span>
                </div>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-12">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="prose prose-lg prose-emerald max-w-none"
              dangerouslySetInnerHTML={{ __html: insight.content }}
            />

            <motion.div
              variants={itemVariants}
              className="mt-12 pt-8 border-t border-slate-200"
            >
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {insight.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
