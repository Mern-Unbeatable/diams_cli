import { DashboardOverviewPage } from "@/Components/dashboard/DashboardPageShell";

const CollaboratorOverview = () => (
  <DashboardOverviewPage
    title="Overview"
    subtitle="Follow up with assigned customers and open support work."
    stats={[
      { id: "assigned", label: "Assigned customers", value: "48", hint: "12 need follow-up" },
      { id: "open", label: "Open tickets", value: "12", hint: "3 high priority" },
      { id: "resolved", label: "Resolved this week", value: "27", hint: "Avg reply 1.4 hrs" },
      { id: "activations", label: "Pending activations", value: "6", hint: "Due today: 2" },
    ]}
    tableTitle="Ticket queue"
    columns={["Ticket", "Customer", "Priority", "Status"]}
    rows={[
      ["#1842", "Maya Chen", "High", "Open"],
      ["#1837", "Luis Romero", "Medium", "Waiting"],
      ["#1829", "Priya Shah", "Low", "Open"],
      ["#1821", "Noah Baker", "High", "In progress"],
    ]}
  />
);

export default CollaboratorOverview;
