import { Link } from "react-router";
import { Globe, Infinity, Link2 } from "lucide-react";
import { USER_OVERVIEW } from "@/config/userOverview";

const OFFER_ICONS = {
  link: Link2,
  globe: Globe,
  infinity: Infinity,
};

const OFFER_THEMES = {
  "data-pack": {
    cardBg: "bg-[#eefcf4]",
    iconColor: "text-[#22c55e]",
    btnBg: "bg-[#e1f8ec]",
    btnColor: "text-[#16a34a]",
  },
  roaming: {
    cardBg: "bg-[#f0f7ff]",
    iconColor: "text-[#258bf5]",
    btnBg: "bg-[#e0efff]",
    btnColor: "text-[#258bf5]",
  },
  calls: {
    cardBg: "bg-[#faf5ff]",
    iconColor: "text-[#a855f7]",
    btnBg: "bg-[#f3e8ff]",
    btnColor: "text-[#a855f7]",
  },
};

const ExclusiveOffersSection = () => {
  const { offers } = USER_OVERVIEW;

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between">
        <h3 className="text-xl sm:text-[22px] font-bold tracking-tight text-[#0b1736]">
          Exclusive offers for you
        </h3>
        <Link
          to={offers.seeAllPath}
          className="inline-flex items-center gap-1 text-sm sm:text-[15px] font-semibold text-[#258bf5] transition-opacity hover:opacity-80"
        >
          <span>See all</span>
          <span className="text-base leading-none">→</span>
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {offers.items.map((offer) => {
          const Icon = OFFER_ICONS[offer.icon] ?? Link2;
          const theme = OFFER_THEMES[offer.id] ?? {
            cardBg: "bg-[#f8fafc]",
            iconColor: "text-blue-500",
            btnBg: "bg-blue-50",
            btnColor: "text-blue-600",
          };

          return (
            <article
              key={offer.id}
              className={`flex min-h-[145px] flex-col justify-between rounded-2xl p-5 ${theme.cardBg} transition-all`}
            >
              <div className="flex items-start gap-3.5">
                <Icon
                  size={22}
                  className={`mt-0.5 shrink-0 ${theme.iconColor}`}
                  strokeWidth={2}
                />
                <div>
                  <p className="text-[15px] font-bold text-[#0b1736] leading-tight sm:text-base">
                    {offer.title}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400 font-normal sm:text-[13px]">
                    {offer.subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm font-bold text-[#0b1736] sm:text-[15px]">
                  {offer.price}
                </span>
                <button
                  type="button"
                  className={`rounded-lg px-3.5 py-1 text-xs font-semibold sm:text-[13px] ${theme.btnBg} ${theme.btnColor} transition-opacity hover:opacity-80 active:scale-95`}
                >
                  Add
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ExclusiveOffersSection;
