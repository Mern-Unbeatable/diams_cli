import { Link, NavLink, useNavigate } from "react-router";
import {
  BarChart3,
  Bell,
  CircleCheck,
  CreditCard,
  Headset,
  LayoutGrid,
  Link2,
  Lock,
  LogOut,
  Package,
  Plus,
  Receipt,
  Settings,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  User,
  UserCog,
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
};

const navLinkClass = ({ isActive }) =>
  [
    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors",
    isActive
      ? "bg-[#3b82f6] text-white"
      : "text-white hover:bg-white/[0.08]",
  ].join(" ");

const DashboardSidebar = ({ navItems, isOpen, onClose }) => {
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
          "fixed inset-y-0 left-0 z-50 flex w-[248px] shrink-0 flex-col bg-[#000b1f] transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-start justify-between px-5 pb-3 pt-6">
          <Link to={dashboardHome} className="min-w-0" onClick={onClose}>
            <img src={BRAND.logo} alt={BRAND.name} className="h-12 w-auto" />
          </Link>
          <button
            type="button"
            className="mt-1 rounded-md p-1 text-white lg:hidden"
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
                <li key={id}>
                  <NavLink
                    to={path}
                    end={path === dashboardHome}
                    className={navLinkClass}
                    onClick={onClose}
                  >
                    <Icon size={18} strokeWidth={1.6} className="shrink-0" />
                    <span className="leading-none">{label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-3 pb-5 pt-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-white/[0.08]"
          >
            <LogOut size={18} strokeWidth={1.6} className="shrink-0" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
