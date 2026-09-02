import { useNavigate } from "react-router";
import { COLLABORATOR_QUICK_ACTIONS } from "./collaboratorOverviewData";

const CollaboratorQuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-bold tracking-tight text-slate-900 sm:text-base">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {COLLABORATOR_QUICK_ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => navigate(action.href)}
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                action.isPrimary
                  ? "bg-sky-500 text-white shadow-sm hover:bg-sky-600 active:scale-[0.98]"
                  : "border border-slate-200/90 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CollaboratorQuickActions;
