/**
 * Why this file exists:
 * Single entry for app routing. All route modules live under `src/routes/`
 * (there is no separate `src/router/` folder).
 *
 * Layout:
 *   paths.js              — ROUTES constants + absolute() helpers
 *   helpers.jsx           — createRoleDashboardRoutes, detailRoutes, withSuspense
 *   auth.routes.jsx       — guest /login
 *   public.routes.jsx     — PublicLayout marketing, checkout, legal, 404
 *   dashboard/            — ProtectedRoute + /dashboard redirect + role trees
 *     admin|collaborator|user.routes.jsx
 *   index.js              — createBrowserRouter composition (this file)
 *
 * Import in the app: `import { router, ROUTES, absolute } from "@/routes"`
 */

import { createBrowserRouter } from "react-router";
import { authRoutes } from "./auth/auth.routes";
import { dashboardRoutes } from "./dashboard/dashboard.routes";
import { publicRoutes } from "./public/public.routes";

export const router = createBrowserRouter([
  ...authRoutes,
  ...dashboardRoutes,
  ...publicRoutes,
]);

export { ROUTES, absolute } from "./paths";
export default router;
