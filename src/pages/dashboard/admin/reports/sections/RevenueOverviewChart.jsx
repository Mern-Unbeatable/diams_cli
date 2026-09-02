import AdminAreaChart from "../../overview/sections/AdminAreaChart";
import { REVENUE_DATA } from "../../overview/sections/overviewData";

const RevenueOverviewChart = () => {
  return (
    <AdminAreaChart
      id="reports-revenue-chart"
      title="Revenue Overview"
      subtitle="Paid invoice revenue by selected period."
      data={REVENUE_DATA}
      highlightValue="$5600.00"
      highlightMonth="July"
      height="h-[250px]"
    />
  );
};

export default RevenueOverviewChart;
