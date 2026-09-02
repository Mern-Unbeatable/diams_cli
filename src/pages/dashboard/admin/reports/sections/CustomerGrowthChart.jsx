import AdminAreaChart from "../../overview/sections/AdminAreaChart";
import { GROWTH_DATA } from "../../overview/sections/overviewData";

const CustomerGrowthChart = () => {
  return (
    <AdminAreaChart
      id="reports-growth-chart"
      title="Customer Growth"
      subtitle="Interactive line chart with date range selector and hover tooltip."
      data={GROWTH_DATA}
      highlightValue="5600"
      highlightMonth="July"
      height="h-[250px]"
    />
  );
};

export default CustomerGrowthChart;
