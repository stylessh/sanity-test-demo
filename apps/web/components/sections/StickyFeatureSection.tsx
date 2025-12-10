import Image from "next/image";
import { urlFor } from "@/lib/sanity";

interface Feature {
  title: string;
  description?: string;
  image?: {
    asset: {
      _ref: string;
    };
  };
}

interface StickyFeatureSectionProps {
  heading?: string;
  subheading?: string;
  features?: Feature[];
}

export function StickyFeatureSection({
  heading,
  subheading,
  features,
}: StickyFeatureSectionProps) {
  if (!features || features.length === 0) return null;

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
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="lg:sticky lg:top-24 lg:self-start">
            {features[0]?.image && (
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={urlFor(features[0].image).width(600).height(600).url()}
                  alt={features[0].title || ""}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-16">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col gap-4">
                <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                  {feature.title}
                </h3>
                {feature.description && (
                  <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>
                )}
                {feature.image && index > 0 && (
                  <div className="relative mt-4 aspect-video overflow-hidden rounded-xl bg-zinc-100 lg:hidden dark:bg-zinc-800">
                    <Image
                      src={urlFor(feature.image).width(600).height(400).url()}
                      alt={feature.title || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
