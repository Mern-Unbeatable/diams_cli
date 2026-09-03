import { Zap, ShoppingBag, Clock, DollarSign } from "lucide-react";

const renderNotificationIcon = (type) => {
  switch (type) {
    case "activation":
      return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
          <Zap className="h-4 w-4" />
        </div>
      );
    case "order":
      return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
          <ShoppingBag className="h-4 w-4" />
        </div>
      );
    case "commission":
      return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <span className="text-xs font-bold">$</span>
        </div>
      );
    case "system":
      return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
          <Clock className="h-4 w-4" />
        </div>
      );
    default:
      return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
          <Zap className="h-4 w-4" />
        </div>
      );
  }
};

const CollaboratorNotificationList = ({ notifications, onToggleRead }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] divide-y divide-slate-100">
      {notifications.map((item) => (
        <div
          key={item.id}
          className="flex flex-wrap items-center justify-between gap-4 p-4 sm:px-6 hover:bg-slate-50/50 transition-colors"
        >
          {/* Left: Icon + Text */}
          <div className="flex items-center gap-3.5 min-w-0">
            {renderNotificationIcon(item.type)}
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                {item.title}
              </h3>
              <p className="mt-0.5 text-xs text-slate-400">
                {item.description}
              </p>
            </div>
          </div>

          {/* Right: Timestamp + Unread Dot + Mark Read Action */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <span className="font-mono text-xs text-slate-400">
              {item.timeAgo}
            </span>

            {item.unread && (
              <div className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
            )}

            <button
              type="button"
              onClick={() => onToggleRead(item.id)}
              className="text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              {item.unread ? "Mark Read" : "Mark Unread"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollaboratorNotificationList;
