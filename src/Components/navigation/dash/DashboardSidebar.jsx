import { Link, NavLink, useNavigate } from "react-router";
import {
  BarChart3,
  Bell,
  CircleCheck,
  CreditCard,
  FileText,
  Headset,
  LayoutGrid,
  Link2,
  Lock,
  LogOut,
  Package,
  PanelLeft,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Power,
  Receipt,
  Settings,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  User,
  UserCog,
  Wallet,
  X,
} from "lucide-react";
import { BRAND } from "@/config/navigation";
import { getRoleDashboardPath } from "@/config/dummyAuth";
import { useAuth } from "@/context/AuthContext";

const NAV_ICONS = {
  layout: LayoutGrid,
  user: User,
  package: Package,
  shield: ShieldCheck,
  card: CreditCard,
  plus: Plus,
  sim: Smartphone,
  receipt: Receipt,
  headset: Headset,
  bell: Bell,
  chart: TrendingUp,
  link: Link2,
  lock: Lock,
  barChart: BarChart3,
  userCog: UserCog,
  settings: Settings,
  check: CircleCheck,
  power: Power,
  wallet: Wallet,
  fileText: FileText,
};

const DashboardSidebar = ({
  navItems,
  isOpen,
  onClose,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dashboardHome = getRoleDashboardPath(user.role);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-label="Close sidebar"
          onClick={onClose}
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex shrink-0 flex-col bg-[#000b1f] transition-all duration-300 lg:sticky lg:top-0 lg:h-screen",
          isCollapsed ? "lg:w-[72px]" : "lg:w-[248px]",
          "w-[248px]",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        {/* Header section when collapsed (Desktop) */}
        {isCollapsed ? (
          <div className="hidden lg:flex w-full items-center justify-center pb-3 pt-6 px-3">
            {onToggleCollapse && (
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 text-white/80 transition-all hover:border-white/40 hover:bg-white/[0.1] hover:text-white"
                aria-label="Expand sidebar"
                title="Expand sidebar"
                onClick={onToggleCollapse}
              >
                <PanelLeftOpen size={18} />
              </button>
            )}
          </div>
        ) : null}

        {/* Header section when expanded (or Mobile view) */}
        <div
          className={[
            "flex items-center justify-between pb-3 pt-2 px-5 gap-2",
            isCollapsed ? "lg:hidden" : "",
          ].join(" ")}
        >
          <Link
            to="/"
            className="flex items-center min-w-0 overflow-hidden"
            onClick={onClose}
            title={BRAND.name}
          >
            <img
              src={BRAND.logo}
              alt={BRAND.name}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop collapse toggle button */}
          {onToggleCollapse && (
            <button
              type="button"
              className="hidden lg:flex h-9 w-9 items-center justify-center  text-white/80 transition-all hover:border-white/40 hover:bg-white/[0.1] hover:text-white"
              aria-label="Collapse sidebar"
              title="Collapse sidebar"
              onClick={onToggleCollapse}
            >
              <PanelLeftClose size={18} />
            </button>
          )}

          {/* Mobile close button */}
          <button
            type="button"
            className="rounded-md p-1 text-white lg:hidden"
            aria-label="Close sidebar"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="mt-4 flex-1 overflow-y-auto px-3 [scrollbar-color:#1e3a5f_transparent] [scrollbar-width:thin]">
          <ul className="space-y-1">
            {navItems.map(({ id, label, path, icon }) => {
              const Icon = NAV_ICONS[icon] ?? LayoutGrid;

              return (
                <li key={id} className="relative">
                  <NavLink
                    to={path}
                    end={path === dashboardHome}
                    className={({ isActive }) =>
                      [
                        "flex items-center gap-3 rounded-lg py-2.5 text-[14px] font-medium transition-all duration-200 relative",
                        isCollapsed ? "lg:justify-center lg:px-0 px-3" : "px-3",
                        isActive
                          ? "bg-[#3b82f6] text-white"
                          : "text-white/80 hover:bg-white/[0.08] hover:text-white",
                      ].join(" ")
                    }
                    onClick={onClose}
                    title={isCollapsed ? label : undefined}
                  >
                    {({ isActive }) => (
                      <>
                        {/* Active vertical bar indicator when collapsed */}
                        {isActive && isCollapsed && (
                          <span className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-md bg-[#3b82f6]" />
                        )}
                        <Icon size={18} strokeWidth={1.8} className="shrink-0" />
                        <span
                          className={[
                            "leading-none whitespace-nowrap transition-opacity duration-200",
                            isCollapsed ? "lg:hidden block" : "block",
                          ].join(" ")}
                        >
                          {label}
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-3 pb-5 pt-3 border-t border-white/10">
          <button
            type="button"
            onClick={handleLogout}
            title={isCollapsed ? "Sign out" : undefined}
            className={[
              "flex w-full items-center gap-3 rounded-lg py-2.5 text-[14px] font-medium text-white/80 transition-all duration-200 hover:bg-white/[0.08] hover:text-white",
              isCollapsed ? "lg:justify-center lg:px-0 px-3" : "px-3",
            ].join(" ")}
          >
            <LogOut size={18} strokeWidth={1.8} className="shrink-0" />
            <span
              className={[
                "leading-none whitespace-nowrap transition-opacity duration-200",
                isCollapsed ? "lg:hidden block" : "block",
              ].join(" ")}
            >
              Sign out
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
