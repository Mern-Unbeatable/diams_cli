import { Star } from "lucide-react";
import { Link } from "react-router";

export const OverviewPremiumCard = ({ premium }) => {
  if (!premium) return null;

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs">
      <div className="flex items-start gap-3.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef7ff]">
          <Star size={20} className="text-[#258bf5]" fill="currentColor" />
        </span>
        <div>
          <p className="text-[15px] font-bold text-[#0b1736]">{premium.title}</p>
          <p className="mt-0.5 text-xs text-gray-400">{premium.description}</p>
          <Link
            to={premium.path}
            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#258bf5] transition-opacity hover:opacity-80"
          >
            <span>{premium.linkLabel}</span>
            <span className="text-sm leading-none">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
