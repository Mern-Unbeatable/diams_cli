import { ChevronDown, HelpCircle, X } from "lucide-react";
import { useState } from "react";
import { USER_ESIM } from "@/config/userEsim";

export const EsimFaqModal = ({ isOpen, onClose }) => {
  const [openIdx, setOpenIdx] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100">
              <HelpCircle size={18} />
            </span>
            <h3 className="text-base font-bold text-primary">
              Frequently Asked Questions
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-primary/40 hover:bg-gray-100 hover:text-primary transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 max-h-96 overflow-y-auto pr-1 divide-y divide-gray-100 text-xs">
          {USER_ESIM.faqItems.map((item, idx) => (
            <div key={idx} className="py-3 first:pt-0 last:pb-0">
              <button
                type="button"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="flex w-full items-center justify-between text-left font-bold text-primary"
              >
                <span>{item.q}</span>
                <ChevronDown
                  size={15}
                  className={`shrink-0 text-primary/40 transition-transform ${
                    openIdx === idx ? "rotate-180 text-btnPrimary" : ""
                  }`}
                />
              </button>
              {openIdx === idx && (
                <p className="mt-2 text-xs leading-relaxed text-primary/70">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-end border-t border-gray-100 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-btnPrimary px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-btnPrimary/90 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
