import { Bell, Menu, MessageCircle } from "lucide-react";
import { Link } from "react-router";
import { ROLE_DASHBOARD_PATHS, ROLES, getRoleDashboardPath } from "@/config/dummyAuth";
import { useAuth } from "@/context/AuthContext";

const USER_HOME = ROLE_DASHBOARD_PATHS[ROLES.USER];

const iconBtnClass =
  "relative flex h-9 w-9 items-center justify-center rounded-lg text-[#6b7280] transition-colors hover:bg-gray-100 hover:text-primary";

const UserHeaderActions = ({ user, initials }) => (
  <div className="flex items-center gap-1 sm:gap-2">
    <Link
      to={`${USER_HOME}/notifications`}
      className={iconBtnClass}
      aria-label="Notifications"
    >
      <Bell size={20} strokeWidth={1.6} />
      <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ef4444] px-1 text-[10px] font-bold leading-none text-white">
        2
      </span>
    </Link>

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
      <span className="hidden text-sm font-medium text-primary sm:inline">
        {user.name}
      </span>
    </div>
  </div>
);

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

const DashboardHeader = ({ title, onMenuClick }) => {
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
        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center text-[15px]">
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
        <StaffHeaderActions user={user} roleLabel={roleLabel} initials={initials} />
      )}
    </header>
  );
};

export default DashboardHeader;
