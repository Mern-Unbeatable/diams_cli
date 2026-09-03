import { Bell, Check, X } from "lucide-react";
import { useState } from "react";

export const LoginAlertsModal = ({ isOpen, onClose, onSave }) => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSave?.({ emailAlerts, smsAlerts });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100">
              <Bell size={18} />
            </span>
            <h3 className="text-base font-bold text-primary">Login Alerts</h3>
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
            Get notified immediately whenever your account is accessed from a
            new device, browser, or unfamiliar location.
          </p>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50/70 p-3">
              <div>
                <p className="font-bold text-primary">Email Notifications</p>
                <p className="text-[11px] text-primary/50">
                  Send alert to abdoulaye.sow@email.com
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEmailAlerts(!emailAlerts)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                  emailAlerts ? "bg-btnPrimary" : "bg-gray-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition duration-200 ${
                    emailAlerts ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50/70 p-3">
              <div>
                <p className="font-bold text-primary">SMS Notifications</p>
                <p className="text-[11px] text-primary/50">
                  Send SMS to +41 76 123 45 67
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSmsAlerts(!smsAlerts)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                  smsAlerts ? "bg-btnPrimary" : "bg-gray-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition duration-200 ${
                    smsAlerts ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

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
              onClick={handleSubmit}
              className="inline-flex items-center gap-1.5 rounded-xl bg-btnPrimary px-5 py-2 font-bold text-white shadow-sm hover:bg-btnPrimary/90 transition-colors"
            >
              <Check size={14} />
              <span>Save Preferences</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
