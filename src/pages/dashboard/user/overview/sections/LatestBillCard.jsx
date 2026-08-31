import { Link } from "react-router";
import { ArrowRight, Download, FileText } from "lucide-react";
import { USER_OVERVIEW } from "@/config/userOverview";

const LatestBillCard = () => {
  const { latestBill } = USER_OVERVIEW;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-bold text-primary">Latest bill</h3>
        <Link
          to={latestBill.seeAllPath}
          className="inline-flex items-center gap-1 text-sm font-semibold text-btnPrimary hover:opacity-80"
        >
          See all
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-primary">{latestBill.month}</p>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
              {latestBill.status}
            </span>
          </div>
          <p className="mt-3 text-3xl font-bold text-primary">{latestBill.amount}</p>
          <p className="mt-1 text-xs text-primary/55">{latestBill.paidOn}</p>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50">
          <FileText size={22} className="text-primary/45" />
        </div>
      </div>

      <button
        type="button"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-gray-50"
      >
        <Download size={16} />
        Download invoice
      </button>
    </section>
  );
};

export default LatestBillCard;
