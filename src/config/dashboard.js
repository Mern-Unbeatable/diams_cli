import { ROLE_DASHBOARD_PATHS, ROLES } from "./dummyAuth";

const adminPath = (slug = "") =>
  slug
    ? `${ROLE_DASHBOARD_PATHS[ROLES.ADMIN]}/${slug}`
    : ROLE_DASHBOARD_PATHS[ROLES.ADMIN];

const collaboratorPath = (slug = "") =>
  slug
    ? `${ROLE_DASHBOARD_PATHS[ROLES.COLLABORATOR]}/${slug}`
    : ROLE_DASHBOARD_PATHS[ROLES.COLLABORATOR];

const userPath = (slug = "") =>
  slug
    ? `${ROLE_DASHBOARD_PATHS[ROLES.USER]}/${slug}`
    : ROLE_DASHBOARD_PATHS[ROLES.USER];

export const DASHBOARD_NAV = {
  [ROLES.ADMIN]: [
    { id: "overview", label: "Overview", path: adminPath(), icon: "layout" },
    { id: "customer", label: "Customer", path: adminPath("customer"), icon: "user" },
    { id: "orders", label: "Orders", path: adminPath("orders"), icon: "package" },
    { id: "identity", label: "Identity Verification", path: adminPath("identity"), icon: "shield" },
    { id: "plans", label: "Plans", path: adminPath("plans"), icon: "card" },
    { id: "addons", label: "Add-ons", path: adminPath("add-ons"), icon: "plus" },
    { id: "esim", label: "eSIM Management", path: adminPath("esim"), icon: "sim" },
    { id: "billing", label: "Billing & Payment", path: adminPath("billing"), icon: "receipt" },
    { id: "support", label: "Support Center", path: adminPath("support"), icon: "headset" },
    { id: "notifications", label: "Notifications", path: adminPath("notifications"), icon: "bell" },
    { id: "reports", label: "Reports & Analytics", path: adminPath("reports"), icon: "chart" },
    { id: "users", label: "Users & Permission", path: adminPath("users"), icon: "userCog" },
    { id: "settings", label: "System Settings", path: adminPath("settings"), icon: "settings" },
    { id: "audit", label: "Audit Logs", path: adminPath("audit-logs"), icon: "check" },
  ],
  [ROLES.COLLABORATOR]: [
    { id: "overview", label: "Overview", path: collaboratorPath(), icon: "layout" },
    { id: "customers", label: "Customer", path: collaboratorPath("customers"), icon: "user" },
    { id: "orders", label: "Orders", path: collaboratorPath("orders"), icon: "package" },
    { id: "identity", label: "Identity Verification", path: collaboratorPath("identity"), icon: "shield" },
    { id: "plans", label: "Plans", path: collaboratorPath("plans"), icon: "card" },
    { id: "support", label: "Support Center", path: collaboratorPath("support"), icon: "headset" },
    { id: "notifications", label: "Notifications", path: collaboratorPath("notifications"), icon: "bell" },
  ],
  [ROLES.USER]: [
    { id: "overview", label: "Overview", path: userPath(), icon: "layout" },
    { id: "my-plan", label: "Plans", path: userPath("my-plan"), icon: "card" },
    { id: "esim", label: "eSIM Management", path: userPath("esim"), icon: "sim" },
    { id: "usage", label: "Usage", path: userPath("usage"), icon: "chart" },
    { id: "billing", label: "Billing & Payment", path: userPath("billing"), icon: "receipt" },
    { id: "support", label: "Support Center", path: userPath("support"), icon: "headset" },
    { id: "notifications", label: "Notifications", path: userPath("notifications"), icon: "bell" },
  ],
};

export const getDashboardNav = (role) => DASHBOARD_NAV[role] ?? [];

export const getCurrentNavItem = (role, pathname) =>
  getDashboardNav(role).find((item) => item.path === pathname);
