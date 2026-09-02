const EsimKpiCards = ({ activeCount = 8, pendingCount = 4 }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {/* Active eSIMS */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <span className="text-xs font-semibold text-slate-500">
          Active eSIMS
        </span>
        <div className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {activeCount}
        </div>
      </div>

      {/* Pending Activation */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <span className="text-xs font-semibold text-slate-500">
          Pending Activation
        </span>
        <div className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {pendingCount}
        </div>
      </div>
    </div>
  );
};

export default EsimKpiCards;
