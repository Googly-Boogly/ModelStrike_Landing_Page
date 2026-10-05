import Image from "next/image";
import type { TeamMember } from "@/content/about";
import { findTeamPhoto } from "@/lib/team-photo";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TeamCard({ member }: { member: TeamMember }) {
  const photo = findTeamPhoto(member.slug);

  return (
    <article className="flex flex-col gap-6 rounded-lg border border-line bg-ink-900 p-6 sm:flex-row sm:items-start sm:p-7">
      {photo ? (
        <Image
          src={photo}
          alt={`Portrait of ${member.name}`}
          width={112}
          height={112}
          className="size-28 shrink-0 rounded-lg border border-line-strong object-cover grayscale-[15%]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex size-28 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-ink-850 font-mono text-2xl tracking-widest text-fg-muted"
        >
          {initials(member.name)}
        </div>
      )}
      <div>
        <h3 className="text-xl font-semibold text-fg">{member.name}</h3>
        <p className="mt-1 font-mono text-xs tracking-wide text-strike-400">{member.role}</p>
        {member.bio && <p className="mt-4 text-sm leading-relaxed text-fg-muted">{member.bio}</p>}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-fg underline underline-offset-4 hover:text-strike-300"
          >
            LinkedIn<span className="sr-only"> profile for {member.name} (opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}
