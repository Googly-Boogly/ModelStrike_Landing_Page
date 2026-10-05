import "server-only";

/**
 * Best-effort, in-memory sliding-window rate limit. It protects a single
 * server instance; on serverless platforms each instance has its own memory,
 * so pair it with a shared store (e.g. Upstash Redis) or your platform's
 * firewall rules if the form starts attracting abuse.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_TRACKED_KEYS = 5000;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > MAX_TRACKED_KEYS) {
    const oldest = hits.keys().next().value;
    if (oldest !== undefined) hits.delete(oldest);
  }
  return false;
}
