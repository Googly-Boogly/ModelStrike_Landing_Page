type CheckListProps = {
  items: readonly string[];
  className?: string;
  columns?: 1 | 2;
};

/** A compact bulleted list with an accent tick, used for scopes and inclusions. */
export function CheckList({ items, className = "", columns = 1 }: CheckListProps) {
  return (
    <ul className={`grid gap-x-6 gap-y-2.5 text-sm text-fg-muted ${columns === 2 ? "sm:grid-cols-2" : ""} ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0 text-strike-400" fill="none">
            <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
