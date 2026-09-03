import {
  Check,
  CheckCircle2,
  Copy,
  Key,
  Mail,
  MessageSquare,
  ShieldCheck,
  Smartphone,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

export const TwoFactorModal = ({ isOpen, onClose, isEnabled, onToggle }) => {
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState("app");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [copied, setCopied] = useState(false);
  const inputRefs = useRef([]);

  if (!isOpen) return null;

  const secretKey = "JBSWY3DPEHPK3PXP";

  const handleClose = () => {
    setStep(1);
    setOtp(["", "", "", "", "", ""]);
    onClose();
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(secretKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      inputRefs.current[5]?.focus();
    }
  };

  const handleFinish = () => {
    onToggle?.(true);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl border border-gray-100 bg-white p-6 sm:p-7 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-5 top-5 rounded-lg p-1.5 text-primary/40 hover:bg-gray-100 hover:text-primary transition-colors"
        >
          <X size={18} />
        </button>

        {/* STEP 1: Intro */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Top Icon Badge */}
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100/80">
              <ShieldCheck size={22} />
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-bold text-primary">
                Turn on two-factor authentication
              </h3>
              <p className="text-xs sm:text-sm text-primary/60 leading-relaxed">
                Add a second step when signing in so a stolen password isn't
                enough.
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-3 pt-1 text-xs sm:text-sm text-primary/75">
              <div className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-emerald-500 font-bold mt-0.5">
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <span>Blocks 99% of automated account-takeover attempts.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-emerald-500 font-bold mt-0.5">
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <span>You'll be asked for a code only on new devices.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-emerald-500 font-bold mt-0.5">
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <span>Recovery codes keep you covered if you lose your phone.</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary/70 hover:bg-gray-50 transition-colors"
              >
                Not now
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="rounded-xl bg-[#3b99fc] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-btnPrimary transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Choose Method */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Title & Subtitle */}
            <div className="space-y-1.5 pr-6">
              <h3 className="text-xl sm:text-2xl font-bold text-primary">
                Choose a verification method
              </h3>
              <p className="text-xs sm:text-sm text-primary/60 leading-relaxed">
                You can change this later at any time.
              </p>
            </div>

            {/* Method Cards */}
            <div className="space-y-3">
              {/* Option 1: Authenticator App */}
              <div
                onClick={() => setSelectedMethod("app")}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                  selectedMethod === "app"
                    ? "border-[#3b99fc] bg-[#eef7ff]/60 ring-1 ring-[#3b99fc]/30"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-primary">
                      Authenticator app
                    </h4>
                    <p className="text-[11px] sm:text-xs text-primary/50 mt-0.5">
                      Recommended · works offline
                    </p>
                  </div>
                </div>
                <div className="shrink-0">
                  {selectedMethod === "app" ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3b99fc] text-white">
                      <Check size={14} strokeWidth={3} />
                    </span>
                  ) : (
                    <span className="h-5 w-5 rounded-full border border-gray-300 block" />
                  )}
                </div>
              </div>

              {/* Option 2: Text Message */}
              <div
                onClick={() => setSelectedMethod("sms")}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                  selectedMethod === "sms"
                    ? "border-[#3b99fc] bg-[#eef7ff]/60 ring-1 ring-[#3b99fc]/30"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-primary">
                      Text message
                    </h4>
                    <p className="text-[11px] sm:text-xs text-primary/50 mt-0.5">
                      Code sent to ••• 4821
                    </p>
                  </div>
                </div>
                <div className="shrink-0">
                  {selectedMethod === "sms" ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3b99fc] text-white">
                      <Check size={14} strokeWidth={3} />
                    </span>
                  ) : (
                    <span className="h-5 w-5 rounded-full border border-gray-300 block" />
                  )}
                </div>
              </div>

              {/* Option 3: Email */}
              <div
                onClick={() => setSelectedMethod("email")}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                  selectedMethod === "email"
                    ? "border-[#3b99fc] bg-[#eef7ff]/60 ring-1 ring-[#3b99fc]/30"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-primary">
                      Email
                    </h4>
                    <p className="text-[11px] sm:text-xs text-primary/50 mt-0.5">
                      Code sent to a•••@company.com
                    </p>
                  </div>
                </div>
                <div className="shrink-0">
                  {selectedMethod === "email" ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3b99fc] text-white">
                      <Check size={14} strokeWidth={3} />
                    </span>
                  ) : (
                    <span className="h-5 w-5 rounded-full border border-gray-300 block" />
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary/70 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="rounded-xl bg-[#3b99fc] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-btnPrimary transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Scan & Verify */}
        {step === 3 && (
          <div className="space-y-6">
            {/* Title & Subtitle */}
            <div className="space-y-1.5 pr-6">
              <h3 className="text-xl sm:text-2xl font-bold text-primary">
                Scan and verify
              </h3>
              <p className="text-xs sm:text-sm text-primary/60 leading-relaxed">
                Scan the QR code in your authenticator app, then enter the
                6-digit code.
              </p>
            </div>

            {/* QR Area Container */}
            <div className="flex flex-col items-center justify-center rounded-2xl bg-[#f8fafc] p-6 text-center space-y-4 border border-gray-100">
              {/* QR Code Placeholder Graphic */}
              <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl bg-[#1e293b] shadow-inner p-3">
                <div className="grid grid-cols-4 gap-1.5 w-full h-full p-2 bg-[#0f172a] rounded-xl items-center justify-center">
                  <div className="bg-white rounded-xs h-full w-full" />
                  <div className="bg-sky-400 rounded-xs h-full w-full" />
                  <div className="bg-white rounded-xs h-full w-full" />
                  <div className="bg-[#1e293b] rounded-xs h-full w-full" />
                  <div className="bg-sky-400 rounded-xs h-full w-full" />
                  <div className="bg-white rounded-xs h-full w-full" />
                  <div className="bg-sky-400 rounded-xs h-full w-full" />
                  <div className="bg-white rounded-xs h-full w-full" />
                  <div className="bg-white rounded-xs h-full w-full" />
                  <div className="bg-[#1e293b] rounded-xs h-full w-full" />
                  <div className="bg-white rounded-xs h-full w-full" />
                  <div className="bg-sky-400 rounded-xs h-full w-full" />
                  <div className="bg-sky-400 rounded-xs h-full w-full" />
                  <div className="bg-white rounded-xs h-full w-full" />
                  <div className="bg-[#1e293b] rounded-xs h-full w-full" />
                  <div className="bg-white rounded-xs h-full w-full" />
                </div>
              </div>

              {/* Copy Key Button */}
              <button
                type="button"
                onClick={handleCopyKey}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-3.5 py-1.5 text-xs font-mono font-semibold text-primary/70 border border-gray-200 hover:bg-gray-50 transition-colors shadow-2xs"
              >
                <Copy size={13} className="text-primary/40" />
                <span>{copied ? "Copied!" : secretKey}</span>
              </button>
            </div>

            {/* 6 Digit OTP Inputs */}
            <div className="space-y-2">
              <div
                className="flex items-center justify-center gap-2 sm:gap-2.5"
                onPaste={handlePaste}
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="h-12 w-10 sm:h-13 sm:w-12 rounded-xl border border-gray-200 text-center text-lg font-bold text-primary focus:border-[#3b99fc] focus:outline-none focus:ring-2 focus:ring-[#3b99fc]/20 transition-all"
                  />
                ))}
              </div>
              <p className="text-center text-[11px] text-primary/40 pt-1">
                Demo code: 123456
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary/70 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleFinish}
                className="rounded-xl bg-[#3b99fc] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-btnPrimary transition-colors"
              >
                Verify & enable
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
