import type { Risk } from "@/content/home";

export function RiskCard({ risk, index }: { risk: Risk; index: number }) {
  return (
    <article className="group relative overflow-hidden rounded-lg border border-line bg-ink-900 p-6 transition-colors duration-200 hover:border-line-strong hover:bg-ink-850">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-strike-400 transition-transform duration-300 group-hover:scale-x-100"
      />
      <p aria-hidden="true" className="font-mono text-xs text-fg-subtle">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="mt-3 text-lg font-semibold text-fg">{risk.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{risk.question}</p>
    </article>
  );
}
