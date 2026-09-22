/**
 * Why this file exists:
 * Admin role dashboard routes only. Wrapped with RoleRoute(ADMIN) +
 * DashboardLayout via createRoleDashboardRoutes.
 */

import { lazy } from "react";
import { ROLES } from "@/config/dummyAuth";
import {
  createRoleDashboardRoutes,
  detailRoutes,
  withSuspense,
} from "../helpers";
import { ROUTES } from "../paths";

const AdminOverview = lazy(
  () => import("@/pages/dashboard/admin/overview/AdminOverview"),
);
const AdminCustomerView = lazy(
  () => import("@/pages/dashboard/admin/customer/AdminCustomerView"),
);
const AdminOrdersView = lazy(
  () => import("@/pages/dashboard/admin/orders/AdminOrdersView"),
);
const AdminIdentityView = lazy(
  () =>
    import("@/pages/dashboard/admin/identityVerification/AdminIdentityView"),
);
const AdminPlansView = lazy(
  () => import("@/pages/dashboard/admin/plans/AdminPlansView"),
);
const AdminAddOnsView = lazy(
  () => import("@/pages/dashboard/admin/addOns/AdminAddOnsView"),
);
const AdminEsimView = lazy(
  () => import("@/pages/dashboard/admin/esim/AdminEsimView"),
);
const AdminBillingView = lazy(
  () => import("@/pages/dashboard/admin/billingPayment/AdminBillingView"),
);
const AdminSupportView = lazy(
  () => import("@/pages/dashboard/admin/supportCenter/AdminSupportView"),
);
const AdminNotificationsView = lazy(
  () => import("@/pages/dashboard/admin/notification/AdminNotificationsView"),
);
const AdminReportsView = lazy(
  () => import("@/pages/dashboard/admin/reports/AdminReportsView"),
);
const AdminUsersView = lazy(
  () => import("@/pages/dashboard/admin/usersPermission/AdminUsersView"),
);
const AdminSettingsView = lazy(
  () => import("@/pages/dashboard/admin/systemsettings/AdminSettingsView"),
);
const AdminAuditLogsView = lazy(
  () => import("@/pages/dashboard/admin/auditLogs/AdminAuditLogsView"),
);

const S = ROUTES.ADMIN.SEGMENTS;

/** @type {import("react-router").RouteObject} */
export const adminRoutes = createRoleDashboardRoutes({
  role: ROLES.ADMIN,
  basePath: ROUTES.ADMIN.ROOT,
  children: [
    { index: true, element: withSuspense(AdminOverview) },
    ...detailRoutes(S.CUSTOMER, withSuspense(AdminCustomerView)),
    ...detailRoutes(S.ORDERS, withSuspense(AdminOrdersView)),
    ...detailRoutes(S.IDENTITY, withSuspense(AdminIdentityView)),
    { path: S.PLANS, element: withSuspense(AdminPlansView) },
    { path: S.PLANS_CREATE, element: withSuspense(AdminPlansView) },
    { path: S.PLANS_EDIT, element: withSuspense(AdminPlansView) },
    { path: S.PLANS_DETAIL, element: withSuspense(AdminPlansView) },
    { path: S.ADD_ONS, element: withSuspense(AdminAddOnsView) },
    { path: S.ADD_ONS_CREATE, element: withSuspense(AdminAddOnsView) },
    { path: S.ADD_ONS_EDIT, element: withSuspense(AdminAddOnsView) },
    ...detailRoutes(S.ESIM, withSuspense(AdminEsimView)),
    { path: S.BILLING, element: withSuspense(AdminBillingView) },
    ...detailRoutes(S.SUPPORT, withSuspense(AdminSupportView)),
    { path: S.NOTIFICATIONS, element: withSuspense(AdminNotificationsView) },
    { path: S.REPORTS, element: withSuspense(AdminReportsView) },
    { path: S.USERS, element: withSuspense(AdminUsersView) },
    { path: S.SETTINGS, element: withSuspense(AdminSettingsView) },
    { path: S.AUDIT_LOGS, element: withSuspense(AdminAuditLogsView) },
  ],
});

export default adminRoutes;
