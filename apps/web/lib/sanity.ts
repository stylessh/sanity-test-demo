import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "6xj7qolc",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
});

export interface PageData {
  _id: string;
  title: string;
  slug: { current: string };
  hero: {
    title: string;
    subtitle: string;
    ctaGroup: {
      type: string;
      text: string;
      href: string;
    }[];
  };
}

export async function fetchPageBySlug(slug: string): Promise<PageData | null> {
  const query = `*[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
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

  return await client.fetch(query, { slug });
}

export async function fetchAllPageSlugs(): Promise<
  { slug: { current: string } }[]
> {
  const query = `*[_type == "page"]{
    slug
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
