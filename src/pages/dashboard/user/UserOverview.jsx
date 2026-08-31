import { DashboardOverviewPage } from "@/Components/dashboard/DashboardPageShell";

const UserOverview = () => (
  <DashboardOverviewPage
    title="Welcome back"
    subtitle="Your NovaSky Plus plan is active and ready to use."
    stats={[
      { id: "plan", label: "Current plan", value: "Plus", hint: "Renews in 18 days" },
      { id: "data", label: "Data remaining", value: "12.4 GB", hint: "of 20 GB" },
      { id: "status", label: "eSIM status", value: "Active", hint: "Installed on iPhone 15" },
      { id: "next", label: "Next bill", value: "$29.99", hint: "Due Sep 18" },
    ]}
    tableTitle="Recent activity"
    columns={["Date", "Event", "Detail", "Status"]}
    rows={[
      ["Aug 30", "Data usage", "1.2 GB used in Spain", "OK"],
      ["Aug 28", "Roaming", "Connected in France", "OK"],
      ["Aug 22", "Top-up", "5 GB add-on applied", "Complete"],
      ["Aug 18", "Renewal", "Plus plan renewed", "Complete"],
    ]}
  />
);

export default UserOverview;
