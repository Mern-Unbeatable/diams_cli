import { useState } from "react";
import { Check, Edit3, X } from "lucide-react";

export const RenameEsimModal = ({ isOpen, onClose, currentName, onSave }) => {
  const [name, setName] = useState(currentName || "Primary eSIM");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100">
              <Edit3 size={18} />
            </span>
            <h3 className="text-base font-bold text-primary">
              Rename your eSIM
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

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-primary">
              eSIM Profile Label
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Personal iPhone, Work Line, Travel Roaming"
              maxLength={40}
              className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-primary placeholder:text-gray-400 focus:border-btnPrimary focus:outline-none focus:ring-2 focus:ring-btnPrimary/15"
              autoFocus
            />
            <p className="text-[11px] text-primary/50">
              This label helps you identify your line across NovaSky apps and
              widgets.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-primary/70 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-btnPrimary px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-btnPrimary/90 transition-colors"
            >
              <Check size={14} />
              <span>Save Name</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
