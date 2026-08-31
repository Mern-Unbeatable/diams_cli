import { DashboardSectionPage } from "@/Components/dashboard/DashboardPageShell";

const AdminCustomerView = () => (
  <DashboardSectionPage
    title="Customer"
    description="All customer accounts on the NovaSky platform."
    columns={["Name", "Email", "Plan", "Status"]}
    rows={[
      ["Maya Chen", "maya.chen@email.com", "Plus", "Active"],
      ["Luis Romero", "luis.romero@email.com", "Business", "Active"],
      ["Priya Shah", "priya.shah@email.com", "Lite", "Pending"],
      ["Noah Baker", "noah.baker@email.com", "Plus", "Active"],
    ]}
  />
);

export default AdminCustomerView;
