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
import AuthView from "@/pages/auth/AuthView";
import NotFound from "@/pages/error/NotFound";
import DashboardLayout from "@/layout/DashboardLayout";
import RoleDashboardRedirect from "@/pages/dashboard/RoleDashboardRedirect";
import AdminOverview from "@/pages/dashboard/admin/overview/AdminOverview";
import AdminCustomerView from "@/pages/dashboard/admin/customer/AdminCustomerView";
import AdminOrdersView from "@/pages/dashboard/admin/orders/AdminOrdersView";
import AdminIdentityView from "@/pages/dashboard/admin/identityVerification/AdminIdentityView";
import AdminPlansView from "@/pages/dashboard/admin/plans/AdminPlansView";
import AdminAddOnsView from "@/pages/dashboard/admin/addOns/AdminAddOnsView";
import AdminEsimView from "@/pages/dashboard/admin/esim/AdminEsimView";
import AdminBillingView from "@/pages/dashboard/admin/billingPayment/AdminBillingView";
import AdminSupportView from "@/pages/dashboard/admin/supportCenter/AdminSupportView";
import AdminNotificationsView from "@/pages/dashboard/admin/notification/AdminNotificationsView";
import AdminReportsView from "@/pages/dashboard/admin/reports/AdminReportsView";
import AdminUsersView from "@/pages/dashboard/admin/usersPermission/AdminUsersView";
import AdminSettingsView from "@/pages/dashboard/admin/systemsettings/AdminSettingsView";
import AdminAuditLogsView from "@/pages/dashboard/admin/auditLogs/AdminAuditLogsView";
import CollaboratorOverview from "@/pages/dashboard/collaborator/overview/CollaboratorOverview";
import CollaboratorCustomersView from "@/pages/dashboard/collaborator/customers/CollaboratorCustomersView";
import CollaboratorOrdersView from "@/pages/dashboard/collaborator/CollaboratorOrdersView";
import CollaboratorIdentityView from "@/pages/dashboard/collaborator/CollaboratorIdentityView";
import CollaboratorPlansView from "@/pages/dashboard/collaborator/CollaboratorPlansView";
import CollaboratorSupportView from "@/pages/dashboard/collaborator/CollaboratorSupportView";
import CollaboratorNotificationsView from "@/pages/dashboard/collaborator/CollaboratorNotificationsView";
import OverviewView from "@/pages/dashboard/user/overview/OverviewView";
import MyLineView from "@/pages/dashboard/user/my-line/MyLineView";
import PlansOptionsView from "@/pages/dashboard/user/plans-options/PlansOptionsView";
import UsageView from "@/pages/dashboard/user/usage/UsageView";
import BillsView from "@/pages/dashboard/user/bills/BillsView";
import PaymentsView from "@/pages/dashboard/user/payments/PaymentsView";
import EsimView from "@/pages/dashboard/user/esim/EsimView";
import MyInformationView from "@/pages/dashboard/user/my-information/MyInformationView";
import SecurityView from "@/pages/dashboard/user/security/SecurityView";
import SupportView from "@/pages/dashboard/user/support/SupportView";
import NotificationsView from "@/pages/dashboard/user/notifications/NotificationsView";
import {
  GuestRoute,
  ProtectedRoute,
  RoleRoute,
} from "@/Components/dashboard/ProtectedRoute";
import { ROLES } from "@/config/dummyAuth";

export const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/login",
        element: <AuthView />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <RoleDashboardRedirect />,
      },
      {
        path: "/dashboard/admin",
        element: <RoleRoute role={ROLES.ADMIN} />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { index: true, element: <AdminOverview /> },
              { path: "customer", element: <AdminCustomerView /> },
              { path: "customer/:id", element: <AdminCustomerView /> },
              { path: "orders", element: <AdminOrdersView /> },
              { path: "orders/:id", element: <AdminOrdersView /> },
              { path: "identity", element: <AdminIdentityView /> },
              { path: "identity/:id", element: <AdminIdentityView /> },
              { path: "plans", element: <AdminPlansView /> },
              { path: "plans/create", element: <AdminPlansView /> },
              { path: "plans/edit/:id", element: <AdminPlansView /> },
              { path: "plans/:id", element: <AdminPlansView /> },
              { path: "add-ons", element: <AdminAddOnsView /> },
              { path: "add-ons/create", element: <AdminAddOnsView /> },
              { path: "add-ons/edit/:id", element: <AdminAddOnsView /> },
              { path: "esim", element: <AdminEsimView /> },
              { path: "esim/:id", element: <AdminEsimView /> },
              { path: "billing", element: <AdminBillingView /> },
              { path: "support", element: <AdminSupportView /> },
              { path: "support/:id", element: <AdminSupportView /> },
              { path: "notifications", element: <AdminNotificationsView /> },
              { path: "reports", element: <AdminReportsView /> },
              { path: "users", element: <AdminUsersView /> },
              { path: "settings", element: <AdminSettingsView /> },
              { path: "audit-logs", element: <AdminAuditLogsView /> },
            ],
          },
        ],
      },
      {
        path: "/dashboard/collaborator",
        element: <RoleRoute role={ROLES.COLLABORATOR} />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { index: true, element: <CollaboratorOverview /> },
              { path: "customers", element: <CollaboratorCustomersView /> },
              { path: "customers/:id", element: <CollaboratorCustomersView /> },
              { path: "orders", element: <CollaboratorOrdersView /> },
              { path: "identity", element: <CollaboratorIdentityView /> },
              { path: "plans", element: <CollaboratorPlansView /> },
              { path: "support", element: <CollaboratorSupportView /> },
              {
                path: "notifications",
                element: <CollaboratorNotificationsView />,
              },
            ],
          },
        ],
      },
      {
        path: "/dashboard/user",
        element: <RoleRoute role={ROLES.USER} />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { index: true, element: <OverviewView /> },
              { path: "my-line", element: <MyLineView /> },
              { path: "plans-options", element: <PlansOptionsView /> },
              { path: "usage", element: <UsageView /> },
              { path: "bills", element: <BillsView /> },
              { path: "payments", element: <PaymentsView /> },
              { path: "esim", element: <EsimView /> },
              { path: "my-information", element: <MyInformationView /> },
              { path: "security", element: <SecurityView /> },
              { path: "support", element: <SupportView /> },
              { path: "notifications", element: <NotificationsView /> },
            ],
          },
        ],
      },
    ],
  },
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
