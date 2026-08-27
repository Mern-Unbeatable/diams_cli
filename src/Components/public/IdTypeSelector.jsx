import { Check, Car, CreditCard } from "lucide-react";
import { ID_TYPES } from "@/config/verification";

const ID_ICONS = {
  "id-card": CreditCard,
  car: Car,
};

const IdTypeCard = ({ option, selected, onSelect }) => {
  const Icon = ID_ICONS[option.icon];

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative flex w-full flex-col items-start rounded-xl border p-5 text-left transition-colors sm:p-6 ${
        selected
          ? "border-btnPrimary bg-btnPrimary/10"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      {selected ? (
        <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-btnPrimary">
          <Check size={14} strokeWidth={3} className="text-white" />
        </span>
      ) : (
        <span className="absolute right-4 top-4 h-6 w-6 rounded-full border-2 border-gray-300" />
      )}


      <div
        className={`mt-4 flex h-12 w-12 items-center justify-center rounded-lg ${
          selected ? "bg-btnPrimary/15" : "bg-gray-100"
        }`}
      >
        <Icon
          size={24}
          strokeWidth={1.75}
          className={selected ? "text-btnPrimary" : "text-primary/70"}
        />
      </div>

      <h3
        className={`mt-4 text-base font-bold sm:text-lg ${
          selected ? "text-btnPrimary" : "text-primary"
        }`}
      >
        {option.title}
      </h3>
    </button>
  );
};

const IdTypeSelector = ({ value, onChange }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {ID_TYPES.map((option) => (
        <IdTypeCard
          key={option.id}
          option={option}
          selected={value === option.id}
          onSelect={() => onChange(option.id)}
        />
      ))}
    </div>
  );
};

export default IdTypeSelector;
