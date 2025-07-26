import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { useInsightBySlug } from "@/hooks/useSanityData";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { PortableText } from "@portabletext/react";

export default function InsightPage() {
  const { slug } = useParams();
  const { data, loading, error } = useInsightBySlug(slug || "");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error || !data) {
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

  const { insight, relatedInsights } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-50/50 via-transparent to-transparent" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                {insight.categories?.map((category) => (
                  <span
                    key={category._id}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                {insight.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-slate-600 mb-8">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{insight.author?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {new Date(
                      insight.publishedAt as string
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-12">
                <img
                  src={insight.mainImage?.url}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg prose-emerald max-w-none"
            >
              {insight.body && <PortableText value={insight.body} />}
            </motion.div>

            {/* Related Insights */}
            {relatedInsights && relatedInsights.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-16 pt-8 border-t border-slate-200"
              >
                <h3 className="text-2xl font-bold text-slate-800 mb-8">
                  Related Insights
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {relatedInsights.map((relatedInsight) => (
                    <div
                      key={relatedInsight._id}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <Link to={`/insights/${relatedInsight.slug.current}`}>
                        <div className="relative aspect-video">
                          <img
                            src={relatedInsight.mainImage?.url}
                            alt={relatedInsight.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-2">
                            {relatedInsight.title}
                          </h4>
                          <p className="text-sm text-slate-600 line-clamp-2">
                            {relatedInsight.summary}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
