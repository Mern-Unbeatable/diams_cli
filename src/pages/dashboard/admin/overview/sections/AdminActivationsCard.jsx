import AdminAreaChart from "./AdminAreaChart";
import { ACTIVATIONS_DATA } from "./overviewData";

const AdminActivationsCard = () => {
  return (
    <AdminAreaChart
      id="activations-chart"
      title="Activations per Month"
      subtitle="Monthly SIM and eSIM activations."
      data={ACTIVATIONS_DATA}
      highlightValue="200"
      highlightMonth="July"
      height="h-[260px]"
      reportPath="/dashboard/admin/reports"
    />
  );
};

export default AdminActivationsCard;
