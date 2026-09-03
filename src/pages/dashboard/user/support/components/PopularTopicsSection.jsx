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
    <section className="space-y-3.5">
      <h3 className="text-base sm:text-lg font-bold text-primary">
        Popular Topics
      </h3>

      {/* 5-Column Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {(topics || []).map((topic) => (
          <button
            key={topic.id}
            type="button"
            onClick={() => onSelectTopic?.(topic)}
            className="flex flex-col items-center justify-center rounded-xl border border-gray-200/90 bg-white p-4 text-center shadow-xs transition-all hover:bg-sky-50/50 hover:border-sky-200 group cursor-pointer"
          >
            {/* Icon Container */}
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-[#0284c7] border border-sky-100/70 shadow-2xs group-hover:scale-105 transition-transform">
              {getTopicIcon(topic.icon)}
            </span>

            {/* Title */}
            <p className="mt-3 text-xs font-bold text-primary group-hover:text-btnPrimary transition-colors line-clamp-1">
              {topic.title}
            </p>

            {/* Description */}
            <p className="mt-1 text-[10px] text-primary/50 line-clamp-2 leading-tight">
              {topic.description}
            </p>
          </button>
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center pt-1">
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
