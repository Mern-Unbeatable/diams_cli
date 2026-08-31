import { DashboardSectionPage } from "@/Components/dashboard/DashboardPageShell";

const AdminReportsView = () => (
  <DashboardSectionPage
    title="Reports & Analytics"
    description="High-level performance for the current billing period."
    columns={["Metric", "This month", "Last month", "Change"]}
    rows={[
      ["New activations", "1,284", "1,102", "+16.5%"],
      ["Churned plans", "96", "121", "-20.7%"],
      ["Support tickets", "412", "388", "+6.2%"],
      ["Avg. revenue / user", "$22.40", "$21.10", "+6.2%"],
    ]}
  />
);

export default AdminReportsView;
