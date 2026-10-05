import { methodology } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Methodology() {
  return (
    <Section id="methodology" labelledBy="methodology-title" className="bg-ink-900/40">
      <SectionHeader
        id="methodology-title"
        eyebrow="Methodology"
        title="How an assessment works"
        intro={
          <p>
            A structured process built to produce reproducible findings, not a pile of theoretical concerns. Testing
            scope, environments, and authorization are agreed in writing before any testing begins.
          </p>
        }
      />

      <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
        <span aria-hidden="true" className="absolute top-4 right-0 left-0 hidden h-px bg-line-strong md:block" />
        {methodology.map((step) => (
          <li key={step.number} className="relative border-l border-line-strong pl-6 md:border-l-0 md:pl-0">
            <span
              aria-hidden="true"
              className="absolute top-2 -left-[5px] size-2.5 rotate-45 border border-strike-400 bg-ink-950 md:top-[11px] md:left-0"
            />
            <p className="font-mono text-xs text-strike-400 md:pt-10">{step.number}</p>
            <h3 className="mt-2 text-xl font-semibold text-fg">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
