import { DashboardSectionPage } from "@/Components/dashboard/DashboardPageShell";

const AdminOrdersView = () => (
  <DashboardSectionPage
    title="Orders"
    description="Recent plan purchases and activation orders."
    columns={["Order", "Customer", "Plan", "Status"]}
    rows={[
      ["#NS-2041", "Maya Chen", "Plus", "Fulfilled"],
      ["#NS-2038", "Luis Romero", "Business", "Processing"],
      ["#NS-2033", "Priya Shah", "Lite", "Pending ID"],
      ["#NS-2029", "Noah Baker", "Plus", "Fulfilled"],
    ]}
  />
);

export default AdminOrdersView;
