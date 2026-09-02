import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

const MaskedField = ({ label, value, defaultDots = "••••" }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm font-normal text-gray-400">{label}</span>
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm font-bold tracking-widest text-[#0b1736]">
          {visible ? value : defaultDots}
        </span>
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="text-gray-400 transition-colors hover:text-[#258bf5]"
          aria-label={visible ? `Hide ${label}` : `Show ${label}`}
        >
          {visible ? <EyeOff size={18} strokeWidth={1.8} /> : <Eye size={18} strokeWidth={1.8} />}
        </button>
      </div>
    </div>
  );
};

export const PinPukCard = () => (
  <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-xs">
    <h3 className="text-xl font-bold tracking-tight text-[#0b1736]">PIN & PUK</h3>
    <div className="mt-6 space-y-4">
      <MaskedField label="SIM PIN" value="1234" defaultDots="...." />
      <MaskedField label="PUK Code" value="87654321" defaultDots="........" />
    </div>
    <button
      type="button"
      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white py-3 text-sm font-semibold text-[#258bf5] transition-colors hover:bg-blue-50/50"
    >
      <Lock size={15} strokeWidth={2} />
      <span>Change PIN / PUK</span>
    </button>
  </section>
);

export default PinPukCard;
