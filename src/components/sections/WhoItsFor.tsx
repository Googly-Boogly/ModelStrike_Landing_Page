import { audiences } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function WhoItsFor() {
  return (
    <Section id="who-its-for" labelledBy="who-title">
      <SectionHeader
        id="who-title"
        eyebrow="Who this is for"
        title="Built for teams putting agents in front of real systems."
        intro={
          <p>
            Typically B2B software companies with an AI agent, copilot, or agentic workflow in production — or about
            to be — and buyers who need confidence before rollout.
          </p>
        }
      />
      <ul className="mt-12 grid gap-4 md:grid-cols-2">
        {audiences.map((audience) => (
          <li key={audience.title} className="flex gap-5 rounded-lg border border-line bg-ink-900 p-6 sm:p-7">
            <span aria-hidden="true" className="mt-2 h-px w-6 shrink-0 bg-strike-400" />
            <div>
              <h3 className="text-lg font-semibold text-fg">{audience.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{audience.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
