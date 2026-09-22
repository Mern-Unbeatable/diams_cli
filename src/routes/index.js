/**
 * Why this file exists:
 * Single entry for app routing. All route modules live under `src/routes/`
 * (there is no separate `src/router/` folder).
 *
 * Import in the app: `import { router, ROUTES, absolute } from "@/routes"`
 */

import { createElement } from "react";
import { createBrowserRouter } from "react-router";
import RouteErrorPage from "@/Components/common/RouteErrorPage";
import { authRoutes } from "./auth/auth.routes";
import { dashboardRoutes } from "./dashboard/dashboard.routes";
import { publicRoutes } from "./public/public.routes";

export const router = createBrowserRouter([
  {
    errorElement: createElement(RouteErrorPage),
    children: [...authRoutes, ...dashboardRoutes, ...publicRoutes],
  },
]);

export { ROUTES, absolute } from "./paths";
export default router;
