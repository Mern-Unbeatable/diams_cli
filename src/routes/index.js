/**
 * Why this file exists:
 * Composes domain route groups into the single createBrowserRouter instance
 * consumed by the app. Order matches the previous monolithic config:
 * auth → protected dashboard → public (with catch-all).
 */

import { createBrowserRouter } from "react-router";
import { authRoutes } from "./auth.routes";
import { dashboardRoutes } from "./dashboard.routes";
import { publicRoutes } from "./public.routes";

export const router = createBrowserRouter([
  ...authRoutes,
  ...dashboardRoutes,
  ...publicRoutes,
]);

export { ROUTES, absolute } from "./paths";
export default router;
