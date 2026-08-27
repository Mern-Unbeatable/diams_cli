import { createBrowserRouter } from "react-router";
import RootLayout from "@/layout/RootLayout";
import HomeView from "@/pages/public/home/HomeView";
import PlansView from "@/pages/public/plans/PlansView";
import PlanDetailsView from "@/pages/public/plans/PlanDetailsView";
import ConfigureView from "@/pages/public/configure/ConfigureView";
import PersonalInfoView from "@/pages/public/personal-info/PersonalInfoView";
import VerificationView from "@/pages/public/verification/VerificationView";

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
      {
        path: "plans/:planId/configure",
        element: <ConfigureView />,
      },
      {
        path: "plans/:planId/personal-info",
        element: <PersonalInfoView />,
      },
      {
        path: "plans/:planId/verification",
        element: <VerificationView />,
      },
      {
        path: "plans/:planId",
        element: <PlanDetailsView />,
      },
    ],
  },
]);
