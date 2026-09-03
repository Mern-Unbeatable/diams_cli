const StepSimSelection = ({
  formData,
  onChange,
  onSubmit,
  onPrev,
  isSubmitting,
}) => {
  const selectedSimType = formData.simType || "eSIM";

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-base font-bold tracking-tight text-slate-900">
        Step 4: SIM / eSIM Selection
      </h2>

      {/* 2 Radio Selection Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Card 1: eSIM */}
        <div
          onClick={() => onChange("simType", "eSIM")}
          className={`flex items-start gap-3.5 rounded-xl border p-5 transition-all cursor-pointer ${
            selectedSimType === "eSIM"
              ? "border-sky-500 bg-sky-50/20 ring-1 ring-sky-500/30 shadow-xs"
              : "border-slate-200 bg-white hover:border-slate-300"
          }`}
        >
          {/* Radio Indicator */}
          <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white">
            {selectedSimType === "eSIM" && (
              <div className="h-2 w-2 rounded-full bg-[#0080ff]" />
            )}
          </div>

          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              eSIM
            </h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Instant digital delivery. No physical card required. Activate
              immediately after order.
            </p>
          </div>
        </div>

        {/* Card 2: Physical SIM */}
        <div
          onClick={() => onChange("simType", "Physical SIM")}
          className={`flex items-start gap-3.5 rounded-xl border p-5 transition-all cursor-pointer ${
            selectedSimType === "Physical SIM"
              ? "border-sky-500 bg-sky-50/20 ring-1 ring-sky-500/30 shadow-xs"
              : "border-slate-200 bg-white hover:border-slate-300"
          }`}
        >
          {/* Radio Indicator */}
          <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white">
            {selectedSimType === "Physical SIM" && (
              <div className="h-2 w-2 rounded-full bg-[#0080ff]" />
            )}
          </div>

          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              Physical SIM
            </h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Physical SIM card delivered to your customer's shipping address
              within 2-3 business days.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95 cursor-pointer"
        >
          &lt; Back
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#0080ff] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-600 active:scale-95 cursor-pointer disabled:opacity-50"
        >
          <span>Submit Customer</span>
          <span>&gt;</span>
        </button>
      </div>
    </form>
  );
};

export default StepSimSelection;
