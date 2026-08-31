import { DashboardSectionPage } from "@/Components/dashboard/DashboardPageShell";

const AdminEsimView = () => (
  <DashboardSectionPage
    title="eSIM Management"
    description="Issued profiles and installation status."
    columns={["eSIM ICCID", "Customer", "Device", "Status"]}
    rows={[
      ["8900 1234 8821", "Maya Chen", "iPhone 15", "Installed"],
      ["8900 1234 7740", "Luis Romero", "Pixel 9", "Installed"],
      ["8900 1234 6612", "Priya Shah", "Galaxy S24", "Pending"],
      ["8900 1234 5509", "Noah Baker", "iPhone 14", "Revoked"],
    ]}
  />
);

export default AdminEsimView;
