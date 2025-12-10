import { HeroSection } from "./HeroSection";
import { TwoColumnGridSection } from "./TwoColumnGridSection";
import { StickyFeatureSection } from "./StickyFeatureSection";
import { TestimonialsSection } from "./TestimonialsSection";

type Section = {
  _type: string;
  _key: string;
  [key: string]: any;
};

interface SectionRendererProps {
  sections: Section[];
}

const sectionComponents: Record<string, React.ComponentType<any>> = {
  heroSection: HeroSection,
  twoColumnGridSection: TwoColumnGridSection,
  stickyFeatureSection: StickyFeatureSection,
  testimonialsSection: TestimonialsSection,
};

export function SectionRenderer({ sections }: SectionRendererProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((section) => {
        const Component = sectionComponents[section._type];

        if (!Component) {
          console.warn(`Unknown section type: ${section._type}`);
          return null;
        }

        return <Component key={section._key} {...section} />;
      })}
    </>
  );
}
