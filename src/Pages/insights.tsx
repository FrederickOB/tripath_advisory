import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { insights, insightCategories } from "@/constants";
import { Search, Calendar, User } from "lucide-react";
import { Link } from "react-router";
import { animations } from "@/lib/animation";

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

export default function InsightsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredInsights, setFilteredInsights] = useState(insights);

  useEffect(() => {
    const filtered = insights.filter((insight) => {
      const matchesSearch =
        insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        insight.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        insight.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All" || insight.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredInsights(filtered);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}

      <section className="relative h-[40vh] bg-gradient-to-br from-teal-900 to-teal-800 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6"
            variants={animations.fadeIn}
            initial="initial"
            animate="animate"
          >
            Insights & Analysis
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl mx-auto"
            variants={animations.fadeIn}
            initial="initial"
            animate="animate"
          >
            Explore our latest insights on ESG, sustainable development, and
            social impact. Discover thought leadership and practical guidance
            for creating positive change.{" "}
          </motion.p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                {insightCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Insights Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredInsights.map((insight) => (
              <motion.div
                key={insight.id}
                variants={itemVariants}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Link to={`/insights/${insight.id}`}>
                  <div className="relative aspect-video">
                    <img
                      src={insight.image}
                      alt={insight.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700">
                        {insight.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2">
                      {insight.title}
                    </h2>
                    <p className="text-slate-600 mb-4 line-clamp-3">
                      {insight.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {insight.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{insight.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{insight.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {filteredInsights.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600">
                No insights found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
