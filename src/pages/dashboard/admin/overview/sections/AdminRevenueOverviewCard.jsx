import AdminAreaChart from "./AdminAreaChart";
import { REVENUE_DATA } from "./overviewData";

const AdminRevenueOverviewCard = () => {
  return (
    <AdminAreaChart
      id="revenue-chart"
      title="Revenue Overview"
      subtitle="Paid invoice revenue by selected period."
      data={REVENUE_DATA}
      highlightValue="$5600.00"
      highlightMonth="July"
      height="h-[250px]"
    />
  );
};

export default AdminRevenueOverviewCard;
