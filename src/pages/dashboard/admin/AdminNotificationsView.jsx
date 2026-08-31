import { DashboardSectionPage } from "@/Components/dashboard/DashboardPageShell";

const AdminNotificationsView = () => (
  <DashboardSectionPage
    title="Notifications"
    description="System alerts sent to customers and staff."
    columns={["Alert", "Audience", "Sent", "Status"]}
    rows={[
      ["Plan renewal reminder", "Plus users", "Aug 30", "Sent"],
      ["eSIM install guide", "New orders", "Aug 28", "Sent"],
      ["Maintenance window", "All users", "Aug 22", "Scheduled"],
      ["ID resubmit request", "Priya Shah", "Aug 26", "Sent"],
    ]}
  />
);

export default AdminNotificationsView;
