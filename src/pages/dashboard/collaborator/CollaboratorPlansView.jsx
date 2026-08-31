import { DashboardSectionPage } from "@/Components/dashboard/DashboardPageShell";

const CollaboratorPlansView = () => (
  <DashboardSectionPage
    title="Plans"
    description="Plans you can recommend or update for assigned customers."
    columns={["Plan", "Price", "Best for", "Status"]}
    rows={[
      ["Lite", "$9.99", "Light travel", "Live"],
      ["Plus", "$29.99", "Regular roaming", "Live"],
      ["Business", "$49.99", "Teams", "Live"],
      ["Roam 30", "$19.99", "Short trips", "Draft"],
    ]}
  />
);

export default CollaboratorPlansView;
