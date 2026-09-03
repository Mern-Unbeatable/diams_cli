import {
  ChevronRight,
  HelpCircle,
  MessageCircle,
  HelpCircle as QuestionIcon,
} from "lucide-react";
import { Link } from "react-router";

export const NeedHelpCard = () => {
  const links = [
    {
      id: "help-center",
      title: "Help Center",
      subtitle: "Find Answers",
      icon: <HelpCircle size={16} />,
      to: "/dashboard/user/support",
    },
    {
      id: "contact-us",
      title: "Contact Us",
      subtitle: "Chat with an advisor",
      icon: <MessageCircle size={16} />,
      to: "/dashboard/user/support",
    },
    {
      id: "faq",
      title: "FAQ",
      subtitle: "View frequently asked questions",
      icon: <QuestionIcon size={16} />,
      to: "/dashboard/user/support",
    },
  ];

  return (
    <section className="rounded-xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-3">
      <h3 className="text-sm sm:text-base font-bold text-primary">
        Need Help?
      </h3>

      <div className="divide-y divide-gray-100">
        {links.map((item) => (
          <Link
            key={item.id}
            to={item.to}
            className="flex items-center gap-3 py-3 first:pt-1 last:pb-0 hover:opacity-80 transition-opacity"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-50 text-btnPrimary border border-sky-100">
              {item.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-primary">{item.title}</p>
              <p className="text-[11px] text-primary/45 truncate mt-0.5">
                {item.subtitle}
              </p>
            </div>
            <ChevronRight size={14} className="text-primary/30 shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
};
