import type { Metadata } from "next";
import { site } from "@/content/site";
import { Hero } from "@/components/sections/Hero";
import { AttackSurface } from "@/components/sections/AttackSurface";
import { WhatWeTest } from "@/components/sections/WhatWeTest";
import { Services } from "@/components/sections/Services";
import { Methodology } from "@/components/sections/Methodology";
import { ExampleFindings } from "@/components/sections/ExampleFindings";
import { WhyModelStrike } from "@/components/sections/WhyModelStrike";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { Philosophy } from "@/components/sections/Philosophy";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: { absolute: site.title },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AttackSurface />
      <WhatWeTest />
      <Services />
      <Methodology />
      <ExampleFindings />
      <WhyModelStrike />
      <WhoItsFor />
      <Philosophy />
      <CTASection />
    </>
  );
}
