import { Link } from "react-router";
import { Download, Loader2 } from "lucide-react";
import { USER_OVERVIEW } from "@/config/userOverview";
import { useInvoiceDownload } from "@/Components/invoice";
import { latestBillToInvoice } from "../../shared/userInvoice";

const LatestBillCard = () => {
  const { latestBill } = USER_OVERVIEW;
  const { downloadInvoice, downloadingKey, downloadError, invoiceRenderer } =
    useInvoiceDownload();
  const isDownloading = Boolean(downloadingKey);

  const handleDownload = () =>
    downloadInvoice(latestBillToInvoice(latestBill), "latest-bill");

  return (
    <>
      <section className="group flex h-full flex-col justify-between rounded-xl border border-gray-100 bg-white p-4 sm:p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md min-w-0">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg sm:text-xl lg:text-[22px] font-bold tracking-tight text-[#0b1736]">
              Latest bill
            </h3>
            <Link
              to={latestBill.seeAllPath}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#258bf5] transition-opacity hover:opacity-80 shrink-0"
            >
              <span>See all</span>
              <span className="text-base leading-none transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 min-w-0">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-[#0b1736]">
                  {latestBill.month}
                </span>
                <span className="rounded-md bg-[#eafaf1] px-2 py-0.5 text-xs font-semibold text-[#16a34a] shrink-0">
                  {latestBill.status}
                </span>
              </div>

              <p className="mt-2 text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#0b1736] break-words">
                {latestBill.amount}
              </p>

              <p className="mt-1 text-xs sm:text-sm text-gray-400 font-normal">
                {latestBill.paidOn}
              </p>
            </div>

            {/* Invoice document preview with download badge */}
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              title="Download invoice"
              aria-label="Download invoice"
              className="relative flex h-[76px] w-[60px] sm:h-[82px] sm:w-[66px] shrink-0 flex-col gap-1.5 rounded-xl border border-blue-100/90 bg-[#f8fbff] p-2.5 shadow-2xs transition-colors hover:border-blue-300 disabled:cursor-wait"
            >
              <div className="h-1.5 w-6 rounded-full bg-blue-300/80" />
              <div className="h-1 w-10 rounded-full bg-blue-100" />
              <div className="h-1 w-8 rounded-full bg-blue-100" />
              <div className="h-1 w-11 rounded-full bg-blue-100" />
              <div className="h-1 w-7 rounded-full bg-blue-100" />

              <div className="absolute -right-1.5 -bottom-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#258bf5] text-white shadow-xs">
                {isDownloading ? (
                  <Loader2
                    size={12}
                    strokeWidth={2.5}
                    className="animate-spin"
                  />
                ) : (
                  <Download size={12} strokeWidth={2.5} />
                )}
              </div>
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-100 bg-white py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-[#258bf5] transition-all hover:bg-blue-50/50 active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
          >
            {isDownloading ? (
              <Loader2 size={16} strokeWidth={2.2} className="animate-spin" />
            ) : (
              <Download size={16} strokeWidth={2.2} />
            )}
            <span>{isDownloading ? "Generating…" : "Download invoice"}</span>
          </button>
          {downloadError ? (
            <p className="text-center text-[11px] font-medium text-rose-600">
              {downloadError}
            </p>
          ) : null}
        </div>
      </section>

      {invoiceRenderer}
    </>
  );
};

export default LatestBillCard;
