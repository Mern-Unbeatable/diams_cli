import { Link } from "react-router";
import { ChevronRight, HelpCircle, MessageCircle, Phone } from "lucide-react";
import { USER_USAGE } from "@/config/userUsage";

export const UsageHelpWidget = () => {
  const { helpLinks } = USER_USAGE;

  return (
    <section className="space-y-3 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h3 className="text-sm font-bold text-primary">Need help?</h3>
      <ul className="divide-y divide-gray-100">
        {helpLinks.map((item) => (
          <li key={item.id}>
            <Link
              to="/dashboard/user/support"
              className="flex items-center gap-3 py-3 transition-colors hover:opacity-80"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-primary/70">
                {item.icon === "chat" && <MessageCircle size={16} />}
                {item.icon === "help" && <HelpCircle size={16} />}
                {item.icon === "phone" && <Phone size={16} />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-primary">{item.title}</p>
                <p className="mt-0.5 truncate text-[10px] text-primary/45">
                  {item.subtitle}
                </p>
              </div>
              <ChevronRight size={14} className="shrink-0 text-primary/30" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UsageHelpWidget;
