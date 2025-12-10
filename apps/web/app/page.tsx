import { notFound } from "next/navigation";
import { fetchPageBySlug } from "@/lib/sanity";
import { SectionRenderer } from "@/components/sections";

export default async function Home() {
  const page = await fetchPageBySlug("/");

  if (!page) {
    notFound();
  }

  return (
    <main>
      <SectionRenderer sections={page.sections || []} />
    </main>
  );
}
