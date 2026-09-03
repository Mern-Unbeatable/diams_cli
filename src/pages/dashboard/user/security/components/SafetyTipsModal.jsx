import { CheckCircle2, ShieldCheck, X } from "lucide-react";

export const SafetyTipsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const tips = [
    {
      title: "Use Unique Passwords",
      desc: "Never reuse passwords across your email, banking, and NovaSky mobile accounts.",
    },
    {
      title: "Enable Two-Factor Authentication (2FA)",
      desc: "Keep 2FA active at all times to prevent unauthorized SIM swaps and device logins.",
    },
    {
      title: "Beware of Phishing SMS & Emails",
      desc: "NovaSky will never ask for your password, PIN, or full credit card number over SMS or phone.",
    },
    {
      title: "Keep Line PIN Confidential",
      desc: "Your 4-digit line PIN is required to authorize SIM replacements and transfers.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100">
              <ShieldCheck size={18} />
            </span>
            <h3 className="text-base font-bold text-primary">
              Account Safety Tips
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

        <div className="mt-4 space-y-3 text-xs">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-3.5"
            >
              <CheckCircle2
                size={16}
                className="text-[#0284c7] shrink-0 mt-0.5"
              />
              <div>
                <h4 className="font-bold text-primary">{tip.title}</h4>
                <p className="text-[11px] text-primary/60 mt-0.5 leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}

          <div className="flex justify-end pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-btnPrimary px-5 py-2 font-bold text-white shadow-sm hover:bg-btnPrimary/90 transition-colors"
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
