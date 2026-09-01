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
    <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-xs">
      <h3 className="text-xl font-bold tracking-tight text-[#0b1736]">
        Quick Actions
      </h3>
      <div className="mt-6 flex flex-col gap-4">
        {quickActions.map(({ id, label, icon, path }) => {
          const Icon = QUICK_ACTION_ICONS[icon] ?? BarChart3;

          return (
            <Link
              key={id}
              to={path}
              className="group flex items-center justify-between gap-3 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf3ff]">
                  <Icon size={18} className="text-[#258bf5]" strokeWidth={2} />
                </span>
                <span className="text-sm font-semibold text-[#0b1736] transition-colors group-hover:text-[#258bf5]">
                  {label}
                </span>
              </div>
              <ChevronRight
                size={18}
                className="shrink-0 text-gray-300 transition-transform group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActionsCard;
