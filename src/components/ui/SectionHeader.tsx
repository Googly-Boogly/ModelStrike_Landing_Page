import type { ReactNode } from "react";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-2 font-mono text-xs font-medium tracking-[0.18em] text-strike-400 uppercase ${className}`}>
      <span aria-hidden="true" className="h-px w-5 bg-strike-400" />
      {children}
    </p>
  );
}

type SectionHeaderProps = {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  /** Heading level; defaults to h2 for sections within a page. */
  as?: "h1" | "h2";
};

export function SectionHeader({ id, eyebrow, title, intro, align = "left", as: Heading = "h2" }: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <header className={`max-w-3xl ${centered ? "mx-auto text-center [&>p:first-child]:justify-center" : ""}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading
        id={id}
        className={`mt-4 text-3xl font-semibold tracking-tight text-balance text-fg sm:text-4xl ${Heading === "h1" ? "lg:text-5xl" : ""}`}
      >
        {title}
      </Heading>
      {intro && <div className="mt-5 space-y-4 text-base leading-relaxed text-pretty text-fg-muted sm:text-lg">{intro}</div>}
    </header>
  );
}
