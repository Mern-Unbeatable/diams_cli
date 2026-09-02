import { DashboardSectionPage } from "@/Components/dashboard/DashboardPageShell";

const CollaboratorNotificationsView = () => (
  <DashboardSectionPage
    title="Notifications"
    description="Alerts for your assigned customers."
    columns={["Alert", "Customer", "Sent", "Status"]}
    rows={[
      ["Follow-up reminder", "Maya Chen", "Today", "Unread"],
      ["ID resubmit request", "Priya Shah", "Aug 26", "Sent"],
    ]}
  />
);

export default CollaboratorNotificationsView;
