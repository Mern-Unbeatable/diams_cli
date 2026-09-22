/**
 * Why this file exists:
 * End-user role dashboard routes only. Wrapped with RoleRoute(USER) +
 * DashboardLayout via createRoleDashboardRoutes.
 */

import { lazy } from "react";
import { ROLES } from "@/config/dummyAuth";
import { createRoleDashboardRoutes, withSuspense } from "./helpers";
import { ROUTES } from "./paths";

const OverviewView = lazy(
  () => import("@/pages/dashboard/user/overview/OverviewView"),
);
const MyLineView = lazy(
  () => import("@/pages/dashboard/user/my-line/MyLineView"),
);
const PlansOptionsView = lazy(
  () => import("@/pages/dashboard/user/plans-options/PlansOptionsView"),
);
const UsageView = lazy(
  () => import("@/pages/dashboard/user/usage/UsageView"),
);
const BillsView = lazy(
  () => import("@/pages/dashboard/user/bills/BillsView"),
);
const PaymentsView = lazy(
  () => import("@/pages/dashboard/user/payments/PaymentsView"),
);
const EsimView = lazy(() => import("@/pages/dashboard/user/esim/EsimView"));
const MyInformationView = lazy(
  () => import("@/pages/dashboard/user/my-information/MyInformationView"),
);
const SecurityView = lazy(
  () => import("@/pages/dashboard/user/security/SecurityView"),
);
const SupportView = lazy(
  () => import("@/pages/dashboard/user/support/SupportView"),
);
const NotificationsView = lazy(
  () => import("@/pages/dashboard/user/notifications/NotificationsView"),
);

const S = ROUTES.USER.SEGMENTS;

/** @type {import("react-router").RouteObject} */
export const userRoutes = createRoleDashboardRoutes({
  role: ROLES.USER,
  basePath: ROUTES.USER.ROOT,
  children: [
    { index: true, element: withSuspense(OverviewView) },
    { path: S.MY_LINE, element: withSuspense(MyLineView) },
    { path: S.PLANS_OPTIONS, element: withSuspense(PlansOptionsView) },
    { path: S.USAGE, element: withSuspense(UsageView) },
    { path: S.BILLS, element: withSuspense(BillsView) },
    { path: S.PAYMENTS, element: withSuspense(PaymentsView) },
    { path: S.ESIM, element: withSuspense(EsimView) },
    { path: S.MY_INFORMATION, element: withSuspense(MyInformationView) },
    { path: S.SECURITY, element: withSuspense(SecurityView) },
    { path: S.SUPPORT, element: withSuspense(SupportView) },
    { path: S.NOTIFICATIONS, element: withSuspense(NotificationsView) },
  ],
});

export default userRoutes;
