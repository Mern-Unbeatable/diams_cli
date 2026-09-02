import { ChevronDown } from "lucide-react";
import {
  COLLABORATOR_STATUS_OPTIONS,
  COLLABORATOR_PLAN_OPTIONS,
} from "./collaboratorCustomerData";

const CollaboratorCustomerFilters = ({
  status,
  setStatus,
  plan,
  setPlan,
}) => {
  return (
    <div className="flex flex-wrap items-end gap-4 sm:gap-6">
      {/* 1. Status Filter */}
      <div className="min-w-[150px] flex-1 sm:flex-initial">
        <label className="mb-1.5 block text-[11px] font-bold tracking-wider text-slate-500 uppercase">
          Status
        </label>
        <div className="relative">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3.5 pr-8 text-xs font-medium text-slate-700 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 cursor-pointer"
          >
            {COLLABORATOR_STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* 2. Plan Filter */}
      <div className="min-w-[180px] flex-1 sm:flex-initial">
        <label className="mb-1.5 block text-[11px] font-bold tracking-wider text-slate-500 uppercase">
          Plan
        </label>
        <div className="relative">
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3.5 pr-8 text-xs font-medium text-slate-700 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 cursor-pointer"
          >
            {COLLABORATOR_PLAN_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        </div>
      </div>
    </div>
  );
};

export default CollaboratorCustomerFilters;
