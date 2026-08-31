import { DashboardSectionPage } from "@/Components/dashboard/DashboardPageShell";

const UserUsageView = () => (
  <DashboardSectionPage
    title="Usage"
    description="Data and roaming activity for this billing cycle."
    columns={["Country", "Used", "Share", "Last session"]}
    rows={[
      ["Spain", "4.1 GB", "32%", "Aug 30"],
      ["France", "3.6 GB", "28%", "Aug 28"],
      ["Germany", "2.2 GB", "17%", "Aug 24"],
      ["United States", "1.7 GB", "13%", "Aug 20"],
    ]}
  />
);

export default UserUsageView;
