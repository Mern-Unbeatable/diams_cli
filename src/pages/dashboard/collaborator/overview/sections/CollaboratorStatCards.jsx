import { Link } from "react-router";
import { COLLABORATOR_STAT_CARDS } from "./collaboratorOverviewData";

const CollaboratorStatCards = () => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
      {COLLABORATOR_STAT_CARDS.map((card) => {
        const Icon = card.icon;
        return (
          <Link
            key={card.id}
            to={card.path ?? "#"}
            className="flex flex-col justify-between rounded-xl border border-slate-100 bg-white p-4.5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md active:translate-y-0 sm:p-5"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg}`}
            >
              <Icon className="h-5 w-5" />
            </div>

            <div className="mt-4">
              <span className="block text-xs font-medium text-slate-500">
                {card.title}
              </span>
              <div className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {card.value}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CollaboratorStatCards;
