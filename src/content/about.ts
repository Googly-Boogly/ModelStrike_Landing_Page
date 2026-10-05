/**
 * Founder / team details for the About page.
 *
 * Photos: drop a square headshot into `public/team/` named after the
 * member's `slug`, e.g. `public/team/alex-taylor.jpg` (.jpg, .jpeg, .png, or
 * .webp; at least 400×400px). It is picked up automatically at build time;
 * until then an initials avatar is shown.
 *
 * `bio` and `linkedin` are optional and hidden while empty.
 */

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio?: string;
  linkedin?: string;
};

export const team: TeamMember[] = [
  {
    slug: "alex-taylor",
    name: "Alex Taylor",
    role: "Founder",
    // TODO(founder): two or three factual sentences on relevant security and AI experience.
    bio: "",
    linkedin: "",
  },
];
