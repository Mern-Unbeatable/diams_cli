import AdminAreaChart from "./AdminAreaChart";
import { GROWTH_DATA } from "./overviewData";

const AdminCustomerGrowthCard = () => {
  return (
    <AdminAreaChart
      id="growth-chart"
      title="Customer Growth"
      subtitle="Interactive line chart with date range selector and hover tooltip."
      data={GROWTH_DATA}
      highlightValue="5600"
      highlightMonth="July"
      height="h-[250px]"
    />
  );
};

export default AdminCustomerGrowthCard;
