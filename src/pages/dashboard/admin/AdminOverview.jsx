import { DashboardOverviewPage } from "@/Components/dashboard/DashboardPageShell";

const AdminOverview = () => (
  <DashboardOverviewPage
    title="Overview"
    subtitle="Monitor users, plans, and platform performance."
    stats={[
      { id: "users", label: "Total users", value: "12,480", hint: "+6.2% this month" },
      { id: "plans", label: "Active plans", value: "8,210", hint: "91% of billed accounts" },
      { id: "revenue", label: "Monthly revenue", value: "$184,200", hint: "+12.4% vs last month" },
      { id: "tickets", label: "Open tickets", value: "34", hint: "8 marked urgent" },
    ]}
    tableTitle="Recent users"
    columns={["Name", "Email", "Plan", "Status"]}
    rows={[
      ["Maya Chen", "maya.chen@email.com", "Plus", "Active"],
      ["Luis Romero", "luis.romero@email.com", "Business", "Active"],
      ["Priya Shah", "priya.shah@email.com", "Lite", "Pending"],
      ["Noah Baker", "noah.baker@email.com", "Plus", "Active"],
    ]}
  />
);

export default AdminOverview;
