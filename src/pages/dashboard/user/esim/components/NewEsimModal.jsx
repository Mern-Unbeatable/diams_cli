import { CheckCircle2, Plus, Sparkles, X } from "lucide-react";
import { useState } from "react";

export const NewEsimModal = ({ isOpen, onClose, onGeneratedNew }) => {
  const [reason, setReason] = useState("new_device");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      onGeneratedNew?.();
    }, 1500);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100">
              <Plus size={18} />
            </span>
            <h3 className="text-base font-bold text-primary">Get a new eSIM</h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-1.5 text-primary/40 hover:bg-gray-100 hover:text-primary transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {!isSuccess ? (
          <div className="mt-4 space-y-4 text-xs">
            <p className="text-primary/70">
              Generate a brand-new eSIM profile for your NovaSky number (+41 76 123 45 67). Your existing profile will be replaced upon activating the new QR code.
            </p>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-primary/60">
                Reason for replacement
              </label>
              <div className="grid gap-2">
                {[
                  { id: "new_device", label: "I switched to a new smartphone or tablet" },
                  { id: "qr_lost", label: "I lost my previous QR code or deleted the profile" },
                  { id: "troubleshoot", label: "Troubleshooting connection or network issues" },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors ${
                      reason === opt.id
                        ? "border-btnPrimary bg-sky-50/50 text-primary font-bold shadow-xs"
                        : "border-gray-200 bg-white text-primary/70 hover:bg-gray-50 font-normal"
                    }`}
                  >
                    <input
                      type="radio"
                      name="reason"
                      value={opt.id}
                      checked={reason === opt.id}
                      onChange={(e) => setReason(e.target.value)}
                      className="accent-btnPrimary"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3.5 text-[11px] text-emerald-900 flex items-center gap-2.5">
              <Sparkles size={16} className="text-emerald-600 shrink-0" />
              <span>
                <strong>Instant & Free:</strong> New eSIM generation is free of charge and takes less than 10 seconds.
              </span>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={handleClose}
                disabled={isProcessing}
                className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-primary/70 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleOrder}
                disabled={isProcessing}
                className="inline-flex items-center gap-1.5 rounded-xl bg-btnPrimary px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-btnPrimary/90 transition-colors"
              >
                {isProcessing ? "Issuing eSIM..." : "Generate New eSIM Profile"}
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
              <CheckCircle2 size={28} />
            </div>
            <div>
              <h4 className="text-base font-bold text-primary">
                New eSIM Ready for Installation!
              </h4>
              <p className="mt-1 text-xs text-primary/60 max-w-sm mx-auto">
                Your new profile has been generated. The QR code on your dashboard has been updated. Scan it now to activate.
              </p>
            </div>
            <div className="pt-3">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center justify-center rounded-xl bg-btnPrimary px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-btnPrimary/90 transition-colors"
              >
                View Updated QR Code
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
