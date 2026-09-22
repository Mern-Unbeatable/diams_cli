/**
 * Why this file exists:
 * Collaborator role dashboard routes only. Same RoleRoute + DashboardLayout
 * nesting as before; list+detail pairs use detailRoutes().
 */

import { lazy } from "react";
import { ROLES } from "@/config/dummyAuth";
import {
  createRoleDashboardRoutes,
  detailRoutes,
  withSuspense,
} from "./helpers";
import { ROUTES } from "./paths";

const CollaboratorOverview = lazy(
  () => import("@/pages/dashboard/collaborator/overview/CollaboratorOverview"),
);
const CollaboratorCustomersView = lazy(
  () =>
    import(
      "@/pages/dashboard/collaborator/customers/CollaboratorCustomersView"
    ),
);
const CollaboratorOrdersView = lazy(
  () => import("@/pages/dashboard/collaborator/order/CollaboratorOrdersView"),
);
const CollaboratorActivationsView = lazy(
  () =>
    import(
      "@/pages/dashboard/collaborator/activation/CollaboratorActivationsView"
    ),
);
const CollaboratorCommissionsView = lazy(
  () =>
    import(
      "@/pages/dashboard/collaborator/commission/CollaboratorCommissionsView"
    ),
);
const CollaboratorInvoicesView = lazy(
  () =>
    import("@/pages/dashboard/collaborator/invoice/CollaboratorInvoicesView"),
);
const CollaboratorProfileSettingsView = lazy(
  () =>
    import(
      "@/pages/dashboard/collaborator/profile/CollaboratorProfileSettingsView"
    ),
);
const CollaboratorIdentityView = lazy(
  () => import("@/pages/dashboard/collaborator/CollaboratorIdentityView"),
);
const CollaboratorPlansView = lazy(
  () => import("@/pages/dashboard/collaborator/CollaboratorPlansView"),
);
const CollaboratorSupportView = lazy(
  () => import("@/pages/dashboard/collaborator/CollaboratorSupportView"),
);
const CollaboratorNotificationsView = lazy(
  () =>
    import(
      "@/pages/dashboard/collaborator/notification/CollaboratorNotificationsView"
    ),
);

const S = ROUTES.COLLABORATOR.SEGMENTS;

/** @type {import("react-router").RouteObject} */
export const collaboratorRoutes = createRoleDashboardRoutes({
  role: ROLES.COLLABORATOR,
  basePath: ROUTES.COLLABORATOR.ROOT,
  children: [
    { index: true, element: withSuspense(CollaboratorOverview) },
    ...detailRoutes(S.CUSTOMERS, withSuspense(CollaboratorCustomersView)),
    ...detailRoutes(S.ORDERS, withSuspense(CollaboratorOrdersView)),
    ...detailRoutes(S.ACTIVATIONS, withSuspense(CollaboratorActivationsView)),
    { path: S.COMMISSIONS, element: withSuspense(CollaboratorCommissionsView) },
    { path: S.INVOICES, element: withSuspense(CollaboratorInvoicesView) },
    {
      path: S.NOTIFICATIONS,
      element: withSuspense(CollaboratorNotificationsView),
    },
    {
      path: S.PROFILE,
      element: withSuspense(CollaboratorProfileSettingsView),
    },
    { path: S.IDENTITY, element: withSuspense(CollaboratorIdentityView) },
    { path: S.PLANS, element: withSuspense(CollaboratorPlansView) },
    { path: S.SUPPORT, element: withSuspense(CollaboratorSupportView) },
  ],
});

export default collaboratorRoutes;
