/**
 * Why this file exists:
 * Public marketing, checkout funnel, legal pages, and the RootLayout
 * catch-all 404 — isolated from auth and dashboard concerns.
 */

import { lazy } from "react";
import RootLayout from "@/layout/RootLayout";
import { withSuspense } from "./helpers";
import { ROUTES } from "./paths";

const HomeView = lazy(() => import("@/pages/public/home/HomeView"));
const PlansView = lazy(() => import("@/pages/public/plans/PlansView"));
const PlanDetailsView = lazy(
  () => import("@/pages/public/plans/PlanDetailsView"),
);
const ConfigureView = lazy(
  () => import("@/pages/public/configure/ConfigureView"),
);
const PersonalInfoView = lazy(
  () => import("@/pages/public/personal-info/PersonalInfoView"),
);
const VerificationView = lazy(
  () => import("@/pages/public/verification/VerificationView"),
);
const PaymentView = lazy(() => import("@/pages/public/payment/PaymentView"));
const ConfirmationView = lazy(
  () => import("@/pages/public/confirmation/ConfirmationView"),
);
const ActivationView = lazy(
  () => import("@/pages/public/activation/ActivationView"),
);
const AccountView = lazy(() => import("@/pages/public/account/AccountView"));
const BusinessView = lazy(() => import("@/pages/public/business/BusinessView"));
const CoverageView = lazy(() => import("@/pages/public/coverage/CoverageView"));
const HelpView = lazy(() => import("@/pages/public/help/HelpView"));
const LegalNoticeView = lazy(
  () => import("@/pages/public/legal/LegalNoticeView"),
);
const PrivacyPolicyView = lazy(
  () => import("@/pages/public/legal/PrivacyPolicyView"),
);
const TermsOfUseView = lazy(
  () => import("@/pages/public/legal/TermsOfUseView"),
);
const NotFound = lazy(() => import("@/pages/error/NotFound"));

const S = ROUTES.PUBLIC.SEGMENTS;

/** @type {import("react-router").RouteObject[]} */
export const publicRoutes = [
  {
    path: ROUTES.PUBLIC.ROOT,
    element: <RootLayout />,
    children: [
      { index: true, element: withSuspense(HomeView) },
      { path: S.PLANS, element: withSuspense(PlansView) },
      { path: S.BUSINESS, element: withSuspense(BusinessView) },
      { path: S.COVERAGE, element: withSuspense(CoverageView) },
      { path: S.HELP, element: withSuspense(HelpView) },
      { path: S.LEGAL, element: withSuspense(LegalNoticeView) },
      { path: S.PRIVACY, element: withSuspense(PrivacyPolicyView) },
      { path: S.TERMS, element: withSuspense(TermsOfUseView) },
      // Checkout funnel — more specific plan paths before plans/:planId
      { path: S.PLAN_CONFIGURE, element: withSuspense(ConfigureView) },
      { path: S.PLAN_PERSONAL_INFO, element: withSuspense(PersonalInfoView) },
      { path: S.PLAN_VERIFICATION, element: withSuspense(VerificationView) },
      { path: S.PLAN_PAYMENT, element: withSuspense(PaymentView) },
      { path: S.PLAN_CONFIRMATION, element: withSuspense(ConfirmationView) },
      { path: S.PLAN_ACTIVATION, element: withSuspense(ActivationView) },
      { path: S.ACCOUNT, element: withSuspense(AccountView) },
      { path: S.PLAN_DETAILS, element: withSuspense(PlanDetailsView) },
      { path: S.NOT_FOUND, element: withSuspense(NotFound) },
    ],
  },
];

export default publicRoutes;
