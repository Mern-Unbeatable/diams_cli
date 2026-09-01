import { Link } from "react-router";
import { Download } from "lucide-react";
import { USER_OVERVIEW } from "@/config/userOverview";

const LatestBillCard = () => {
  const { latestBill } = USER_OVERVIEW;

  return (
    <section className="flex h-full flex-col justify-between rounded-xl border border-gray-100 bg-white p-6 shadow-xs">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-[22px] font-bold tracking-tight text-[#0b1736]">
            Latest bill
          </h3>
          <Link
            to={latestBill.seeAllPath}
            className="inline-flex items-center gap-1 text-sm sm:text-[15px] font-semibold text-[#258bf5] transition-opacity hover:opacity-80"
          >
            <span>See all</span>
            <span className="text-base leading-none">→</span>
          </Link>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-base font-bold text-[#0b1736]">
                {latestBill.month}
              </span>
              <span className="rounded-md bg-[#eafaf1] px-2 py-0.5 text-xs font-semibold text-[#16a34a]">
                {latestBill.status}
              </span>
            </div>

            <p className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0b1736]">
              {latestBill.amount}
            </p>

            <p className="mt-1 text-xs sm:text-sm text-gray-400 font-normal">
              {latestBill.paidOn}
            </p>
          </div>

          {/* Invoice document preview with download badge */}
          <div className="relative flex h-[82px] w-[66px] shrink-0 flex-col gap-1.5 rounded-xl border border-blue-100/90 bg-[#f8fbff] p-2.5 shadow-2xs">
            <div className="h-1.5 w-6 rounded-full bg-blue-300/80" />
            <div className="h-1 w-10 rounded-full bg-blue-100" />
            <div className="h-1 w-8 rounded-full bg-blue-100" />
            <div className="h-1 w-11 rounded-full bg-blue-100" />
            <div className="h-1 w-7 rounded-full bg-blue-100" />

            <div className="absolute -right-1.5 -bottom-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#258bf5] text-white shadow-xs">
              <Download size={12} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-white py-3 text-sm font-semibold text-[#258bf5] transition-all hover:bg-blue-50/50 active:scale-[0.99]"
      >
        <Download size={16} strokeWidth={2.2} />
        <span>Download invoice</span>
      </button>
    </section>
  );
};

export default LatestBillCard;
