import { insights } from "../constants";
import Heading from "./Heading";

const Insights = () => (
  <section className="py-20 bg-slate-50">
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
          badgeColor="blue"
          underlineColor="#3b82f6"
          className="my-8"
          align="left"
        />
        <div className="md:max-w-lg text-slate-600 text-lg">
          From planning to progress tracking, Dash gives CEOs, founders, and
          teams the tools they need to manage tasks, lead projects, and hit
          goals.
        </div>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all "
          >
            {/* Placeholder image at the top of each card */}
            <div className="w-full h-56 bg-slate-100 flex items-center justify-center">
              <svg
                className="w-20 h-20 text-slate-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M3 17l5-5a2 2 0 0 1 2.8 0l5.2 5.2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="pt-6">
              <div className="text-sm text-slate-500 mb-2">
                {insight.date} • By {insight.author}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 hover:text-teal-700 transition-colors">
                <a href="#">{insight.title}</a>
              </h3>
              <p className="text-slate-600 mb-4">{insight.excerpt}</p>
              <a
                href="#"
                className="text-amber-600 font-medium hover:text-amber-700 transition-colors inline-flex items-center"
              >
                Read More
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href="#"
          className="inline-block px-6 py-3 border-2 border-teal-700 text-teal-700 rounded-full font-medium hover:bg-teal-700 hover:text-white transition-all"
        >
          View All Insights
        </a>
      </div>
    </div>
  </section>
);

export default Insights;
