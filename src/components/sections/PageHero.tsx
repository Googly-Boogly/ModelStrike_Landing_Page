import type { ReactNode } from "react";
import { Container } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
};

/** Opening block for inner pages: owns the page's single h1. */
export function PageHero({ eyebrow, title, intro, children }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden border-b border-line">
      <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]" />
      <Container className="relative pt-16 pb-14 sm:pt-24 sm:pb-20">
        <div className="motion-safe:animate-rise">
          <SectionHeader id="page-title" as="h1" eyebrow={eyebrow} title={title} intro={intro} />
          {children}
        </div>
      </Container>
    </section>
  );
}
