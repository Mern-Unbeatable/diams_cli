import { Link } from "react-router";
import { BarChart3, ChevronRight, FileText, Plus } from "lucide-react";
import { USER_MY_LINE } from "@/config/userMyLine";

const QUICK_ACTION_ICONS = {
  barChart: BarChart3,
  plus: Plus,
  file: FileText,
};

export const QuickActionsCard = () => {
  const { quickActions } = USER_MY_LINE;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h3 className="text-base font-bold text-primary">Quick Actions</h3>
      <ul className="mt-3 divide-y divide-gray-100">
        {quickActions.map(({ id, label, icon, path }) => {
          const Icon = QUICK_ACTION_ICONS[icon] ?? BarChart3;

          return (
            <li key={id}>
              <Link
                to={path}
                className="flex items-center gap-3 py-3 transition-colors hover:opacity-80"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef7ff]">
                  <Icon size={17} className="text-btnPrimary" />
                </span>
                <span className="flex-1 text-sm font-medium text-primary">{label}</span>
                <ChevronRight size={16} className="text-primary/35" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default QuickActionsCard;
