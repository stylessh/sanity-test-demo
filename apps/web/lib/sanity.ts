import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const isDevelopment = process.env.NODE_ENV === "development";

export const client = createClient({
  projectId: "6xj7qolc",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: !isDevelopment,
  perspective: isDevelopment ? "previewDrafts" : "published",
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export interface Section {
  _type: string;
  _key: string;
  [key: string]: any;
}

export interface PageData {
  _id: string;
  title: string;
  slug: { current: string };
  sections: Section[];
}

export async function fetchPageBySlug(slug: string): Promise<PageData | null> {
  const query = `*[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    sections[] {
      _type,
      _key,
      ...,
      image {
        asset
      },
      features[] {
        ...,
        image {
          asset
        }
      },
      testimonials[] {
        ...,
        avatar {
          asset
        }
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
