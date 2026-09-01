import { Link } from "react-router";
import { BarChart3, ChevronRight, FileText, MessageCircle } from "lucide-react";
import { USER_PLANS_OPTIONS } from "@/config/userPlansOptions";

const HELP_ICONS = {
  chart: BarChart3,
  doc: FileText,
  chat: MessageCircle,
};

export const NeedHelpWidget = () => {
  const { needHelp } = USER_PLANS_OPTIONS;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h3 className="text-base font-bold text-primary">Need help?</h3>
      <ul className="mt-3 divide-y divide-gray-100">
        {needHelp.map((item) => {
          const Icon = HELP_ICONS[item.icon] ?? MessageCircle;

          return (
            <li key={item.id}>
              <Link
                to="/dashboard/user/support"
                className="flex items-center gap-3 py-3.5 transition-colors hover:opacity-80"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-50/50 bg-[#eef7ff] text-btnPrimary">
                  <Icon size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-primary">
                    {item.title}
                  </p>
                  <p className="mt-0.5 truncate text-[10px] text-primary/45">
                    {item.description}
                  </p>
                </div>
                <ChevronRight size={15} className="shrink-0 text-primary/35" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default NeedHelpWidget;
