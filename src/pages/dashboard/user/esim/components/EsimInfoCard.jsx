import { ArrowRight, Check, Copy } from "lucide-react";
import { useState } from "react";

export const EsimInfoCard = ({ esimData, onOpenDetailsModal }) => {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (key, val) => {
    if (val) {
      navigator.clipboard?.writeText(val);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const infoRows = [
    {
      label: "Status",
      value: (
        <span className="inline-flex items-center gap-1.5 font-bold text-emerald-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Activated
        </span>
      ),
    },
    { label: "Type", value: "eSIM" },
    { label: "Number", value: esimData.number || "+41 76 123 45 67", copyKey: "num" },
    { label: "Plan", value: esimData.planName || "NovaSky Plus" },
    { label: "IMEI", value: esimData.imei || "35 123456 789012 3", copyKey: "imei" },
    { label: "ICCID", value: esimData.iccid || "8944 1000 1234 5678 9012 3", copyKey: "iccid" },
  ];

  return (
    <section className="rounded-2xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-4">
      <h3 className="text-sm sm:text-base font-bold text-primary">
        eSIM Information
      </h3>

      <div className="divide-y divide-gray-100 text-xs">
        {infoRows.map((row, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
          >
            <span className="text-primary/55 font-medium">{row.label}</span>
            <div className="flex items-center gap-1.5 font-semibold text-primary">
              {row.value}
              {row.copyKey && (
                <button
                  type="button"
                  onClick={() => handleCopy(row.copyKey, row.value)}
                  className="rounded p-1 text-primary/35 hover:text-btnPrimary transition-colors"
                  aria-label={`Copy ${row.label}`}
                >
                  {copiedKey === row.copyKey ? (
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

      <div className="pt-2 border-t border-gray-100">
        <button
          type="button"
          onClick={onOpenDetailsModal}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-btnPrimary hover:underline"
        >
          <span>More information</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
};
