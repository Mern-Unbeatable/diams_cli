import { Check, CircleMinus } from "lucide-react";

export const LineStatusCard = () => (
  <section className="rounded-xl border border-gray-100 bg-white p-6 sm:p-7 shadow-xs">
    <h3 className="text-xl font-bold tracking-tight text-[#0b1736]">
      Line Status
    </h3>

    <div className="mt-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#bbf7d0] bg-[#f0fdf4] text-[#16a34a]">
        <Check size={26} strokeWidth={3} />
      </div>

      <h4 className="mt-4 text-lg font-bold tracking-tight text-[#0b1736]">
        Your line is active
      </h4>
      <p className="mt-1 text-xs text-gray-400 font-normal sm:text-sm">
        All services are running smoothly.
      </p>

      <button
        type="button"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-[#ef4444] transition-all hover:border-red-200 hover:bg-red-50/50 active:scale-[0.99]"
      >
        <CircleMinus size={16} strokeWidth={2} className="text-[#ef4444]" />
        <span>Suspend Line</span>
      </button>
    </div>

    <div className="mt-6 text-left">
      <p className="text-xs text-gray-400 font-normal">
        Need to stop your line temporarily?
      </p>
      <button
        type="button"
        className="mt-1 text-xs font-semibold text-[#258bf5] hover:underline"
      >
        Suspend now →
      </button>
    </div>
  </section>
);

export default LineStatusCard;
