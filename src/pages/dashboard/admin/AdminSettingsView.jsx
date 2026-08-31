import { DashboardSectionPage } from "@/Components/dashboard/DashboardPageShell";

const AdminSettingsView = () => (
  <DashboardSectionPage
    title="System Settings"
    description="Workspace preferences for the admin portal."
    columns={["Setting", "Value", "Updated", "Status"]}
    rows={[
      ["New user approvals", "Required", "Aug 12", "On"],
      ["Auto-renew reminders", "3 days before", "Jul 30", "On"],
      ["Maintenance window", "Sun 01:00 UTC", "Jul 02", "Scheduled"],
      ["Audit log retention", "90 days", "Jun 18", "On"],
    ]}
  />
);

export default AdminSettingsView;
