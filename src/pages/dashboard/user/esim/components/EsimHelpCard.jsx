import { BookOpen, ChevronRight, HelpCircle, MessageSquare } from "lucide-react";
import { Link } from "react-router";

export const EsimHelpCard = ({ onOpenGuide, onOpenFaq }) => {
  const helpItems = [
    {
      id: "guide",
      title: "Installation Guide",
      subtitle: "View the step-by-step guide",
      icon: <BookOpen size={16} />,
      onClick: onOpenGuide,
    },
    {
      id: "faq",
      title: "Frequently Asked Questions",
      subtitle: "Find answers to your questions",
      icon: <HelpCircle size={16} />,
      onClick: onOpenFaq,
    },
    {
      id: "support",
      title: "Contact Support",
      subtitle: "We're here to help you",
      icon: <MessageSquare size={16} />,
      to: "/dashboard/user/support",
    },
  ];

  return (
    <section className="rounded-2xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-3">
      <h3 className="text-sm sm:text-base font-bold text-primary">
        Need help?
      </h3>

      <div className="divide-y divide-gray-100">
        {helpItems.map((item) => {
          const content = (
            <>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100/60">
                {item.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-primary">{item.title}</p>
                <p className="text-[11px] text-primary/50 truncate mt-0.5">
                  {item.subtitle}
                </p>
              </div>
              <ChevronRight size={14} className="shrink-0 text-primary/30" />
            </>
          );

          if (item.to) {
            return (
              <Link
                key={item.id}
                to={item.to}
                className="flex items-center gap-3 py-3 first:pt-1 last:pb-0 transition-colors hover:opacity-80"
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              className="flex w-full items-center gap-3 py-3 first:pt-1 last:pb-0 text-left transition-colors hover:opacity-80"
            >
              {content}
            </button>
          );
        })}
      </div>
    </section>
  );
};
