import { disciplines } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function WhyModelStrike() {
  return (
    <Section id="why-modelstrike" labelledBy="why-title" className="bg-ink-900/40">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <SectionHeader
          id="why-title"
          eyebrow="Why ModelStrike"
          title="AI security requires thinking like both an attacker and an AI engineer."
          intro={
            <>
              <p>
                Conventional penetration tests often stop at the API. Generic AI evaluations often stop at the model.
                The most serious agent failures sit between the two — where model behavior meets real permissions.
              </p>
              <p>
                ModelStrike focuses on that intersection. We are building toward turning repeatable testing techniques
                into automated AI-security tooling, but today every engagement is led by hands-on experts.
              </p>
            </>
          }
        />
        <ul className="grid gap-4 sm:grid-cols-2">
          {disciplines.map((discipline) => (
            <li key={discipline.title} className="rounded-lg border border-line bg-ink-900 p-6">
              <h3 className="text-base font-semibold text-fg">{discipline.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{discipline.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
