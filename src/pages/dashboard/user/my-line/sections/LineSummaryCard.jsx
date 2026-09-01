import { Link } from "react-router";
import { Calendar, Copy, Zap } from "lucide-react";
import { USER_MY_LINE } from "@/config/userMyLine";

export const LineSummaryCard = () => {
  const { summary, simCardImage } = USER_MY_LINE;

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text.replace(/\s/g, ""));
  };

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-6 sm:p-7 shadow-xs">
      <div className="grid gap-6 lg:grid-cols-[auto_1fr_auto_minmax(320px,1.2fr)] lg:items-center">
        {/* Left: SIM Card Image */}
        <div className="flex items-center justify-center lg:justify-start">
          <div className="relative h-44 w-32 shrink-0 transition-transform duration-300 hover:scale-105">
            <img
              src={simCardImage}
              alt="NovaSky SIM card"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Middle: Main Line Information */}
        <div className="flex flex-col justify-between self-stretch py-1">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-gray-400">
                {summary.label}
              </span>
              <span className="rounded-md bg-[#e6faf0] px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-[#16a34a]">
                {summary.status}
              </span>
            </div>

            <div className="mt-2.5 flex items-center gap-3">
              <h3 className="text-2xl font-extrabold tracking-tight text-[#0b1736] sm:text-3xl">
                {summary.phone}
              </h3>
              <button
                type="button"
                onClick={() => handleCopy(summary.phone)}
                className="text-gray-400 transition-colors hover:text-[#258bf5]"
                aria-label="Copy phone number"
              >
                <Copy size={16} strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2">
              <p className="text-[15px] font-bold text-[#0b1736]">
                {summary.plan}
              </p>
              <span className="rounded bg-[#258bf5] px-1.5 py-0.5 text-[10px] font-bold text-white">
                {summary.networkBadge}
              </span>
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
              <Calendar size={13} className="text-gray-400" />
              {summary.since}
            </p>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden h-full w-[1px] bg-gray-100 lg:block" />

        {/* Right: Technical Line Details */}
        <div className="flex flex-col justify-between self-stretch border-t border-gray-100 pt-4 lg:border-t-0 lg:pt-0">
          <div className="flex items-center justify-between border-b border-gray-100/80 py-2.5 first:pt-0">
            <span className="text-xs font-normal text-gray-400 sm:text-sm">ICCID</span>
            <span className="text-xs font-bold text-[#0b1736] sm:text-sm">{summary.iccid}</span>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100/80 py-2.5">
            <span className="text-xs font-normal text-gray-400 sm:text-sm">SIM Type</span>
            <span className="text-xs font-bold text-[#0b1736] sm:text-sm">{summary.simType}</span>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100/80 py-2.5">
            <span className="text-xs font-normal text-gray-400 sm:text-sm">Status</span>
            <span className="flex items-center gap-1.5 text-xs font-bold text-[#16a34a] sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
              {summary.lineStatus}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100/80 py-2.5">
            <span className="text-xs font-normal text-gray-400 sm:text-sm">Network</span>
            <span className="text-xs font-bold text-[#0b1736] sm:text-sm">{summary.network}</span>
          </div>

          <div className="flex items-center justify-between py-2.5 last:pb-0">
            <span className="text-xs font-normal text-gray-400 sm:text-sm">Data Renewal</span>
            <span className="text-xs font-bold text-[#0b1736] sm:text-sm">
              {summary.dataRenewal} ({summary.dataRenewalHint})
            </span>
          </div>
        </div>
      </div>

      {/* Bottom info banner */}
      <div className="mt-6 flex flex-col items-start gap-4 rounded-xl bg-[#eff6ff] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#258bf5] shadow-xs">
            <Zap size={16} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-xs font-normal text-[#0b1736] sm:text-sm">
              Your line is <span className="font-bold">active</span> and everything is working perfectly.
            </p>
            <p className="mt-0.5 text-xs text-gray-400">
              If you need help, we're here for you.
            </p>
          </div>
        </div>

        <Link
          to={summary.viewUsagePath}
          className="shrink-0 rounded-xl border border-gray-100 bg-white px-5 py-2 text-xs font-semibold text-[#258bf5] shadow-2xs transition-colors hover:bg-gray-50 sm:text-sm"
        >
          View Usage
        </Link>
      </div>
    </section>
  );
};

export default LineSummaryCard;
