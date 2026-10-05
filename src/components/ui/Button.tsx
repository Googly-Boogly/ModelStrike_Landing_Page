import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-strike-600 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] hover:bg-strike-700",
  secondary:
    "border border-line-strong bg-ink-850 text-fg hover:border-fg-subtle hover:bg-ink-800",
  ghost: "text-fg-muted hover:text-fg",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 shrink-0" fill="none">
      <path d="M3 8h9.5M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

/**
 * A link styled as a button. Internal paths use next/link; absolute URLs
 * (e.g. an external booking page) open as a normal anchor in a new tab.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  const content = (
    <>
      {children}
      {arrow && <ArrowIcon />}
    </>
  );

  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {content}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
