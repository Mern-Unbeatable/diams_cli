import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export const OverviewPromoCard = ({ promo }) => {
  if (!promo) return null;

  return (
    <section className="relative overflow-hidden rounded-xl bg-[#0040a8] p-5 text-white shadow-xs">
      <div className="relative z-10 max-w-[210px]">
        <h3 className="text-base font-bold leading-snug tracking-tight text-white sm:text-lg">
          {promo.title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-white/80">
          {promo.description}
        </p>

        <Link
          to={promo.path}
          className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#389BFF] px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#268df0] active:scale-[0.98]"
        >
          <span>{promo.cta}</span>
          <ArrowRight size={14} strokeWidth={2.2} />
        </Link>
      </div>

      <div className="pointer-events-none absolute -right-3 -bottom-5 z-0 w-44 select-none">
        <img
          src="/gb.png"
          alt="GB Promo Graphic"
          className="h-full w-full object-contain object-right-bottom"
        />
      </div>
    </section>
  );
};