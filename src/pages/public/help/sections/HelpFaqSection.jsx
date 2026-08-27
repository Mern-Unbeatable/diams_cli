import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { HELP_FAQ } from "@/config/help";

const HelpFaqSection = () => {
  const { title, viewAll, items } = HELP_FAQ;
  const [openId, setOpenId] = useState(null);

  return (
    <section className="page-section bg-[#f8fafc]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">{title}</h2>
          <Link
            to={viewAll.path}
            className="inline-flex items-center gap-1 text-sm font-semibold text-btnPrimary transition-opacity hover:opacity-80"
          >
            {viewAll.label}
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-4">
          {items.map((item) => {
            const isOpen = openId === item.id;

            return (
              <article
                key={item.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-[#f8fafc]"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-[18px]"
                >
                  <span className="text-sm font-medium text-primary sm:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    strokeWidth={2}
                    className={`shrink-0 text-primary/50 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-gray-200 px-5 pb-4 pt-3 sm:px-6 sm:pb-5 sm:pt-4">
                    <p className="text-sm leading-relaxed text-primary/70 sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HelpFaqSection;
