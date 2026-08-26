import { Check } from "lucide-react";

const NumberOptionCard = ({ selected, onSelect, icon: Icon, title, description }) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors sm:gap-4 sm:p-5 ${
        selected
          ? "border-btnPrimary bg-secondary"
          : "border-white/15 bg-secondary/50 hover:border-white/25"
      }`}
    >
      {selected ? (
        <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-btnPrimary">
          <Check size={14} strokeWidth={3} className="text-white" />
        </span>
      ) : (
        <span className="absolute right-4 top-4 h-6 w-6 rounded-full border-2 border-white/30" />
      )}

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary">
        <Icon size={22} strokeWidth={1.75} className="text-textsecondary" />
      </div>

      <div className="min-w-0 pr-8">
        <h3 className="text-sm font-bold text-white sm:text-base">{title}</h3>
        <p className="mt-1 text-xs leading-snug text-white/70 sm:text-sm">{description}</p>
      </div>
    </button>
  );
};

export default NumberOptionCard;
