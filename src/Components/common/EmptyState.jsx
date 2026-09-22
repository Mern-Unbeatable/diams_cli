import { Inbox } from "lucide-react";

/**
 * Explicit empty-data panel (distinct from loading / error).
 */
export function EmptyState({
  title = "Nothing here yet",
  message = "No records match your current filters.",
  action = null,
  className = "",
  compact = false,
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${
        compact ? "gap-2 py-8" : "gap-3 py-14"
      } ${className}`}
      role="status"
    >
      <div
        className={`flex items-center justify-center rounded-full bg-slate-100 text-slate-400 ${
          compact ? "h-10 w-10" : "h-12 w-12"
        }`}
      >
        <Inbox size={compact ? 20 : 24} strokeWidth={1.75} />
      </div>
      <div className="max-w-md space-y-1">
        <h3 className={`font-semibold text-slate-800 ${compact ? "text-sm" : "text-base"}`}>
          {title}
        </h3>
        <p className={`text-slate-500 ${compact ? "text-xs" : "text-sm"}`}>{message}</p>
      </div>
      {action}
    </div>
  );
}

export default EmptyState;
