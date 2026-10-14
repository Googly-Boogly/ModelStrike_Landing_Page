import { caseStudy } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Collapsed by default via native <details>, so it needs no client JS. Links to
 * `#case-study-details` target an element inside the details, which makes
 * browsers open it automatically on fragment navigation.
 */
export function CaseStudy() {
  return (
    <Section id="case-study" labelledBy="case-study-title">
      <SectionHeader id="case-study-title" eyebrow="Case study" title={caseStudy.title} />

      <article className="mt-12 overflow-hidden rounded-lg border border-line">
        <dl className="flex flex-col gap-3 border-b border-line bg-ink-900 px-5 py-4 sm:flex-row sm:flex-wrap sm:gap-x-8">
          {caseStudy.meta.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <dt className="font-mono text-[0.68rem] tracking-[0.14em] text-fg-subtle uppercase">{item.label}</dt>
              <dd className="w-fit rounded border border-line-strong px-2 py-0.5 font-mono text-[0.68rem] tracking-wide text-strike-300">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <details className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-strike-400 hover:bg-ink-900 focus-visible:-outline-offset-2 [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Show the full write-up</span>
            <span className="hidden group-open:inline">Hide the full write-up</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="size-4 shrink-0 group-open:rotate-180 motion-safe:transition-transform"
              fill="none"
            >
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>

          <div id="case-study-details" className="divide-y divide-line border-t border-line">
            {caseStudy.sections.map((section) => (
              <div key={section.heading} className="grid gap-2 px-5 py-6 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <h3 className="text-sm font-semibold text-fg">{section.heading}</h3>
                <p className="max-w-3xl text-sm leading-relaxed text-pretty text-fg-muted sm:text-base">{section.body}</p>
              </div>
            ))}
          </div>
        </details>
      </article>

      <p className="mt-6 max-w-3xl text-sm text-fg-subtle">{caseStudy.disclaimer}</p>
    </Section>
  );
}
