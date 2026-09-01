import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export const OverviewPromoCard = ({ promo }) => {
  if (!promo) return null;

  return (
    <section className="relative overflow-hidden rounded-xl bg-[#0040a8] p-6 text-white shadow-sm">
      <div className="relative z-10 max-w-[270px]">
        <h3 className="text-xl sm:text-[22px] font-bold leading-snug tracking-tight text-white">
          {promo.title}
        </h3>
        <p className="mt-2 text-sm text-white/80 leading-relaxed">
          {promo.description}
        </p>

        <Link
          to={promo.path}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#389BFF] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#268df0] active:scale-[0.98]"
        >
          <span>{promo.cta}</span>
          <ArrowRight size={16} strokeWidth={2.2} />
        </Link>
      </div>

      <div className="pointer-events-none absolute -right-4 -bottom-6 z-0 w-48 sm:w-56 select-none">
        <img
          src="/gb.png"
          alt="GB Promo Graphic"
          className="h-full w-full object-contain object-right-bottom"
        />
      </div>
    </section>
  );
};