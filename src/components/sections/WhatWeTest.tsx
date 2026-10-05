import { testAreas } from "@/content/home";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CheckList } from "@/components/ui/CheckList";

export function WhatWeTest() {
  return (
    <Section id="what-we-test" labelledBy="what-we-test-title" className="bg-ink-900/40">
      <SectionHeader
        id="what-we-test-title"
        eyebrow="What we test"
        title="We attack the whole agent, not just the prompt."
        intro={
          <p>
            Prompt injection is only the entry point. Real impact comes from what the agent can reach afterwards, so
            ModelStrike tests every boundary between the user, the model, the agent runtime, and the systems it
            connects to.
          </p>
        }
      />

      <div className="mt-12">
        <ArchitectureDiagram />
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {testAreas.map((area) => (
          <div key={area.group}>
            <h3 className="border-b border-line pb-3 text-sm font-semibold text-fg">{area.group}</h3>
            <CheckList items={area.items} className="mt-4" />
          </div>
        ))}
      </div>
    </Section>
  );
}
