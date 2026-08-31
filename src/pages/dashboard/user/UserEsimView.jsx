import { DashboardSectionPage } from "@/Components/dashboard/DashboardPageShell";

const UserEsimView = () => (
  <DashboardSectionPage
    title="eSIM Management"
    description="Your issued eSIM profile and installation status."
    columns={["eSIM ICCID", "Device", "Installed", "Status"]}
    rows={[
      ["8900 1234 8821", "iPhone 15", "Aug 18", "Active"],
    ]}
  />
);

export default UserEsimView;
