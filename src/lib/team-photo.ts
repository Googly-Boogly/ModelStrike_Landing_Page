import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";

const EXTENSIONS = ["jpg", "jpeg", "png", "webp"] as const;

/**
 * Returns the public URL of a team member's photo in `public/team/`, or null
 * if none has been added. Runs at build time (the About page is static).
 */
export function findTeamPhoto(slug: string): string | null {
  for (const ext of EXTENSIONS) {
    const file = `${slug}.${ext}`;
    if (existsSync(join(process.cwd(), "public", "team", file))) return `/team/${file}`;
  }
  return null;
}
