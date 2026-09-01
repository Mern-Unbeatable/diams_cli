import { Check, ShieldCheck, Smartphone, X } from "lucide-react";
import { useState } from "react";

export const TwoFactorModal = ({ isOpen, onClose, isEnabled, onToggle }) => {
  const [enabled, setEnabled] = useState(isEnabled ?? true);
  const [method, setMethod] = useState("sms");

  if (!isOpen) return null;

  const handleSave = () => {
    onToggle?.(enabled);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100">
              <ShieldCheck size={18} />
            </span>
            <h3 className="text-base font-bold text-primary">
              Two-Factor Authentication (2FA)
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

        <div className="mt-4 space-y-4 text-xs">
          <p className="text-primary/70">
            Two-factor authentication adds an essential layer of security by requiring a code when signing into your NovaSky account from a new device.
          </p>

          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50/70 p-3.5">
            <div>
              <p className="font-bold text-primary">Enable 2FA Protection</p>
              <p className="text-[11px] text-primary/50">
                Require security code for all logins
              </p>
            </div>
            <button
              type="button"
              onClick={() => setEnabled(!enabled)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                enabled ? "bg-btnPrimary" : "bg-gray-300"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  enabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {enabled && (
            <div className="space-y-2 pt-1">
              <label className="font-bold text-primary text-[11px] uppercase tracking-wider text-primary/60">
                Verification Method
              </label>
              <div className="grid gap-2">
                {[
                  {
                    id: "sms",
                    title: "SMS Verification (+41 76 123 45 67)",
                    desc: "Receive verification codes directly via text message.",
                  },
                  {
                    id: "app",
                    title: "Authenticator App (Google, 1Password)",
                    desc: "Generate time-based one-time codes in an auth app.",
                  },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
                      method === item.id
                        ? "border-btnPrimary bg-sky-50/50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="2fa-method"
                      value={item.id}
                      checked={method === item.id}
                      onChange={(e) => setMethod(e.target.value)}
                      className="mt-0.5 accent-btnPrimary"
                    />
                    <div>
                      <p className="font-bold text-primary">{item.title}</p>
                      <p className="text-[11px] text-primary/50">{item.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-4 py-2 font-semibold text-primary/70 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 rounded-xl bg-btnPrimary px-5 py-2 font-bold text-white shadow-sm hover:bg-btnPrimary/90 transition-colors"
            >
              <Check size={14} />
              <span>Save 2FA Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
