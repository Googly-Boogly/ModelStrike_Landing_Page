import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Adds a top hairline to separate adjacent sections. */
  divided?: boolean;
  labelledBy?: string;
};

export function Section({ id, children, className = "", divided = true, labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`py-20 sm:py-28 ${divided ? "border-t border-line" : ""} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
