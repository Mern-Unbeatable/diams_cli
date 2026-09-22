/**
 * Why this file exists:
 * Shared Suspense fallback for lazy-loaded route elements so every
 * code-split page shows a consistent loading state.
 */

const RouteFallback = () => (
  <div
    className="flex min-h-[40vh] w-full items-center justify-center gap-2 py-16 text-sm text-slate-500"
    role="status"
    aria-live="polite"
  >
    <span className="h-2 w-2 animate-ping rounded-full bg-sky-500" />
    <span>Loading…</span>
  </div>
);

export default RouteFallback;
