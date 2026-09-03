import { BookOpen, CheckCircle2, Smartphone, X } from "lucide-react";
import { useState } from "react";

export const EsimGuideModal = ({ isOpen, onClose }) => {
  const [platform, setPlatform] = useState("ios");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100">
              <BookOpen size={18} />
            </span>
            <h3 className="text-base font-bold text-primary">
              Step-by-Step Installation Guide
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

        {/* Platform Toggle */}
        <div className="mt-4 flex gap-2 rounded-xl bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => setPlatform("ios")}
            className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition-all ${
              platform === "ios"
                ? "bg-white text-primary shadow-xs"
                : "text-primary/60 hover:text-primary"
            }`}
          >
            Apple iOS (iPhone)
          </button>
          <button
            type="button"
            onClick={() => setPlatform("android")}
            className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition-all ${
              platform === "android"
                ? "bg-white text-primary shadow-xs"
                : "text-primary/60 hover:text-primary"
            }`}
          >
            Android (Samsung, Pixel)
          </button>
        </div>

        {/* Steps List */}
        <div className="mt-4 space-y-3 text-xs">
          {platform === "ios" ? (
            <div className="space-y-3">
              {[
                {
                  step: 1,
                  title: "Open Settings",
                  desc: "Go to Settings > Cellular (or Mobile Service) on your iPhone.",
                },
                {
                  step: 2,
                  title: "Tap Add eSIM",
                  desc: "Select 'Add eSIM' or 'Set Up Cellular'.",
                },
                {
                  step: 3,
                  title: "Scan the QR Code",
                  desc: "Select 'Use QR Code' and point your iPhone camera at the QR code on this page.",
                },
                {
                  step: 4,
                  title: "Confirm Activation",
                  desc: "Follow the prompts, set your line label (Primary/Secondary), and enable cellular data.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-btnPrimary text-xs font-bold text-white">
                    {item.step}
                  </span>
                  <div>
                    <h5 className="font-bold text-primary">{item.title}</h5>
                    <p className="text-[11px] text-primary/60 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {[
                {
                  step: 1,
                  title: "Open Settings",
                  desc: "Go to Settings > Connections / Network & internet > SIMs.",
                },
                {
                  step: 2,
                  title: "Add Mobile Plan",
                  desc: "Tap 'Add SIM' or '+' next to SIMs > 'Download a SIM instead?'.",
                },
                {
                  step: 3,
                  title: "Scan QR Code",
                  desc: "Aim your camera at the QR code shown on your NovaSky dashboard.",
                },
                {
                  step: 4,
                  title: "Enable eSIM",
                  desc: "Confirm download and enable your new NovaSky eSIM profile.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-btnPrimary text-xs font-bold text-white">
                    {item.step}
                  </span>
                  <div>
                    <h5 className="font-bold text-primary">{item.title}</h5>
                    <p className="text-[11px] text-primary/60 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-end border-t border-gray-100 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-btnPrimary px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-btnPrimary/90 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
