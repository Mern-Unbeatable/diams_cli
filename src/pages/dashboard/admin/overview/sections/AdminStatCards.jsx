import { STAT_CARDS } from "./overviewData";

const AdminStatCards = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STAT_CARDS.map((card) => (
        <div
          key={card.id}
          className="flex flex-col justify-between rounded-xl border border-slate-100 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-shadow duration-200 hover:shadow-md"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-slate-500 sm:text-[13px]">
              {card.title}
            </span>
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${card.badgeStyle}`}
            >
              {card.badge}
            </span>
          </div>
          <div className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStatCards;
