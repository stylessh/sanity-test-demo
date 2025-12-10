import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";

interface TwoColumnGridSectionProps {
  heading?: string;
  subheading?: string;
  layout?: "imageLeft" | "imageRight";
  image?: {
    asset: {
      _ref: string;
    };
  };
  content?: any[];
  ctaButton?: {
    text?: string;
    href?: string;
  };
}

export function TwoColumnGridSection({
  heading,
  subheading,
  layout = "imageLeft",
  image,
  content,
  ctaButton,
}: TwoColumnGridSectionProps) {
  const isImageLeft = layout === "imageLeft";

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {(heading || subheading) && (
          <div className="mb-16 text-center">
            {heading && (
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                {subheading}
              </p>
            )}
          </div>
        )}
        <div
          className={`grid items-center gap-12 lg:grid-cols-2 ${
            isImageLeft ? "" : "lg:[&>*:first-child]:order-2"
          }`}
        >
          {image && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
              <Image
                src={urlFor(image).width(800).height(600).url()}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex flex-col gap-6">
            {content && (
              <div className="prose prose-zinc dark:prose-invert max-w-none">
                <PortableText value={content} />
              </div>
            )}
            {ctaButton?.text && ctaButton?.href && (
              <div>
                <a
                  href={ctaButton.href}
                  target={
                    ctaButton.href?.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    ctaButton.href?.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  {ctaButton.text}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
