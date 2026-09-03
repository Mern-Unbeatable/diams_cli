import { TrendingUp, Clock, Check } from "lucide-react";
import { COMMISSION_STAT_CARDS } from "./collaboratorCommissionData";

const renderIcon = (type) => {
  switch (type) {
    case "dollar":
      return <span className="text-xs font-bold">$</span>;
    case "trending":
      return <TrendingUp className="h-3.5 w-3.5" />;
    case "clock":
      return <Clock className="h-3.5 w-3.5" />;
    case "check":
      return <Check className="h-3.5 w-3.5 stroke-[2.5]" />;
    default:
      return null;
  }
};

const CollaboratorCommissionStatCards = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {COMMISSION_STAT_CARDS.map((card) => (
        <div
          key={card.id}
          className="rounded-xl border border-slate-100 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all hover:border-slate-200"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              {card.label}
            </span>
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-lg ${card.iconBg}`}
            >
              {renderIcon(card.iconType)}
            </div>
          </div>

          <div className="mt-3 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollaboratorCommissionStatCards;
