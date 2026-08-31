import { DashboardSectionPage } from "@/Components/dashboard/DashboardPageShell";

const UserNotificationsView = () => (
  <DashboardSectionPage
    title="Notifications"
    description="Account alerts and plan reminders."
    columns={["Alert", "Date", "Channel", "Status"]}
    rows={[
      ["Plan renews in 18 days", "Aug 30", "Email", "Sent"],
      ["Roaming in Spain", "Aug 28", "Push", "Sent"],
    ]}
  />
);

export default UserNotificationsView;
