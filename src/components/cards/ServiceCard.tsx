import type { Service } from "@/content/services";
import { CheckList } from "@/components/ui/CheckList";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-ink-900 p-6 transition-colors duration-200 hover:border-line-strong sm:p-7">
      <h3 className="text-xl font-semibold text-fg">{service.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-fg-muted">{service.summary}</p>
      <p className="mt-6 mb-3 font-mono text-[0.7rem] tracking-[0.16em] text-fg-subtle uppercase">Includes</p>
      <CheckList items={service.includes} />
    </article>
  );
}
