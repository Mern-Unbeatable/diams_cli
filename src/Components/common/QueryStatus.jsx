import ErrorState from "@/Components/common/ErrorState";
import EmptyState from "@/Components/common/EmptyState";
import RouteFallback from "@/Components/common/RouteFallback";

/**
 * Thin status switch for non-table query pages.
 * Prefer DataTable's built-in loading/error for list screens.
 */
export function QueryStatus({
  isLoading,
  isError,
  error,
  isEmpty,
  onRetry,
  emptyTitle,
  emptyMessage,
  errorTitle,
  children,
}) {
  if (isLoading) {
    return <RouteFallback />;
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm">
        <ErrorState
          title={errorTitle || "Unable to load data"}
          error={error}
          onRetry={onRetry}
        />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm">
        <EmptyState title={emptyTitle} message={emptyMessage} />
      </div>
    );
  }

  return children;
}

export default QueryStatus;
