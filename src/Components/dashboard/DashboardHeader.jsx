import { useEffect, useRef, useState } from "react";
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  FileText,
  Menu,
  MessageCircle,
  Zap,
} from "lucide-react";
import { Link } from "react-router";
import {
  ROLE_DASHBOARD_PATHS,
  ROLES,
  getRoleDashboardPath,
} from "@/config/dummyAuth";
import { useAuth } from "@/context/AuthContext";

const USER_HOME = ROLE_DASHBOARD_PATHS[ROLES.USER];

const iconBtnClass =
  "relative flex h-9 w-9 items-center justify-center rounded-lg text-[#6b7280] transition-colors hover:bg-gray-100 hover:text-primary";

const INITIAL_NOTIFICATIONS = [
  {
    id: "n-1",
    title: "Plan Renewal Successful",
    description: "Your NovaSky Plus plan has been successfully renewed.",
    time: "10 mins ago",
    type: "success",
    isUnread: true,
  },
  {
    id: "n-2",
    title: "Usage Alert (80% Reached)",
    description: "You have used 80% of your high-speed monthly data allowance.",
    time: "2 hours ago",
    type: "warning",
    isUnread: true,
  },
  {
    id: "n-3",
    title: "New Invoice Ready",
    description:
      "Your bill for July 2024 (CHF 34.90) is now available for download.",
    time: "1 day ago",
    type: "info",
    isUnread: false,
  },
];

const UserHeaderActions = ({ user, initials }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {/* Notification Bell Container */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={iconBtnClass}
          aria-label="Notifications"
        >
          <Bell size={20} strokeWidth={1.6} />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ef4444] px-1 text-[10px] font-bold leading-none text-white">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-xl border border-gray-200 bg-white p-4 shadow-xl z-50 space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-primary">
                  Notifications
                </h4>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-600">
                    {unreadCount} NEW
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllRead}
                  className="text-[11px] font-semibold text-btnPrimary hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="max-h-72 divide-y divide-gray-100 overflow-y-auto pr-1">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 py-3 first:pt-0 last:pb-0 transition-colors ${
                    n.isUnread ? "bg-blue-50/30 -mx-1 px-1.5 rounded-xl" : ""
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl mt-0.5 ${
                      n.type === "success"
                        ? "bg-emerald-50 text-emerald-600"
                        : n.type === "warning"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-blue-50 text-btnPrimary"
                    }`}
                  >
                    {n.type === "success" && <CheckCircle2 size={16} />}
                    {n.type === "warning" && <Zap size={16} />}
                    {n.type === "info" && <FileText size={16} />}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-primary truncate">
                        {n.title}
                      </p>
                      {n.isUnread && (
                        <span className="h-2 w-2 rounded-full bg-btnPrimary shrink-0" />
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] text-primary/60 leading-normal">
                      {n.description}
                    </p>
                    <p className="mt-1 text-[10px] text-primary/40">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-gray-100">
              <Link
                to={`${USER_HOME}/notifications`}
                onClick={() => setIsOpen(false)}
                className="block text-center text-xs font-bold text-btnPrimary hover:underline"
              >
                View all notifications →
              </Link>
            </div>
          </div>
        )}
      </div>

      <Link
        to={`${USER_HOME}/support`}
        className={iconBtnClass}
        aria-label="Messages"
      >
        <MessageCircle size={20} strokeWidth={1.6} />
      </Link>

      <div className="ml-1 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
          {initials}
        </span>
        <span className="hidden items-center gap-1 text-sm font-medium text-primary sm:inline-flex">
          {user.name}
          <ChevronDown size={14} className="text-primary/60 shrink-0" />
        </span>
      </div>
    </div>
  );
};

const StaffHeaderActions = ({ user, roleLabel, initials }) => (
  <div className="flex items-center gap-3">
    <span className="hidden rounded-full bg-btnPrimary/10 px-3 py-1 text-xs font-bold text-btnPrimary sm:inline">
      {roleLabel}
    </span>
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
        {initials}
      </span>
      <div className="hidden sm:block">
        <p className="text-sm font-semibold text-primary">{user.name}</p>
        <p className="text-xs text-primary/50">{user.email}</p>
      </div>
    </div>
  </div>
);

const DashboardHeader = ({
  title,
  onMenuClick,
  isSidebarCollapsed = false,
  onToggleCollapse,
}) => {
  const { user, roleLabel } = useAuth();
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className="rounded-md p-2 text-primary lg:hidden"
          aria-label="Open sidebar"
          onClick={onMenuClick}
        >
          <Menu size={22} />
        </button>
        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 items-center text-[15px]"
        >
          <Link
            to={getRoleDashboardPath(user.role)}
            className="shrink-0 text-[#555] transition-colors hover:text-primary"
          >
            Main
          </Link>
          <span className="mx-2 text-[#c4c4c4]">/</span>
          <span className="truncate text-[#b0b0b0]">
            {title === "Overview" ? "Dashboard" : title}
          </span>
        </nav>
      </div>

      {user.role === ROLES.USER ? (
        <UserHeaderActions user={user} initials={initials} />
      ) : (
        <StaffHeaderActions
          user={user}
          roleLabel={roleLabel}
          initials={initials}
        />
      )}
    </header>
  );
};

export default DashboardHeader;
