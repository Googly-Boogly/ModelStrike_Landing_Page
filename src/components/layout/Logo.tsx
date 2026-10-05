import Link from "next/link";

/** Text wordmark: MODEL in foreground, STRIKE in the accent, with a slash mark. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="ModelStrike home" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 shrink-0">
        <rect x="1" y="1" width="22" height="22" rx="5" className="fill-ink-850 stroke-line-strong" strokeWidth="1.5" />
        <path d="M8 17L16 7" className="stroke-strike-400" strokeWidth="2.25" strokeLinecap="round" />
      </svg>
      <span className="text-[0.95rem] font-semibold tracking-[0.14em]">
        <span className="text-fg">MODEL</span>
        <span className="text-strike-400">STRIKE</span>
      </span>
    </Link>
  );
}
