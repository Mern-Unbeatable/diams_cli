import { DashboardSectionPage } from "@/Components/dashboard/DashboardPageShell";

const CollaboratorSupportView = () => (
  <DashboardSectionPage
    title="Support"
    description="Open conversations and activation help requests."
    columns={["Ticket", "Subject", "Priority", "Status"]}
    rows={[
      ["#1842", "eSIM not installing", "High", "Open"],
      ["#1837", "Billing question", "Medium", "Waiting"],
      ["#1829", "Coverage in Japan", "Low", "Open"],
      ["#1821", "Plan change request", "High", "In progress"],
    ]}
  />
);

export default CollaboratorSupportView;
