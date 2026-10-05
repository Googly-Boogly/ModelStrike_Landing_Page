import { principles } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Philosophy() {
  return (
    <Section id="philosophy" labelledBy="philosophy-title" className="bg-ink-900/40">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <SectionHeader
          id="philosophy-title"
          eyebrow="Security philosophy"
          title="Least privilege for machines that can think in actions."
          intro={
            <p>
              No architecture is perfectly secure, and no model is perfectly obedient. Good agent security assumes
              the model can be wrong or manipulated, and limits what that can cost you.
            </p>
          }
        />
        <ol className="divide-y divide-line border-y border-line">
          {principles.map((principle, index) => (
            <li key={principle.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-5">
              <span aria-hidden="true" className="pt-0.5 font-mono text-xs text-strike-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-base font-semibold text-fg">{principle.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-fg-muted">{principle.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
