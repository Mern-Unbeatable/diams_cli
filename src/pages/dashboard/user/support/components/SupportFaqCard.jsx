import { ChevronRight } from "lucide-react";

export const SupportFaqCard = ({ faqs, onSelectFaq, onViewAllFaq }) => {
  return (
    <section className="rounded-2xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-3.5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-bold text-primary">
          Frequently asked questions
        </h3>
        <button
          type="button"
          onClick={onViewAllFaq}
          className="text-xs font-semibold text-btnPrimary hover:underline"
        >
          View all FAQ →
        </button>
      </div>

      <div className="divide-y divide-gray-100 text-xs">
        {(faqs || []).map((faq) => (
          <button
            key={faq.id}
            type="button"
            onClick={() => onSelectFaq?.(faq)}
            className="flex w-full items-center justify-between py-2.5 first:pt-1 last:pb-0 text-left hover:text-btnPrimary transition-colors group cursor-pointer"
          >
            <span className="font-medium text-primary/80 group-hover:text-btnPrimary pr-2">
              {faq.question}
            </span>
            <ChevronRight
              size={14}
              className="text-primary/30 group-hover:text-btnPrimary group-hover:translate-x-0.5 transition-all shrink-0"
            />
          </button>
        ))}
      </div>
    </section>
  );
};
