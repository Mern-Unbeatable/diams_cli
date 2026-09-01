import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export const OverviewPromoCard = ({ promo }) => {
  if (!promo) return null;

  return (
    <section className="overflow-hidden rounded-2xl bg-linear-to-br from-[#39a1fd] to-[#2b8de8] p-5 text-white">
      <h3 className="text-lg font-bold leading-snug">{promo.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/85">
        {promo.description}
      </p>
      <Link
        to={promo.path}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/30"
      >
        {promo.cta}
        <ArrowRight size={16} />
      </Link>
      <div className="mt-5 flex justify-end">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-3xl">
          🛟
        </div>
      </div>
    </section>
  );
};
