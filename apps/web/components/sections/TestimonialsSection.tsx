import Image from "next/image";
import { urlFor } from "@/lib/sanity";

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: {
    asset: {
      _ref: string;
    };
  };
}

interface TestimonialsSectionProps {
  heading?: string;
  subheading?: string;
  testimonials?: Testimonial[];
}

export function TestimonialsSection({
  heading,
  subheading,
  testimonials,
}: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="bg-zinc-50 px-6 py-24 dark:bg-zinc-900">
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-800"
            >
              <blockquote className="flex-1 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                {testimonial.avatar ? (
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                    <Image
                      src={urlFor(testimonial.avatar).width(96).height(96).url()}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 text-lg font-medium text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
                    {testimonial.author.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-medium text-zinc-900 dark:text-zinc-50">
                    {testimonial.author}
                  </div>
                  {(testimonial.role || testimonial.company) && (
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      {testimonial.role}
                      {testimonial.role && testimonial.company && ", "}
                      {testimonial.company}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
