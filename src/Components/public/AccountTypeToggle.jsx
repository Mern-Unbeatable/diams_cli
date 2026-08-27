import { Building2, User } from "lucide-react";
import { ACCOUNT_TYPES } from "@/config/personalInfo";

const TYPE_ICONS = {
  user: User,
  building: Building2,
};

const AccountTypeToggle = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {ACCOUNT_TYPES.map(({ id, label, description, icon }) => {
        const Icon = TYPE_ICONS[icon];
        const selected = value === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={selected}
            className={`flex flex-col items-center gap-2 rounded-xl border px-4 py-5 transition-colors sm:gap-3 sm:py-6 ${
              selected
                ? "border-btnPrimary bg-btnPrimary/10"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <Icon
              size={28}
              strokeWidth={1.75}
              className={selected ? "text-btnPrimary" : "text-primary"}
            />
            <span
              className={`text-sm font-bold sm:text-base ${
                selected ? "text-btnPrimary" : "text-primary"
              }`}
            >
              {label}
            </span>
            <span
              className={`text-xs sm:text-sm ${
                selected ? "text-btnPrimary/80" : "text-primary/55"
              }`}
            >
              {description}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default AccountTypeToggle;
