import { AlertTriangle, Trash2, X } from "lucide-react";
import { useState } from "react";

export const DeleteAccountModal = ({ isOpen, onClose }) => {
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
              <AlertTriangle size={18} />
            </span>
            <h3 className="text-base font-bold text-primary">Delete My Account</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-primary/40 hover:bg-gray-100 hover:text-primary transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs">
          <div className="rounded-xl border border-rose-100 bg-rose-50/70 p-3.5 text-rose-900 space-y-1">
            <p className="font-bold">Irreversible Action</p>
            <p className="text-[11px] leading-relaxed text-rose-800">
              Deleting your account will terminate all active subscriptions, eSIM profiles, and billing histories permanently.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-primary/60">
              Type <span className="font-mono text-rose-600 font-bold">DELETE</span> to confirm
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE"
              className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-primary focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/15"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="rounded-xl border border-gray-200 px-4 py-2 font-semibold text-primary/70 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={confirmText.toUpperCase() !== "DELETE" || isDeleting}
              className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 font-bold text-white shadow-sm hover:bg-rose-700 transition-colors disabled:opacity-40"
            >
              <Trash2 size={14} />
              <span>{isDeleting ? "Processing..." : "Confirm Deletion"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
