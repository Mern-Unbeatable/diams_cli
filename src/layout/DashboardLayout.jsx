import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import DashboardHeader from "@/Components/dashboard/DashboardHeader";
import DashboardSidebar from "@/Components/dashboard/DashboardSidebar";
import { getCurrentNavItem, getDashboardNav } from "@/config/dashboard";
import { getRoleDashboardPath } from "@/config/dummyAuth";
import { useAuth } from "@/context/AuthContext";

const SIDEBAR_COLLAPSED_KEY = "novasky_sidebar_collapsed";

const DashboardLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    try {
      return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true";
    } catch {
      return false;
    }
  });

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const navItems = getDashboardNav(user.role);
  const currentItem = getCurrentNavItem(user.role, location.pathname);
  const isAllowed = navItems.some(
    (item) =>
      item.path === location.pathname ||
      (item.path !== getRoleDashboardPath(user.role) &&
        location.pathname.startsWith(item.path))
  );

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  if (!isAllowed) {
    return <Navigate to={getRoleDashboardPath(user.role)} replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#f3f6fb] text-primary">
      <DashboardSidebar
        navItems={navItems}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
      />

      <div className="flex min-w-0 flex-1 flex-col transition-all duration-300">
        <DashboardHeader
          title={currentItem?.label ?? "Dashboard"}
          onMenuClick={() => setIsSidebarOpen(true)}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebarCollapse}
        />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
