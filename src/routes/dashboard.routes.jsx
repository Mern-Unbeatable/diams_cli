/**
 * Why this file exists:
 * Top-level protected dashboard tree: ProtectedRoute wraps /dashboard
 * redirect plus all role-specific dashboard route branches.
 */

import { lazy } from "react";
import { ProtectedRoute } from "@/Components/dashboard/ProtectedRoute";
import { withSuspense } from "./helpers";
import { ROUTES } from "./paths";
import { adminRoutes } from "./admin.routes";
import { collaboratorRoutes } from "./collaborator.routes";
import { userRoutes } from "./user.routes";

const RoleDashboardRedirect = lazy(
  () => import("@/pages/dashboard/RoleDashboardRedirect"),
);

/** @type {import("react-router").RouteObject[]} */
export const dashboardRoutes = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: ROUTES.DASHBOARD.ROOT,
        element: withSuspense(RoleDashboardRedirect),
      },
      adminRoutes,
      collaboratorRoutes,
      userRoutes,
    ],
  },
];

export default dashboardRoutes;
