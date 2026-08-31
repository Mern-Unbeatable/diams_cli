import { DashboardSectionPage } from "@/Components/dashboard/DashboardPageShell";

const UserSupportView = () => (
  <DashboardSectionPage
    title="Support"
    description="Your open requests and help conversations."
    columns={["Ticket", "Subject", "Priority", "Status"]}
    rows={[
      ["#1842", "eSIM not installing", "High", "Open"],
      ["#1837", "Billing question", "Medium", "Waiting"],
    ]}
  />
);

export default UserSupportView;
