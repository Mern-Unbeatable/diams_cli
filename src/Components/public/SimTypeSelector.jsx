import { Check } from "lucide-react";
import { SIM_OPTIONS } from "@/config/configure";

const SimIllustration = ({ type }) => {
  if (type === "esim") {
    return (
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="relative h-[120px] w-[68px] rounded-xl border border-white/10 bg-linear-to-b from-[#0a2d5c] to-[#061528] shadow-lg">
          <div className="absolute inset-x-3 top-3 h-1.5 rounded-full bg-white/20" />
          <div className="absolute bottom-6 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-btnPrimary/20">
            <span className="text-lg text-textAccent">↓</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="relative h-[72px] w-[96px] rounded-md bg-white shadow-md">
        <div className="absolute left-2 top-2 h-10 w-12 rounded-sm bg-linear-to-br from-[#f0d060] to-[#b8860b]" />
        <div className="absolute right-0 top-0 h-3 w-3 rounded-bl-sm bg-[#061528]" />
      </div>
    </div>
  );
};

const SimTypeCard = ({ option, selected, onSelect }) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative flex w-full flex-col rounded-xl border p-4 text-left transition-colors sm:p-6 ${
        selected
          ? "border-btnPrimary bg-secondary"
          : "border-white/15 bg-secondary/40 hover:border-white/25"
      }`}
    >
      {selected ? (
        <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-btnPrimary">
          <Check size={14} strokeWidth={3} className="text-white" />
        </span>
      ) : (
        <span className="absolute right-4 top-4 h-6 w-6 rounded-full border-2 border-white/30" />
      )}

      <div className="h-28 rounded-lg bg-primary/50 p-3 sm:h-36 sm:p-4">
        <SimIllustration type={option.id} />
      </div>

      <h3 className="mt-4 text-base font-bold text-white sm:mt-5 sm:text-lg">
        {option.title}
      </h3>

      <ul className="mt-4 space-y-2.5">
        {option.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm text-white/90"
          >
            <Check
              size={15}
              strokeWidth={2.5}
              className="mt-0.5 shrink-0 text-textsecondary"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </button>
  );
};

const SimTypeSelector = ({ value, onChange }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {SIM_OPTIONS.map((option) => (
        <SimTypeCard
          key={option.id}
          option={option}
          selected={value === option.id}
          onSelect={() => onChange(option.id)}
        />
      ))}
    </div>
  );
};

export default SimTypeSelector;
