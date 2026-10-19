import type { PortableTextBlock } from "sanity";

export function formatDate(value?: string | Date) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Rough reading time for a Portable Text body (≈220 words a minute)
export function readingTime(body?: PortableTextBlock[]) {
  if (!body?.length) return null;
  const words = body
    .flatMap((block) =>
      Array.isArray(block.children)
        ? (block.children as { text?: string }[]).map((child) => child.text ?? "")
        : []
    )
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
