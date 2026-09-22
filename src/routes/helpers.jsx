/**
 * Why this file exists:
 * Shared route-building helpers so role dashboards, list+detail pairs, and
 * Suspense wrappers stay consistent and DRY across route modules.
 */

import { createElement, Suspense } from "react";
import { RoleRoute } from "@/routes/guard/ProtectedRoute";
import RouteFallback from "@/Components/common/RouteFallback";
import DashboardLayout from "@/layout/DashboardLayout";

/**
 * Wrap a lazy (or any) component in Suspense + RouteFallback.
 * @param {import("react").ComponentType} LazyComponent
 */
export const withSuspense = (LazyComponent) => (
  <Suspense fallback={<RouteFallback />}>
    {createElement(LazyComponent)}
  </Suspense>
);

/**
 * Build list + detail sibling routes that share the same element
 * (e.g. "customer" and "customer/:id").
 *
 * @param {string} baseSegment - relative path segment without :id
 * @param {import("react").ReactNode} element
 * @param {{ paramName?: string }} [options]
 * @returns {import("react-router").RouteObject[]}
 */
export const detailRoutes = (baseSegment, element, options = {}) => {
  const paramName = options.paramName ?? "id";
  return [
    { path: baseSegment, element },
    { path: `${baseSegment}/:${paramName}`, element },
  ];
};

/**
 * Role-scoped dashboard branch:
 *   path → RoleRoute(role) → DashboardLayout → children
 *
 * Preserves the exact nesting used by the previous monolithic router.
 *
 * @param {{
 *   role: string,
 *   basePath: string,
 *   children: import("react-router").RouteObject[],
 * }} options
 * @returns {import("react-router").RouteObject}
 */
export const createRoleDashboardRoutes = ({ role, basePath, children }) => ({
  path: basePath,
  element: <RoleRoute role={role} />,
  children: [
    {
      element: <DashboardLayout />,
      children,
    },
  ],
});
