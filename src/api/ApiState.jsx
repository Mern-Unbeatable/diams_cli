/**
 * Shared loading / error UI for API-driven screens.
 * Use with getQueryState() / getMutationState().
 */

export const ApiLoading = ({ label = "Loading..." }) => (
  <div className="flex min-h-[160px] w-full items-center justify-center gap-2 rounded-xl border border-slate-100 bg-white py-10 text-sm text-slate-500">
    <span className="h-2 w-2 animate-ping rounded-full bg-sky-500" />
    <span>{label}</span>
  </div>
);

export const ApiError = ({
  message = "Something went wrong.",
  onRetry,
  retryLabel = "Try again",
}) => (
  <div className="flex min-h-[160px] w-full flex-col items-center justify-center gap-3 rounded-xl border border-rose-100 bg-rose-50/60 px-4 py-10 text-center">
    <p className="text-sm font-medium text-rose-700">{message}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-rose-700"
      >
        {retryLabel}
      </button>
    )}
  </div>
);

export const ApiEmpty = ({ message = "No data found." }) => (
  <div className="flex min-h-[120px] w-full items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 py-8 text-sm text-slate-500">
    {message}
  </div>
);

/**
 * One-liner wrapper for query screens.
 *
 * @example
 *   <ApiStateGate state={getQueryState(query)} onRetry={query.refetch}>
 *     {(data) => <CustomerTable data={data} />}
 *   </ApiStateGate>
 */
export const ApiStateGate = ({
  state,
  onRetry,
  loadingLabel,
  emptyMessage,
  isEmpty,
  children,
}) => {
  if (state?.isLoading) {
    return <ApiLoading label={loadingLabel} />;
  }

  if (state?.isError) {
    return <ApiError message={state.errorMessage} onRetry={onRetry} />;
  }

  const data = state?.data;
  const empty =
    typeof isEmpty === "function"
      ? isEmpty(data)
      : data == null ||
        (Array.isArray(data) && data.length === 0) ||
        (Array.isArray(data?.items) && data.items.length === 0);

  if (empty) {
    return <ApiEmpty message={emptyMessage} />;
  }

  return typeof children === "function" ? children(data) : children;
};

export default {
  ApiLoading,
  ApiError,
  ApiEmpty,
  ApiStateGate,
};
