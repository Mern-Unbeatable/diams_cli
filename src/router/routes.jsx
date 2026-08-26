import { createBrowserRouter } from "react-router";
import RootLayout from "@/layout/RootLayout";
import HomeView from "@/pages/public/home/HomeView";
import PlansView from "@/pages/public/plans/PlansView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: "plans",
        element: <PlansView />,
      },
    ],
  },
]);
