import { REPORTS_KPIS } from "./reportsData";

const ReportsKpiCards = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
      {REPORTS_KPIS.map((kpi, idx) => (
        <div
          key={idx}
          className="flex flex-col justify-between rounded-xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-500">
              {kpi.title}
            </span>
            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${kpi.badgeColor}`}
            >
              {kpi.badge}
            </span>
          </div>

          <div className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            {kpi.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportsKpiCards;
