import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router";

export const OverviewPremiumCard = ({ premium }) => {
  if (!premium) return null;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eef7ff]">
          <Star size={24} className="text-btnPrimary" fill="currentColor" />
        </span>
        <div>
          <p className="font-bold text-primary">{premium.title}</p>
          <p className="mt-0.5 text-sm text-primary/55">{premium.description}</p>
          <Link
            to={premium.path}
            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-btnPrimary hover:opacity-80"
          >
            {premium.linkLabel}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};
