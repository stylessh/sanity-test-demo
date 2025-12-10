import Image from "next/image";
import { urlFor } from "@/lib/sanity";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  image?: {
    asset: {
      _ref: string;
    };
  };
  ctaButtons?: {
    text: string;
    href: string;
    variant?: "primary" | "secondary";
  }[];
}

export function HeroSection({
  title,
  subtitle,
  image,
  ctaButtons,
}: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center bg-zinc-50 px-6 py-24 dark:bg-zinc-900">
      {image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(image).width(1920).height(1080).url()}
            alt=""
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400 sm:text-xl">
            {subtitle}
          </p>
        )}
        {ctaButtons && ctaButtons.length > 0 && (
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {ctaButtons.map((button, index) => (
              <a
                key={index}
                href={button.href}
                target={button.href?.startsWith("http") ? "_blank" : undefined}
                rel={
                  button.href?.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className={
                  button.variant === "secondary"
                    ? "flex h-12 items-center justify-center rounded-full border border-zinc-300 px-8 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-800"
                    : "flex h-12 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                }
              >
                {button.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
