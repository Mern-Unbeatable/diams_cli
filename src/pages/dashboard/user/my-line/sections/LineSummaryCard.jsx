import { Link } from "react-router";
import { Calendar, Copy, Zap } from "lucide-react";
import { USER_MY_LINE } from "@/config/userMyLine";

export const LineSummaryCard = () => {
  const { summary, simCardImage } = USER_MY_LINE;

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text.replace(/\s/g, ""));
  };

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-7 shadow-xs min-w-0">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        {/* Left: SIM Card Image & Middle Info Group */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start xl:items-center gap-4 sm:gap-6 flex-1 min-w-0">
          {/* SIM Card Image */}
          <div className="flex items-center justify-center shrink-0">
            <div className="relative h-36 w-28 sm:h-40 sm:w-30 xl:h-44 xl:w-32 shrink-0 transition-transform duration-300 hover:scale-105">
              <img
                src={simCardImage}
                alt="NovaSky SIM card"
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Middle: Main Line Information */}
          <div className="flex flex-col justify-between self-stretch py-1 flex-1 min-w-0">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-medium text-gray-400">
                  {summary.label}
                </span>
                <span className="rounded-md bg-[#e6faf0] px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-[#16a34a] shrink-0">
                  {summary.status}
                </span>
              </div>

              <div className="mt-2.5 flex items-center gap-3 min-w-0">
                <h3 className="text-xl lg:text-2xl xl:text-3xl font-extrabold tracking-tight text-[#0b1736] whitespace-nowrap">
                  {summary.phone}
                </h3>
                <button
                  type="button"
                  onClick={() => handleCopy(summary.phone)}
                  className="text-gray-400 transition-colors hover:text-[#258bf5] shrink-0"
                  aria-label="Copy phone number"
                >
                  <Copy size={16} strokeWidth={2} />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm sm:text-[15px] font-bold text-[#0b1736]">
                  {summary.plan}
                </p>
                <span className="rounded bg-[#258bf5] px-1.5 py-0.5 text-[10px] font-bold text-white shrink-0">
                  {summary.networkBadge}
                </span>
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
                <Calendar size={13} className="text-gray-400 shrink-0" />
                {summary.since}
              </p>
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden xl:block h-36 w-[1px] bg-gray-200/80 shrink-0 self-center mx-2" />

        {/* Right: Technical Line Details */}
        <div className="flex-1 flex flex-col justify-between self-stretch border-t border-gray-100 pt-4 xl:border-t-0 xl:pt-0 min-w-0 max-w-full xl:max-w-[360px]">
          <div className="flex items-center justify-between gap-3 border-b border-gray-100/80 py-2.5 first:pt-0">
            <span className="text-xs font-normal text-gray-400 sm:text-sm shrink-0">ICCID</span>
            <span className="text-xs font-bold text-[#0b1736] sm:text-sm truncate">{summary.iccid}</span>
          </div>

          <div className="flex items-center justify-between gap-3 border-b border-gray-100/80 py-2.5">
            <span className="text-xs font-normal text-gray-400 sm:text-sm shrink-0">SIM Type</span>
            <span className="text-xs font-bold text-[#0b1736] sm:text-sm truncate">{summary.simType}</span>
          </div>

          <div className="flex items-center justify-between gap-3 border-b border-gray-100/80 py-2.5">
            <span className="text-xs font-normal text-gray-400 sm:text-sm shrink-0">Status</span>
            <span className="flex items-center gap-1.5 text-xs font-bold text-[#16a34a] sm:text-sm shrink-0">
              <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
              {summary.lineStatus}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 border-b border-gray-100/80 py-2.5">
            <span className="text-xs font-normal text-gray-400 sm:text-sm shrink-0">Network</span>
            <span className="text-xs font-bold text-[#0b1736] sm:text-sm truncate">{summary.network}</span>
          </div>

          <div className="flex items-center justify-between gap-3 py-2.5 last:pb-0">
            <span className="text-xs font-normal text-gray-400 sm:text-sm shrink-0">Data Renewal</span>
            <span className="text-xs font-bold text-[#0b1736] sm:text-sm truncate">
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
