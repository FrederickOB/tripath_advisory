import { createClient } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';

const sanityClient = createClient({
  projectId: "78jrqktw",
  dataset: "production",
  apiVersion: "2023-07-25",
  useCdn: true,
});


// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(sanityClient);

// Helper function to generate image URLs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

export default sanityClient;
