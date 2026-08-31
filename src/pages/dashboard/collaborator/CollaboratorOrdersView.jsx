import { DashboardSectionPage } from "@/Components/dashboard/DashboardPageShell";

const CollaboratorOrdersView = () => (
  <DashboardSectionPage
    title="Orders"
    description="Orders assigned to your customer queue."
    columns={["Order", "Customer", "Plan", "Status"]}
    rows={[
      ["#NS-2041", "Maya Chen", "Plus", "Follow-up"],
      ["#NS-2038", "Luis Romero", "Business", "Processing"],
      ["#NS-2033", "Priya Shah", "Lite", "Pending ID"],
    ]}
  />
);

export default CollaboratorOrdersView;
