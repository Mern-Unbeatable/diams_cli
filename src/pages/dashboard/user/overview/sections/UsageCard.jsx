import { Link } from "react-router";
import { ArrowRight, Clock3 } from "lucide-react";
import { USER_OVERVIEW } from "@/config/userOverview";

const UsageCard = () => {
  const { usage } = USER_OVERVIEW;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-bold text-primary">My usage</h3>
        <Link
          to={usage.detailsPath}
          className="inline-flex items-center gap-1 text-sm font-semibold text-btnPrimary hover:opacity-80"
        >
          Details
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="mt-5 space-y-5">
        {usage.items.map((item) => (
          <div key={item.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-primary">{item.label}</p>
                <p className="mt-0.5 text-xs text-primary/55">{item.remainingLabel}</p>
              </div>
              <p className="text-sm font-bold text-primary">{item.value}</p>
            </div>
            <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full ${item.progressColor}`}
                style={{ width: `${item.progress}%` }}
              />
            </div>
            <p className="mt-1.5 text-xs text-primary/50">{item.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-[#eef7ff] px-3.5 py-3">
        <Clock3 size={16} className="mt-0.5 shrink-0 text-btnPrimary" />
        <p className="text-xs leading-relaxed text-primary/70">{usage.renewMessage}</p>
      </div>
    </section>
  );
};

export default UsageCard;
