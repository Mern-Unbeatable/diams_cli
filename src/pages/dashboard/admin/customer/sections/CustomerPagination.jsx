const CustomerPagination = ({
  currentPage = 1,
  totalPages = 1,
  totalResults = 7,
  startIndex = 1,
  endIndex = 7,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
      {/* Results Count Text */}
      <span className="text-xs font-medium text-[#f97316] sm:text-sm">
        Showing {startIndex} to {endIndex} of {totalResults} results
      </span>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={currentPage <= 1}
          className="rounded-xl border border-orange-400/60 bg-white px-4 py-1.5 text-xs font-medium text-[#f97316] shadow-sm transition-all hover:bg-orange-50/50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={currentPage >= totalPages}
          className="rounded-xl border border-orange-400/60 bg-white px-4 py-1.5 text-xs font-medium text-[#f97316] shadow-sm transition-all hover:bg-orange-50/50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomerPagination;
