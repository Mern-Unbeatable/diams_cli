import { DashboardSectionPage } from "@/Components/dashboard/DashboardPageShell";

const UserMyPlanView = () => (
  <DashboardSectionPage
    title="My Plan"
    description="Details for your current NovaSky subscription."
    columns={["Detail", "Value", "Renews", "Status"]}
    rows={[
      ["Plan", "NovaSky Plus", "Sep 18", "Active"],
      ["Data", "20 GB high-speed", "Sep 18", "12.4 GB left"],
      ["Coverage", "Europe + US", "Sep 18", "Included"],
      ["Hotspot", "Enabled", "Sep 18", "On"],
    ]}
  />
);

export default UserMyPlanView;
