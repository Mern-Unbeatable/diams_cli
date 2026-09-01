import { ArrowRight, ChevronRight, HelpCircle, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Link } from "react-router";

const HELP_ICONS = {
  message: MessageCircle,
  whatsapp: FaWhatsapp,
  help: HelpCircle,
};

export const OverviewHelpCard = ({ help }) => {
  if (!help) return null;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
      <h3 className="text-sm font-bold text-primary">Need Help?</h3>
      <ul className="mt-3 divide-y divide-gray-100">
        {(help.items || []).map(({ id, title, description, icon }) => {
          const Icon = HELP_ICONS[icon] ?? HelpCircle;

          return (
            <li key={id}>
              <Link
                to={help.seeAllPath}
                className="flex items-center gap-3 py-3 transition-colors hover:opacity-80"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50">
                  <Icon size={17} className="text-primary/65" />
                </span>
                <span className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-primary">{title}</p>
                  <p className="text-xs text-primary/55">{description}</p>
                </span>
                <ChevronRight size={16} className="shrink-0 text-primary/35" />
              </Link>
            </li>
          );
        })}
      </ul>
      <Link
        to={help.seeAllPath}
        className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-btnPrimary hover:opacity-80"
      >
        See all support options
        <ArrowRight size={14} />
      </Link>
    </section>
  );
};
