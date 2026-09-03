import { Link } from "react-router";
import { ChevronRight, Headset, HelpCircle, MessageCircle } from "lucide-react";
import { USER_MY_LINE } from "@/config/userMyLine";

const HELP_ICONS = {
  message: MessageCircle,
  help: HelpCircle,
  headset: Headset,
};

export const HelpSupportCard = () => {
  const { help } = USER_MY_LINE;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <h3 className="text-base font-bold text-primary">Help & Support</h3>
      <ul className="mt-3 divide-y divide-gray-100">
        {help.items.map(({ id, title, description, icon }) => {
          const Icon = HELP_ICONS[icon] ?? HelpCircle;

          return (
            <li key={id}>
              <Link
                to={help.seeAllPath}
                className="flex items-center gap-3 py-3 transition-colors hover:opacity-80"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef7ff]">
                  <Icon size={17} className="text-btnPrimary" />
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
    </section>
  );
};

export default HelpSupportCard;
