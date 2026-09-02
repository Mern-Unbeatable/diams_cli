const PlansHeader = ({ onCreatePlan }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
          Plans Management
        </h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Create, edit, activate and deactivate mobile plans with pricing, data, roaming and features.
        </p>
      </div>

      <button
        type="button"
        onClick={onCreatePlan}
        className="rounded-xl bg-[#38bdf8] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-sky-500 active:scale-95 sm:text-sm"
      >
        Create Plan
      </button>
    </div>
  );
};

export default PlansHeader;
