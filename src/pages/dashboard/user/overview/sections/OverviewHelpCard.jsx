import { ArrowRight, ChevronRight, HelpCircle, MessageSquareMore } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Link } from "react-router";

const HELP_ITEM_STYLES = {
  message: {
    icon: MessageSquareMore,
    bg: "bg-[#eaf3ff]",
    color: "text-[#2b88eb]",
  },
  whatsapp: {
    icon: FaWhatsapp,
    bg: "bg-[#eafaf1]",
    color: "text-[#22c55e]",
  },
  help: {
    icon: HelpCircle,
    bg: "bg-[#f1f4f8]",
    color: "text-[#475569]",
  },
};

export const OverviewHelpCard = ({ help }) => {
  if (!help) return null;

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs">
      <h3 className="text-base font-bold tracking-tight text-[#0b1736] sm:text-lg">
        Need help?
      </h3>

      <div className="mt-3.5 flex flex-col gap-3">
        {(help.items || []).map(({ id, title, description, icon }) => {
          const config = HELP_ITEM_STYLES[icon] ?? HELP_ITEM_STYLES.help;
          const Icon = config.icon;

          return (
            <Link
              key={id}
              to={help.seeAllPath}
              className="group flex items-center justify-between gap-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.bg}`}
                >
                  <Icon size={18} className={config.color} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#0b1736] transition-colors group-hover:text-[#2b88eb]">
                    {title}
                  </p>
                  <p className="text-xs text-gray-400 font-normal leading-tight mt-0.5">
                    {description}
                  </p>
                </div>
              </div>

              <ChevronRight
                size={16}
                className="shrink-0 text-gray-300 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </Link>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        <Link
          to={help.seeAllPath}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#258bf5] transition-opacity hover:opacity-80 sm:text-sm"
        >
          <span>See all support options</span>
          <ArrowRight size={14} strokeWidth={2.2} />
        </Link>
      </div>
    </section>
  );
};
