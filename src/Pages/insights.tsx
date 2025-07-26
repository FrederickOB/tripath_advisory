import { useState } from "react";
import { motion } from "framer-motion";
import { useInsights, useCategories } from "@/hooks/useSanityData";
import { Search, Calendar, User } from "lucide-react";
import { Link } from "react-router";
import { animations } from "@/lib/animation";

export default function InsightsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const {
    data,
    loading,
    error,
    search,
    filterByCategory,
    nextPage,
    prevPage,
    currentPage,
    totalPages,
  } = useInsights({
    limit: 9,
    filters: {
      category: selectedCategory !== "All" ? selectedCategory : "",
    },
  });

  const { data: categoriesData } = useCategories();

  const handleSearch = () => {
    search(searchTerm);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterByCategory(category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm via-white to-warm">
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-gradient-to-br from-primary to-primary/90 flex items-center justify-center">
        <div className="absolute inset-0 bg-dark/30" />
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
            for creating positive change.
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-emerald-500"
                >
                  <Search className="w-5 h-5" />
                </button>
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                <option value="All">All Categories</option>
                {categoriesData?.map((category) => (
                  <option key={category._id} value={category.title}>
                    {category.title} ({category.count})
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
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              Error loading insights. Please try again later.
            </div>
          ) : (
            <>
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {data?.insights.map((insight) => (
                  <motion.div
                    key={insight._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <Link to={`/insights/${insight.slug.current}`}>
                      <div className="relative aspect-video">
                        <img
                          src={insight.mainImage?.url}
                          alt={insight.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          {insight.categories?.map((category) => (
                            <span
                              key={category.title}
                              className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700"
                            >
                              {category.title}
                            </span>
                          ))}
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2">
                          {insight.title}
                        </h2>
                        <p className="text-slate-600 mb-4 line-clamp-3">
                          {insight.summary}
                        </p>
                        <div className="flex items-center justify-between text-sm text-slate-500">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{insight.author?.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(
                                insight.publishedAt as string
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {data?.insights.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-600">
                    No insights found matching your search criteria.
                  </p>
                </div>
              )}

              {/* Pagination */}
              {data?.insights && data?.insights.length > 0 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-slate-200 text-slate-400" : "bg-emerald-600 text-white hover:bg-emerald-700"}`}
                  >
                    Previous
                  </button>
                  <span className="text-slate-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-slate-200 text-slate-400" : "bg-emerald-600 text-white hover:bg-emerald-700"}`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
