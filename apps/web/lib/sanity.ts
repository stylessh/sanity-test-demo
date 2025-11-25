import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "6xj7qolc",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production", // Set to true for production for better performance
  token: process.env.SANITY_API_TOKEN,
});

export async function fetchHomepage() {
  const query = `*[_type == "homepage"][0]{
    hero {
      title,
      subtitle,
      ctaGroup[] {
        text,
        href,
        type
      }
    }
  }`;

  return await client.fetch(query);
}

export async function fetchPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    body
  }`;

  return await client.fetch(query);
}
