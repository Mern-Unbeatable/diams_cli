import { DashboardSectionPage } from "@/Components/dashboard/DashboardPageShell";

const UserBillingView = () => (
  <DashboardSectionPage
    title="Billing"
    description="Invoices and upcoming charges for your account."
    columns={["Invoice", "Date", "Amount", "Status"]}
    rows={[
      ["INV-2041", "Aug 18", "$29.99", "Paid"],
      ["INV-1988", "Jul 18", "$29.99", "Paid"],
      ["INV-1912", "Jun 18", "$9.99", "Paid"],
      ["INV-2049", "Sep 18", "$29.99", "Upcoming"],
    ]}
  />
);

export default UserBillingView;
