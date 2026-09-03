import DataDonutChart from "./DataDonutChart";
import DataStatsBar from "./DataStatsBar";
import DataSubCards from "./DataSubCards";

const DataUsageSection = ({ usageSummary, currentPlan }) => {
  return (
    <section className="space-y-6 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      {/* Metric Top Section */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        {/* Donut Chart Ring */}
        <DataDonutChart
          usedData={usageSummary.usedData}
          totalData={usageSummary.totalData}
          usedPercentage={usageSummary.usedPercentage}
        />

        {/* Stats Bar & Renewal Info */}
        <DataStatsBar usageSummary={usageSummary} currentPlan={currentPlan} />
      </div>

      {/* 2 Sub Cards Grid */}
      <DataSubCards usageSummary={usageSummary} />
    </section>
  );
};

export default DataUsageSection;
