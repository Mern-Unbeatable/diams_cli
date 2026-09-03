import { useState } from "react";
import { Check, Copy, Wifi, Zap, CheckCircle2 } from "lucide-react";
import { USER_ESIM } from "@/config/userEsim";

const DEFAULT_MANUAL_ENTRY = {
  tag: "MANUAL ENTRY",
  title: "Enter your activation details",
  subtitle: "Copy these values exactly as shown in your NovaSky welcome email.",
  smdpAddress: "SMDP.NOVASKY.IO",
  activationCode: "K2-9F4A-7C21-XR88-QQ03",
  confirmationPlaceholder: "Only if requested by your device",
  activateButtonText: "Activate eSIM",
  activateNotice:
    "Activation is instant and can only be done once per profile.",
  tipsTitle: "Installation tips",
  tips: [
    "Stay connected to a stable Wi-Fi network during the whole installation.",
    "Keep at least 30% battery — activation can take up to 3 minutes.",
    "Do not delete the eSIM profile after installing it; it cannot be reinstalled.",
    "Set NovaSky as your primary data line once the profile appears.",
  ],
  referenceValuesTitle: "Reference values",
  referenceValues: [
    { id: "smdp", label: "SMDP.NOVASKY.IO", value: "SMDP.NOVASKY.IO" },
    {
      id: "code",
      label: "K2-9F4A-7C21-XR88-QQ03",
      value: "K2-9F4A-7C21-XR88-QQ03",
    },
  ],
};

export const EsimManualEntryTab = ({ esimData, onActivationSuccess }) => {
  const manualEntry = {
    ...DEFAULT_MANUAL_ENTRY,
    ...(USER_ESIM?.manualEntry || {}),
  };

  const [smdpAddress, setSmdpAddress] = useState(
    esimData?.smdpAddress || manualEntry.smdpAddress,
  );
  const [activationCode, setActivationCode] = useState(
    esimData?.activationCode || manualEntry.activationCode,
  );
  const [confirmationCode, setConfirmationCode] = useState("");
  const [copiedField, setCopiedField] = useState(null);
  const [isActivating, setIsActivating] = useState(false);
  const [activatedSuccess, setActivatedSuccess] = useState(false);

  const handleCopy = (key, text) => {
    if (text) {
      navigator.clipboard?.writeText(text);
      setCopiedField(key);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handleActivate = (e) => {
    e.preventDefault();
    setIsActivating(true);
    setTimeout(() => {
      setIsActivating(false);
      setActivatedSuccess(true);
      onActivationSuccess?.();
    }, 1200);
  };

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {/* Left Form Card */}
      <div className="rounded-xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-5 flex flex-col justify-between">
        {/* Header */}
        <div>
          <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#38bdf8]">
            {manualEntry.tag || "MANUAL ENTRY"}
          </span>
          <h3 className="mt-1 text-lg sm:text-xl font-bold text-primary">
            {manualEntry.title || "Enter your activation details"}
          </h3>
          <p className="mt-1 text-xs text-primary/60">
            {manualEntry.subtitle ||
              "Copy these values exactly as shown in your NovaSky welcome email."}
          </p>
        </div>

        {/* Manual Entry Form */}
        <form onSubmit={handleActivate} className="space-y-4">
          {/* SM-DP+ Address */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-primary">
                SM-DP+ Address
              </label>
              <button
                type="button"
                onClick={() => handleCopy("form-smdp", smdpAddress)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50/80 px-2.5 py-1 text-xs font-semibold text-primary/70 transition-colors hover:bg-gray-100 hover:text-primary"
              >
                {copiedField === "form-smdp" ? (
                  <>
                    <Check size={12} className="text-emerald-600" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <input
              type="text"
              value={smdpAddress}
              onChange={(e) => setSmdpAddress(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-mono text-primary font-medium focus:border-btnPrimary focus:outline-none focus:ring-2 focus:ring-btnPrimary/15"
              required
            />
          </div>

          {/* Activation Code */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-primary">
              Activation Code
            </label>
            <input
              type="text"
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-mono text-primary font-medium focus:border-btnPrimary focus:outline-none focus:ring-2 focus:ring-btnPrimary/15"
              required
            />
          </div>

          {/* Confirmation Code (optional) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-primary">
              Confirmation Code{" "}
              <span className="text-primary/50 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              placeholder={manualEntry.confirmationPlaceholder}
              className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-primary placeholder:text-gray-400 focus:border-btnPrimary focus:outline-none focus:ring-2 focus:ring-btnPrimary/15"
            />
          </div>

          {/* Action Bar */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              type="submit"
              disabled={isActivating}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00183c] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:bg-[#00183c]/90 active:scale-[0.98] disabled:opacity-50 shrink-0"
            >
              <Zap size={14} className="fill-white text-white" />
              <span>
                {isActivating
                  ? "Activating..."
                  : manualEntry.activateButtonText || "Activate eSIM"}
              </span>
            </button>
            <p className="text-[10px] sm:text-[11px] text-primary/50 leading-tight">
              {manualEntry.activateNotice}
            </p>
          </div>

          {activatedSuccess && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-3 flex items-center gap-2 text-xs text-emerald-800 animate-in fade-in">
              <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
              <span>eSIM activated successfully!</span>
            </div>
          )}
        </form>
      </div>

      {/* Right Column: Installation tips & Reference values */}
      <div className="space-y-4 flex flex-col justify-between">
        {/* Widget 1: Installation tips */}
        <div className="rounded-xl border border-gray-200/90 bg-white p-5 shadow-sm space-y-3.5">
          <div className="flex items-center gap-2 text-primary">
            <Wifi size={17} className="text-[#0284c7]" />
            <h4 className="text-sm sm:text-base font-bold">
              {manualEntry.tipsTitle || "Installation tips"}
            </h4>
          </div>

          <ul className="space-y-2.5 text-xs text-primary/70">
            {(manualEntry.tips || []).map((tip, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 leading-relaxed"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0284c7]" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Widget 2: Reference values */}
        <div className="rounded-xl border border-gray-200/90 bg-white p-5 shadow-sm space-y-3">
          <h4 className="text-sm sm:text-base font-bold text-primary">
            {manualEntry.referenceValuesTitle || "Reference values"}
          </h4>

          <div className="space-y-2 pt-0.5">
            {(manualEntry.referenceValues || []).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-2 rounded-xl border border-gray-200 bg-gray-50/70 px-3 py-2 text-xs font-mono text-primary font-medium"
              >
                <span className="truncate">{item.label}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(item.id, item.value)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 py-1 text-[11px] font-sans font-semibold text-primary/70 hover:bg-gray-50 hover:text-primary transition-colors shrink-0 shadow-2xs"
                >
                  {copiedField === item.id ? (
                    <>
                      <Check size={12} className="text-emerald-600" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
