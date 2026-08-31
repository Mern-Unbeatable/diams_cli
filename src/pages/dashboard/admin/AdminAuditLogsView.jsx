import { DashboardSectionPage } from "@/Components/dashboard/DashboardPageShell";

const AdminAuditLogsView = () => (
  <DashboardSectionPage
    title="Audit Logs"
    description="Sensitive actions recorded across the admin workspace."
    columns={["Time", "Actor", "Action", "Result"]}
    rows={[
      ["Aug 31 09:14", "Alex Morgan", "Approved KYC", "Success"],
      ["Aug 30 16:02", "Alex Morgan", "Revoked eSIM", "Success"],
      ["Aug 29 11:40", "System", "Failed payment retry", "Failed"],
      ["Aug 28 08:21", "Alex Morgan", "Updated plan price", "Success"],
    ]}
  />
);

export default AdminAuditLogsView;
