export const LineDetailsTab = () => (
  <div className="border-b border-gray-200">
    <div className="flex items-center gap-6">
      <button
        type="button"
        className="relative pb-3 text-sm font-bold text-[#258bf5] transition-colors sm:text-[15px]"
      >
        <span>Line Details</span>
        <span className="absolute -bottom-[1px] left-0 right-0 h-[2.5px] rounded-full bg-[#258bf5]" />
      </button>
    </div>
  </div>
);

export default LineDetailsTab;
