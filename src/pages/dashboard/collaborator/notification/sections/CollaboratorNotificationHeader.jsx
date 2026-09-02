import { Check } from "lucide-react";

const CollaboratorNotificationHeader = ({ unreadCount, onMarkAllRead }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0b1736] sm:text-[28px]">
          Notifications
        </h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          {unreadCount > 0
            ? `${unreadCount} unread notifications.`
            : "No unread notifications."}
        </p>
      </div>

      {/* Mark All as Read Button */}
      {unreadCount > 0 && (
        <button
          type="button"
          onClick={onMarkAllRead}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
        >
          <Check className="h-3.5 w-3.5 text-slate-500 stroke-[2.5]" />
          <span>Mark All as Read</span>
        </button>
      )}
    </div>
  );
};

export default CollaboratorNotificationHeader;
