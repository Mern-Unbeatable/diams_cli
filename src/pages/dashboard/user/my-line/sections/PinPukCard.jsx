import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

const MaskedField = ({ label, value }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-xs text-primary/55">{label}</p>
        <p className="mt-1 font-mono text-sm font-semibold text-primary">
          {visible ? value : "••••"}
        </p>
      </div>
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        className="rounded-md p-1.5 text-primary/45 transition-colors hover:bg-gray-50 hover:text-primary"
        aria-label={visible ? `Hide ${label}` : `Show ${label}`}
      >
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
};

export const PinPukCard = () => (
  <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
    <h3 className="text-base font-bold text-primary">PIN & PUK</h3>
    <div className="mt-4 space-y-4">
      <MaskedField label="SIM PIN" value="1234" />
      <MaskedField label="PUK Code" value="87654321" />
    </div>
    <button
      type="button"
      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-btnPrimary py-3 text-sm font-semibold text-btnPrimary transition-colors hover:bg-[#eef7ff]"
    >
      <Lock size={15} />
      Change PIN / PUK
    </button>
  </section>
);

export default PinPukCard;
