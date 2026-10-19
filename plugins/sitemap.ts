import { writeFile } from "node:fs/promises";
import path from "node:path";
import type { Plugin } from "vite";

const SITE_URL = "https://tripathadvisory.org";
const STATIC_ROUTES = ["/", "/about", "/services", "/insights", "/contact", "/privacy", "/terms"];
const SANITY_QUERY_URL = "https://78jrqktw.apicdn.sanity.io/v2023-07-25/data/query/production";

async function fetchInsightRoutes() {
  const query = '*[_type == "insight" && defined(slug.current)]{ "slug": slug.current, _updatedAt }';
  const response = await fetch(`${SANITY_QUERY_URL}?query=${encodeURIComponent(query)}`, {
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Sanity responded ${response.status}`);
  const { result } = (await response.json()) as {
    result: { slug: string; _updatedAt?: string }[];
  };
  return result.map((insight) => ({
    path: `/insights/${insight.slug}`,
    lastmod: insight._updatedAt?.slice(0, 10),
  }));
}

// Writes sitemap.xml into the build output, including every published insight
export default function sitemap(): Plugin {
  let outDir = "dist";
  return {
    name: "tripath-sitemap",
    apply: "build",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      let insights: { path: string; lastmod?: string }[] = [];
      try {
        insights = await fetchInsightRoutes();
      } catch (error) {
        console.warn("[sitemap] Couldn't load insights from Sanity; listing static pages only.", error);
      }
      const urls = [...STATIC_ROUTES.map((route) => ({ path: route, lastmod: undefined })), ...insights]
        .map(({ path: route, lastmod }) =>
          [
            "  <url>",
            `    <loc>${SITE_URL}${route === "/" ? "" : route}</loc>`,
            lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
            "  </url>",
          ]
            .filter(Boolean)
            .join("\n")
        )
        .join("\n");
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
      await writeFile(path.join(outDir, "sitemap.xml"), xml);
      console.log(`[sitemap] wrote ${STATIC_ROUTES.length + insights.length} URLs`);
    },
  };
}
