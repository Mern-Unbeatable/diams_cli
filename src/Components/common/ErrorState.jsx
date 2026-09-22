import { AlertCircle, RefreshCw } from "lucide-react";
import { getErrorMessage, normalizeApiError } from "@/lib/api/errors";

/**
 * Shared actionable error panel for queries / boundaries / resource 404s.
 */
export function ErrorState({
  title = "Unable to load",
  message,
  error,
  onRetry,
  retryLabel = "Try again",
  className = "",
  compact = false,
}) {
  const info = error ? normalizeApiError(error) : null;
  const body = message || (error ? getErrorMessage(error) : "Something went wrong.");
  const showRetry =
    typeof onRetry === "function" && (info ? info.retryable || info.status === 404 : true);

  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${
        compact ? "gap-2 py-8" : "gap-3 py-14"
      } ${className}`}
      role="alert"
    >
      <div
        className={`flex items-center justify-center rounded-full bg-rose-50 text-rose-600 ${
          compact ? "h-10 w-10" : "h-12 w-12"
        }`}
      >
        <AlertCircle size={compact ? 20 : 24} strokeWidth={1.75} />
      </div>
      <div className="max-w-md space-y-1">
        <h3 className={`font-semibold text-slate-900 ${compact ? "text-sm" : "text-base"}`}>
          {title}
        </h3>
        <p className={`text-slate-500 ${compact ? "text-xs" : "text-sm"}`}>{body}</p>
      </div>
      {showRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 inline-flex items-center gap-2 rounded-lg bg-sky-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-sky-700"
        >
          <RefreshCw size={14} />
          {retryLabel}
        </button>
      ) : null}
    </div>
  );
}

export default ErrorState;
