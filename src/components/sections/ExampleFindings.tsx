import { exampleFindings } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ExampleFindings() {
  return (
    <Section id="example-findings" labelledBy="findings-title">
      <SectionHeader
        id="findings-title"
        eyebrow="Illustrative examples"
        title="Examples of the types of issues an assessment may uncover"
        intro={
          <p>
            These are representative categories of agentic security failures, described generically. They are not
            findings from, or references to, any specific organization.
          </p>
        }
      />

      <div className="mt-12 overflow-hidden rounded-lg border border-line">
        <div className="flex items-center justify-between border-b border-line bg-ink-900 px-5 py-3 font-mono text-[0.68rem] tracking-[0.14em] text-fg-subtle uppercase">
          <span>Example issue types</span>
          <span>Not customer data</span>
        </div>
        <ul className="divide-y divide-line">
          {exampleFindings.map((finding, index) => (
            <li key={finding.description} className="grid gap-2 px-5 py-4 sm:grid-cols-[3rem_11rem_1fr] sm:items-center sm:gap-4">
              <span aria-hidden="true" className="hidden font-mono text-xs text-fg-subtle sm:block">
                EX-{String(index + 1).padStart(2, "0")}
              </span>
              <span className="w-fit rounded border border-line-strong px-2 py-0.5 font-mono text-[0.68rem] tracking-wide text-strike-300">
                {finding.category}
              </span>
              <span className="text-sm text-fg">{finding.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
