import { Check, Copy, Info, Shield, X } from "lucide-react";
import { useState } from "react";

export const EsimDetailsModal = ({ isOpen, onClose, esimData }) => {
  const [copiedKey, setCopiedKey] = useState(null);

  if (!isOpen) return null;

  const handleCopy = (key, text) => {
    if (text) {
      navigator.clipboard?.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const techRows = [
    {
      label: "Phone Number",
      value: esimData.number || "+41 76 123 45 67",
      copyKey: "num",
    },
    { label: "Plan Name", value: esimData.planName || "NovaSky Plus" },
    {
      label: "Network Carrier",
      value: esimData.carrier || "NovaSky Switzerland (Sunrise 5G Network)",
    },
    { label: "Profile Status", value: "Active & Provisioned" },
    {
      label: "ICCID",
      value: esimData.iccid || "8944 1000 1234 5678 9012 3",
      copyKey: "iccid",
    },
    {
      label: "EID (Embedded Identity)",
      value: esimData.eid || "89049032000008882000123456789012",
      copyKey: "eid",
    },
    {
      label: "IMEI",
      value: esimData.imei || "35 123456 789012 3",
      copyKey: "imei",
    },
    {
      label: "APN (Access Point Name)",
      value: esimData.apn || "internet.novasky.ch",
      copyKey: "apn",
    },
    {
      label: "SM-DP+ Server",
      value: esimData.smdpAddress || "smdp.novasky.ch",
      copyKey: "smdp",
    },
    {
      label: "Roaming Configuration",
      value: esimData.roamingStatus || "Active (EU & US Included)",
    },
    { label: "PIN Code", value: "0000 (Default)" },
    { label: "PUK 1 / PUK 2", value: "84729103 / 19482019" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100">
              <Info size={18} />
            </span>
            <h3 className="text-base font-bold text-primary">
              Full eSIM Technical Details
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

        <div className="mt-4 max-h-96 overflow-y-auto pr-1 divide-y divide-gray-100 text-xs">
          {techRows.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
            >
              <span className="text-primary/55 font-medium">{item.label}</span>
              <div className="flex items-center gap-2 font-semibold text-primary">
                <span className="font-mono text-right break-all">
                  {item.value}
                </span>
                {item.copyKey && (
                  <button
                    type="button"
                    onClick={() => handleCopy(item.copyKey, item.value)}
                    className="shrink-0 rounded p-1 text-primary/35 hover:text-btnPrimary transition-colors"
                    aria-label={`Copy ${item.label}`}
                  >
                    {copiedKey === item.copyKey ? (
                      <Check size={13} className="text-emerald-600" />
                    ) : (
                      <Copy size={13} />
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-end border-t border-gray-100 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-btnPrimary px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-btnPrimary/90 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
