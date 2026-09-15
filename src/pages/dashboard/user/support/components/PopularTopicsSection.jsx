import {
  ArrowRight,
  Cpu,
  CreditCard,
  KeyRound,
  User,
  Wifi,
} from "lucide-react";

export const PopularTopicsSection = ({ topics, onSelectTopic, onViewAll }) => {
  const getTopicIcon = (iconName) => {
    switch (iconName) {
      case "cpu":
        return <Cpu size={20} />;
      case "wifi":
        return <Wifi size={20} />;
      case "credit-card":
        return <CreditCard size={20} />;
      case "user":
        return <User size={20} />;
      case "sim":
        return <KeyRound size={20} />;
      default:
        return <Cpu size={20} />;
    }
  };

  return (
    <section className="min-w-0 space-y-3.5">
      <h3 className="text-base font-bold text-primary sm:text-lg">
        Popular Topics
      </h3>

      {/* Stack → 2 → 3 → 5 only when left column is wide enough */}
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {(topics || []).map((topic) => (
          <button
            key={topic.id}
            type="button"
            onClick={() => onSelectTopic?.(topic)}
            className="group flex min-w-0 items-start gap-3 rounded-xl border border-gray-200/90 bg-white p-4 text-left shadow-xs transition-all hover:border-sky-200 hover:bg-sky-50/50 2xl:flex-col 2xl:items-center 2xl:text-center"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-100/70 bg-sky-50 text-[#0284c7] shadow-2xs transition-transform group-hover:scale-105">
              {getTopicIcon(topic.icon)}
            </span>

            <div className="min-w-0 flex-1 space-y-1">
              <p className="text-sm font-bold text-primary transition-colors group-hover:text-btnPrimary">
                {topic.title}
              </p>
              <p className="text-xs leading-relaxed text-primary/50">
                {topic.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="pt-1 text-center">
        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center gap-1 text-xs font-bold text-btnPrimary hover:underline"
        >
          <span>View all help topics</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </section>
  );
};
