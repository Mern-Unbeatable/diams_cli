/**
 * Why this file exists:
 * Backward-compatible re-export so any remaining `@/router/routes` imports
 * keep working after the modular `src/routes/` split.
 */

export { router, ROUTES, absolute, default } from "@/routes";
