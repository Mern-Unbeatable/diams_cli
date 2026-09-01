import { Check } from "lucide-react";

export const LineStatusCard = () => (
  <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
    <h3 className="text-base font-bold text-primary">Line Status</h3>
    <div className="mt-4 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500 bg-emerald-50/20 text-emerald-600">
        <Check size={24} strokeWidth={2.5} />
      </div>
      <h4 className="mt-4 text-base font-bold text-primary">Your line is active</h4>
      <p className="mt-1 text-sm text-primary/55">All services are running smoothly.</p>
      <button
        type="button"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
        Suspend Line
      </button>
    </div>
    <div className="mt-6 text-left">
      <p className="text-xs text-primary/55">Need to stop your line temporarily?</p>
      <button type="button" className="mt-1 text-xs font-semibold text-btnPrimary hover:underline">
        Suspend now →
      </button>
    </div>
  </section>
);

export default LineStatusCard;
