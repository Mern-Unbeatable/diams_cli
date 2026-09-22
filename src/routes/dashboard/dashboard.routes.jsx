/**
 * Why this file exists:
 * Top-level protected dashboard tree: ProtectedRoute wraps /dashboard
 * redirect plus all role-specific dashboard route branches.
 */

import { lazy } from "react";
import { ProtectedRoute } from "@/routes/guard/ProtectedRoute";
import { withSuspense } from "../helpers";
import { ROUTES } from "../paths";
import { adminRoutes } from "./admin/admin.routes";
import { collaboratorRoutes } from "./collaborator/collaborator.routes";
import { userRoutes } from "./user/user.routes";

const RoleDashboardRedirect = lazy(
  () => import("@/routes/guard/RoleDashboardRedirect"),
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
