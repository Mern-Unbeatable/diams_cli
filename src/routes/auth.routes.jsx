/**
 * Why this file exists:
 * Guest-only authentication routes (login). Kept separate from public
 * marketing and protected dashboard trees.
 */

import { lazy } from "react";
import { GuestRoute } from "@/Components/dashboard/ProtectedRoute";
import { withSuspense } from "./helpers";
import { ROUTES } from "./paths";

const AuthView = lazy(() => import("@/pages/auth/AuthView"));

/** @type {import("react-router").RouteObject[]} */
export const authRoutes = [
  {
    element: <GuestRoute />,
    children: [
      {
        path: ROUTES.AUTH.LOGIN,
        element: withSuspense(AuthView),
      },
    ],
  },
];

export default authRoutes;
