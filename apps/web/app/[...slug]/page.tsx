import { notFound } from "next/navigation";
import { fetchPageBySlug, fetchAllPageSlugs } from "@/lib/sanity";
import { SectionRenderer } from "@/components/sections";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const pages = await fetchAllPageSlugs();

  return pages
    .filter((page) => page.slug?.current && page.slug.current !== "/")
    .map((page) => ({
      slug: page.slug.current.split("/").filter(Boolean),
    }));
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const page = await fetchPageBySlug(slugPath);

  if (!page) {
    notFound();
  }

  return (
    <main>
      <SectionRenderer sections={page.sections || []} />
    </main>
  );
}
