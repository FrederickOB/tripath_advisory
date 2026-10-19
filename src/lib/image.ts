// Resize Sanity CDN images and let it pick WebP/AVIF — the raw uploads are
// multi-megabyte PNGs. Non-Sanity URLs pass through untouched.
export function sanityImage(url: string | undefined, width: number) {
  if (!url) return undefined;
  if (!url.startsWith("https://cdn.sanity.io/")) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}w=${width}&auto=format&q=80&fit=max`;
}
