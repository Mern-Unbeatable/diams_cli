import { DashboardSectionPage } from "@/Components/dashboard/DashboardPageShell";

const CollaboratorCustomersView = () => (
  <DashboardSectionPage
    title="Customer"
    description="Accounts currently assigned to you."
    columns={["Customer", "Plan", "Last contact", "Status"]}
    rows={[
      ["Maya Chen", "Plus", "Today", "Follow-up"],
      ["Luis Romero", "Business", "Yesterday", "Active"],
      ["Priya Shah", "Lite", "Aug 28", "Pending ID"],
      ["Noah Baker", "Plus", "Aug 26", "Active"],
    ]}
  />
);

export default CollaboratorCustomersView;
