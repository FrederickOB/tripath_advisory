import { useEffect } from "react";
import { siteUrl } from "@/constants";

const SITE_NAME = "TriPath Advisory";
const DEFAULT_TITLE = "TriPath Advisory | Strategy • Sustainability • Impact";
const DEFAULT_DESCRIPTION =
  "TriPath Advisory is a Ghana-based consultancy helping organisations align strategy with sustainability, inclusion and impact across Africa.";
const DEFAULT_IMAGE = `${siteUrl}/og-image.png`;

interface PageMeta {
  /** Page name; the site name is appended. Omit on the home page. */
  title?: string;
  description?: string;
  /** Absolute image URL for link previews */
  image?: string;
  /** Path for the canonical URL, e.g. "/services" */
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
}

function setTag(attr: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

// Keeps the document title, description, canonical link and share tags in
// step with the current route. index.html carries the same defaults for
// crawlers that don't run JavaScript.
export function usePageMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  path,
  type = "website",
  noindex = false,
}: PageMeta) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
    const url = `${siteUrl}${path === "/" ? "" : path}`;

    document.title = fullTitle;
    setTag("name", "description", description);
    setTag("property", "og:title", fullTitle);
    setTag("property", "og:description", description);
    setTag("property", "og:url", url);
    setTag("property", "og:image", image);
    setTag("property", "og:type", type);
    setTag("name", "twitter:title", fullTitle);
    setTag("name", "twitter:description", description);
    setTag("name", "twitter:image", image);
    setTag("name", "robots", noindex ? "noindex" : "index, follow");

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, image, path, type, noindex]);
}
