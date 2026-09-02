import {
  ArrowRight,
  ArrowRightLeft,
  CheckCircle2,
  QrCode,
  Smartphone,
  Wifi,
  X,
} from "lucide-react";
import { useState } from "react";

export const TransferEsimModal = ({ isOpen, onClose, esimData }) => {
  const [deviceType, setDeviceType] = useState("ios");
  const [step, setStep] = useState(1);
  const [isTransferring, setIsTransferring] = useState(false);

  if (!isOpen) return null;

  const handleStartTransfer = () => {
    setIsTransferring(true);
    setTimeout(() => {
      setIsTransferring(false);
      setStep(3);
    }, 1800);
  };

  const handleReset = () => {
    setStep(1);
    setIsTransferring(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100">
              <ArrowRightLeft size={18} />
            </span>
            <h3 className="text-base font-bold text-primary">
              Transfer eSIM to Another Device
            </h3>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg p-1.5 text-primary/40 hover:bg-gray-100 hover:text-primary transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="mt-4 flex items-center justify-center gap-2 border-b border-gray-100 pb-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  step === s
                    ? "bg-btnPrimary text-white shadow-xs"
                    : step > s
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-primary/40"
                }`}
              >
                {step > s ? "✓" : s}
              </div>
              <span className="text-[11px] font-semibold text-primary/60">
                {s === 1 ? "Select OS" : s === 2 ? "Pairing" : "Complete"}
              </span>
              {s < 3 && <div className="h-0.5 w-6 bg-gray-200" />}
            </div>
          ))}
        </div>

        {/* Step 1: Device Selection */}
        {step === 1 && (
          <div className="mt-4 space-y-4 text-xs">
            <p className="text-primary/70">
              Select the operating system of your destination smartphone or tablet:
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "ios", label: "Apple iPhone", desc: "iOS 16.0 or newer" },
                { id: "android", label: "Android", desc: "Samsung, Google Pixel, etc." },
              ].map((dev) => (
                <button
                  key={dev.id}
                  type="button"
                  onClick={() => setDeviceType(dev.id)}
                  className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all ${
                    deviceType === dev.id
                      ? "border-btnPrimary bg-sky-50/50 shadow-sm"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                >
                  <Smartphone
                    size={22}
                    className={
                      deviceType === dev.id ? "text-btnPrimary" : "text-primary/50"
                    }
                  />
                  <span className="mt-2 text-xs font-bold text-primary">
                    {dev.label}
                  </span>
                  <span className="text-[10px] text-primary/50 mt-0.5">
                    {dev.desc}
                  </span>
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-3.5 space-y-2 text-[11px] text-primary/70">
              <div className="flex items-center gap-2 font-bold text-primary">
                <Wifi size={14} className="text-btnPrimary" />
                <span>Pre-flight checklist</span>
              </div>
              <ul className="list-disc list-inside space-y-1">
                <li>Keep both phones near each other</li>
                <li>Ensure Bluetooth and Wi-Fi are activated</li>
                <li>Screen lock passcode is known</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-primary/70 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-btnPrimary px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-btnPrimary/90 transition-colors"
              >
                <span>Continue</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Confirmation & Pairing */}
        {step === 2 && (
          <div className="mt-4 space-y-4 text-xs">
            <div className="rounded-xl border border-sky-100 bg-sky-50/60 p-4 space-y-2">
              <h5 className="font-bold text-primary text-xs">
                Ready to transfer profile:
              </h5>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-primary/50">Plan:</span>{" "}
                  <strong className="text-primary">{esimData?.planName}</strong>
                </div>
                <div>
                  <span className="text-primary/50">Number:</span>{" "}
                  <strong className="text-primary">{esimData?.number}</strong>
                </div>
              </div>
            </div>

            <div className="text-center py-4 space-y-2">
              <p className="text-xs text-primary/70 max-w-sm mx-auto">
                On your new device, go to <strong>Settings &gt; Cellular &gt; Add eSIM &gt; Transfer from Nearby Device</strong>.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={isTransferring}
                className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-primary/70 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleStartTransfer}
                disabled={isTransferring}
                className="inline-flex items-center gap-1.5 rounded-xl bg-btnPrimary px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-btnPrimary/90 transition-colors"
              >
                {isTransferring ? (
                  <span>Syncing with new device...</span>
                ) : (
                  <span>Authorize Transfer</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="mt-6 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
              <CheckCircle2 size={28} />
            </div>
            <div>
              <h4 className="text-base font-bold text-primary">
                eSIM Transfer Initiated!
              </h4>
              <p className="mt-1 text-xs text-primary/60 max-w-sm mx-auto">
                Your eSIM is now downloading to your new smartphone. Please accept the carrier prompt on your target phone screen.
              </p>
            </div>
            <div className="pt-3">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center rounded-xl bg-btnPrimary px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-btnPrimary/90 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
