import { createBrowserRouter } from "react-router";
import RootLayout from "@/layout/RootLayout";
import HomeView from "@/pages/public/home/HomeView";
import PlansView from "@/pages/public/plans/PlansView";
import PlanDetailsView from "@/pages/public/plans/PlanDetailsView";
import ConfigureView from "@/pages/public/configure/ConfigureView";
import PersonalInfoView from "@/pages/public/personal-info/PersonalInfoView";
import VerificationView from "@/pages/public/verification/VerificationView";
import PaymentView from "@/pages/public/payment/PaymentView";
import ConfirmationView from "@/pages/public/confirmation/ConfirmationView";
import ActivationView from "@/pages/public/activation/ActivationView";
import AccountView from "@/pages/public/account/AccountView";
import BusinessView from "@/pages/public/business/BusinessView";
import CoverageView from "@/pages/public/coverage/CoverageView";
import HelpView from "@/pages/public/help/HelpView";
import NotFound from "@/pages/error/NotFound";

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
        path: "business",
        element: <BusinessView />,
      },
      {
        path: "coverage",
        element: <CoverageView />,
      },
      {
        path: "help",
        element: <HelpView />,
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
        path: "plans/:planId/payment",
        element: <PaymentView />,
      },
      {
        path: "plans/:planId/confirmation",
        element: <ConfirmationView />,
      },
      {
        path: "plans/:planId/activation",
        element: <ActivationView />,
      },
      {
        path: "account",
        element: <AccountView />,
      },
      {
        path: "plans/:planId",
        element: <PlanDetailsView />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
