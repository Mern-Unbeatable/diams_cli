import { DashboardSectionPage } from "@/Components/dashboard/DashboardPageShell";

const AdminIdentityView = () => (
  <DashboardSectionPage
    title="Identity Verification"
    description="KYC reviews waiting for admin approval."
    columns={["Customer", "ID type", "Submitted", "Status"]}
    rows={[
      ["Priya Shah", "Passport", "Aug 28", "In review"],
      ["Elena Costa", "National ID", "Aug 26", "Needs resubmit"],
      ["Maya Chen", "Passport", "Aug 18", "Approved"],
      ["Luis Romero", "Driver license", "Aug 12", "Approved"],
    ]}
  />
);

export default AdminIdentityView;
