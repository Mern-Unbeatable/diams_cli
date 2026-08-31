import { Link } from "react-router";
import { ArrowRight, Globe, Infinity, Link2 } from "lucide-react";
import { USER_OVERVIEW } from "@/config/userOverview";

const OFFER_ICONS = {
  link: Link2,
  globe: Globe,
  infinity: Infinity,
};

const ExclusiveOffersSection = () => {
  const { offers } = USER_OVERVIEW;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-base font-bold text-primary">Exclusive offers for you</h3>
        <Link
          to={offers.seeAllPath}
          className="inline-flex items-center gap-1 text-sm font-semibold text-btnPrimary hover:opacity-80"
        >
          See all
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {offers.items.map((offer) => {
          const Icon = OFFER_ICONS[offer.icon] ?? Link2;

          return (
            <article
              key={offer.id}
              className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div
                    className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${offer.iconBg}`}
                  >
                    <Icon size={18} className={offer.iconColor} />
                  </div>
                  <p className="font-bold text-primary">{offer.title}</p>
                  <p className="mt-0.5 text-sm text-primary/55">{offer.subtitle}</p>
                </div>
                <p className="text-sm font-bold text-primary">{offer.price}</p>
              </div>
              <button
                type="button"
                className="mt-4 w-full rounded-lg border border-gray-200 py-2 text-sm font-semibold text-primary transition-colors hover:bg-gray-50"
              >
                Add
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ExclusiveOffersSection;
