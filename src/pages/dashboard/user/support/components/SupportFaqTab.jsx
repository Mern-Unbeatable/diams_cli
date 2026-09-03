import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";

export const SupportFaqTab = ({ faqs }) => {
  const [search, setSearch] = useState("");
  const [openIdx, setOpenIdx] = useState(0);

  const filteredFaqs = (faqs || []).filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search frequently asked questions..."
          className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-3.5 pr-8 text-xs font-medium text-primary focus:border-btnPrimary focus:outline-none"
        />
        <Search
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40"
        />
      </div>

      {/* Accordion FAQ List */}
      <div className="rounded-xl border border-gray-200/90 bg-white p-4 sm:p-6 shadow-sm divide-y divide-gray-100">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => (
            <div key={faq.id || idx} className="py-3 first:pt-0 last:pb-0">
              <button
                type="button"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="flex w-full items-center justify-between text-left text-xs sm:text-sm font-bold text-primary hover:text-btnPrimary transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={16}
                  className={`text-primary/40 transition-transform shrink-0 ml-2 ${
                    openIdx === idx ? "rotate-180 text-btnPrimary" : ""
                  }`}
                />
              </button>
              {openIdx === idx && (
                <p className="mt-2 text-xs leading-relaxed text-primary/70 pr-4">
                  {faq.answer}
                </p>
              )}
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-primary/50 text-xs">
            No FAQ articles found matching "{search}".
          </div>
        )}
      </div>
    </div>
  );
};
