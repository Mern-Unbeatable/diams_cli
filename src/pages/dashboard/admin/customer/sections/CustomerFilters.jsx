import { ChevronDown } from "lucide-react";
import {
  STATUS_OPTIONS,
  PLAN_OPTIONS,
  LINE_STATUS_OPTIONS,
} from "./customerData";

const CustomerFilters = ({
  status,
  setStatus,
  plan,
  setPlan,
  date,
  setDate,
  lineStatus,
  setLineStatus,
  onClearFilters,
}) => {
  return (
    <div className="flex flex-wrap items-end gap-3 sm:gap-4">
      {/* 1. Status Filter */}
      <div className="min-w-[130px] flex-1 sm:flex-initial">
        <label className="mb-1.5 block text-[11px] font-bold tracking-wider text-slate-500 uppercase">
          Status
        </label>
        <div className="relative">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3.5 pr-8 text-xs font-medium text-slate-700 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 cursor-pointer"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* 2. Plan Filter */}
      <div className="min-w-[140px] flex-1 sm:flex-initial">
        <label className="mb-1.5 block text-[11px] font-bold tracking-wider text-slate-500 uppercase">
          Plan
        </label>
        <div className="relative">
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3.5 pr-8 text-xs font-medium text-slate-700 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 cursor-pointer"
          >
            {PLAN_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* 3. Date Filter */}
      <div className="min-w-[160px] flex-1 sm:flex-initial">
        <label className="mb-1.5 block text-[11px] font-bold tracking-wider text-slate-500 uppercase">
          Date
        </label>
        <input
          type="text"
          placeholder="mm/dd/yyyy"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white py-2 px-3.5 text-xs font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        />
      </div>

      {/* 4. Line Status Filter */}
      <div className="min-w-[130px] flex-1 sm:flex-initial">
        <label className="mb-1.5 block text-[11px] font-bold tracking-wider text-slate-500 uppercase">
          Line Status
        </label>
        <div className="relative">
          <select
            value={lineStatus}
            onChange={(e) => setLineStatus(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3.5 pr-8 text-xs font-medium text-slate-700 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 cursor-pointer"
          >
            {LINE_STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* 5. Clear Filters Button */}
      <div className="ml-auto flex items-end">
        <button
          type="button"
          onClick={onClearFilters}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900 active:scale-95"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default CustomerFilters;
