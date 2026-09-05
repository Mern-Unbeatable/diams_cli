import CollaboratorAreaChart from "./CollaboratorAreaChart";
import { COLLABORATOR_REVENUE_DATA } from "./collaboratorOverviewData";

const CollaboratorRevenueOverviewCard = () => {
  return (
    <CollaboratorAreaChart
      id="collaborator-revenue-overview"
      title="Revenue Overview"
      subtitle="Paid invoice revenue by selected period."
      totalMetric="CHF 275.00"
      totalMetricLabel="Total Earnings"
      data={COLLABORATOR_REVENUE_DATA}
      highlightValue="$5600.00"
      highlightMonth="July"
      height="h-[270px] sm:h-[300px]"
      reportPath="/dashboard/collaborator/commissions"
    />
  );
};

export default CollaboratorRevenueOverviewCard;
