import { RECENT_ACTIVITIES } from "./overviewData";

const AdminRecentActivityCard = () => {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      <div>
        <h2 className="text-base font-bold tracking-tight text-slate-900">
          Recent Activity
        </h2>
        <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
          Registrations, activations, payments and support tickets. Each row
          opens the related detail.
        </p>

        <div className="mt-7 space-y-6">
          {RECENT_ACTIVITIES.map((act) => (
            <div key={act.id} className="group cursor-pointer">
              <h3 className="text-sm font-bold text-slate-900 transition-colors group-hover:text-sky-600">
                {act.title}
              </h3>
              <p className="mt-0.5 text-xs text-slate-500">{act.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminRecentActivityCard;
