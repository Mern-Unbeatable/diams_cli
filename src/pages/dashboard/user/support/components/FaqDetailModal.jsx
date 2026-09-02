import { HelpCircle, X } from "lucide-react";

export const FaqDetailModal = ({ isOpen, onClose, faq }) => {
  if (!isOpen || !faq) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100">
              <HelpCircle size={18} />
            </span>
            <h3 className="text-sm sm:text-base font-bold text-primary">
              Help Center Article
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

        <div className="space-y-2 text-xs">
          <h4 className="text-sm font-bold text-primary">{faq.question}</h4>
          <p className="text-primary/75 leading-relaxed bg-gray-50/70 p-4 rounded-xl border border-gray-100">
            {faq.answer}
          </p>
        </div>

        <div className="flex justify-end pt-2">
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
