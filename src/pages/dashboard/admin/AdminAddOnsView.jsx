import { DashboardSectionPage } from "@/Components/dashboard/DashboardPageShell";

const AdminAddOnsView = () => (
  <DashboardSectionPage
    title="Add-ons"
    description="Optional data packs and roaming extras."
    columns={["Add-on", "Price", "Attached plans", "Status"]}
    rows={[
      ["+5 GB", "$8.99", "Lite, Plus", "Live"],
      ["+10 GB", "$14.99", "Plus, Business", "Live"],
      ["Voice pack", "$4.99", "Plus", "Live"],
      ["Roam weekend", "$6.99", "All", "Draft"],
    ]}
  />
);

export default AdminAddOnsView;
