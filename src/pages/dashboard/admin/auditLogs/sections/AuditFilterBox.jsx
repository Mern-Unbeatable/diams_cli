import { Calendar } from "lucide-react";
import {
  AUDIT_ADMIN_FILTERS,
  AUDIT_MODULE_FILTERS,
  AUDIT_ACTION_FILTERS,
} from "./auditData";

const AuditFilterBox = ({
  selectedAdmin,
  onSelectAdmin,
  selectedModule,
  onSelectModule,
  selectedAction,
  onSelectAction,
  dateRange,
  onDateChange,
  onRefresh,
}) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-5">
      {/* Top Row: Title, Subtitle, Refresh button */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 sm:text-lg">
            Administrator Activity
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Search logs, filter by admin, module, action and date range, then open complete activity details.
          </p>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="rounded-xl border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95"
        >
          Refresh
        </button>
      </div>

      {/* 4-column Filter Form */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* 1. Admin */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            ADMIN
          </label>
          <select
            value={selectedAdmin}
            onChange={(e) => onSelectAdmin(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-800 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm cursor-pointer"
          >
            {AUDIT_ADMIN_FILTERS.map((adm) => (
              <option key={adm} value={adm}>
                {adm}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Module */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            MODULE
          </label>
          <select
            value={selectedModule}
            onChange={(e) => onSelectModule(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-800 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm cursor-pointer"
          >
            {AUDIT_MODULE_FILTERS.map((mod) => (
              <option key={mod} value={mod}>
                {mod}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Action */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            ACTION
          </label>
          <select
            value={selectedAction}
            onChange={(e) => onSelectAction(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-800 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm cursor-pointer"
          >
            {AUDIT_ACTION_FILTERS.map((act) => (
              <option key={act} value={act}>
                {act}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Date Range */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            DATE RANGE
          </label>
          <div className="relative mt-1.5">
            <input
              type="text"
              value={dateRange}
              onChange={(e) => onDateChange(e.target.value)}
              placeholder="mm/dd/yyyy"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 pr-10 text-xs font-medium text-slate-800 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
            />
            <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditFilterBox;
