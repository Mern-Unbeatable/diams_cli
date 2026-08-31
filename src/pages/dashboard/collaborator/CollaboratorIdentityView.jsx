import { DashboardSectionPage } from "@/Components/dashboard/DashboardPageShell";

const CollaboratorIdentityView = () => (
  <DashboardSectionPage
    title="Identity Verification"
    description="Assigned KYC cases waiting for review."
    columns={["Customer", "ID type", "Submitted", "Status"]}
    rows={[
      ["Priya Shah", "Passport", "Aug 28", "In review"],
      ["Elena Costa", "National ID", "Aug 26", "Needs resubmit"],
    ]}
  />
);

export default CollaboratorIdentityView;
