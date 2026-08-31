import { DashboardSectionPage } from "@/Components/dashboard/DashboardPageShell";

const AdminPlansView = () => (
  <DashboardSectionPage
    title="Plans"
    description="Published eSIM plans and current subscriber counts."
    columns={["Plan", "Price", "Subscribers", "Status"]}
    rows={[
      ["Lite", "$9.99", "2,140", "Live"],
      ["Plus", "$29.99", "4,820", "Live"],
      ["Business", "$49.99", "1,250", "Live"],
      ["Roam 30", "$19.99", "860", "Draft"],
    ]}
  />
);

export default AdminPlansView;
