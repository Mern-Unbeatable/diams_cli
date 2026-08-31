import { DashboardSectionPage } from "@/Components/dashboard/DashboardPageShell";

const AdminBillingView = () => (
  <DashboardSectionPage
    title="Billing & Payment"
    description="Invoices, charges, and payout status."
    columns={["Invoice", "Customer", "Amount", "Status"]}
    rows={[
      ["INV-2041", "Maya Chen", "$29.99", "Paid"],
      ["INV-2038", "Luis Romero", "$49.99", "Paid"],
      ["INV-2033", "Priya Shah", "$9.99", "Failed"],
      ["INV-2049", "Noah Baker", "$29.99", "Upcoming"],
    ]}
  />
);

export default AdminBillingView;
