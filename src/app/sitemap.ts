import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const routes: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/contact", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/security", priority: 0.3 },
  { path: "/privacy", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({ url: `${site.url}${path}`, priority }));
}
