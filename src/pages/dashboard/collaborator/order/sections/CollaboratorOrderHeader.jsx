import { ChevronDown } from "lucide-react";
import { ORDER_STATUS_OPTIONS } from "./collaboratorOrderData";

const CollaboratorOrderHeader = ({ status, setStatus }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0b1736] sm:text-[28px]">
          Customer Orders
        </h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Orders from customers you registered with NovaSky.
        </p>
      </div>

      {/* Top-Right Status Dropdown Filter */}
      <div className="flex flex-col items-start sm:items-end gap-1">
        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          STATUS
        </label>
        <div className="relative min-w-[140px]">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3.5 pr-8 text-xs font-semibold text-slate-700 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 cursor-pointer shadow-2xs"
          >
            {ORDER_STATUS_OPTIONS.map((opt) => (
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

export default CollaboratorOrderHeader;
