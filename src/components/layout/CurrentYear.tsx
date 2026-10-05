"use client";

/**
 * Renders the visitor's current year. Pages are statically prerendered, so a
 * server-only `new Date()` would freeze the build year; rendering on the
 * client keeps the copyright current between deploys.
 */
export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
