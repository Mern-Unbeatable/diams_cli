import AdminAreaChart from "../../overview/sections/AdminAreaChart";
import { ACTIVATIONS_DATA } from "../../overview/sections/overviewData";

const ActivationsPerMonthChart = () => {
  return (
    <AdminAreaChart
      id="reports-activations-chart"
      title="Activations per Month"
      subtitle="Monthly SIM and eSIM activations."
      data={ACTIVATIONS_DATA}
      highlightValue="200"
      highlightMonth="July"
      height="h-[260px]"
    />
  );
};

export default ActivationsPerMonthChart;
