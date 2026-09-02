import {
  ReportsHeader,
  ReportsKpiCards,
  RevenueOverviewChart,
  MostPopularPlansCard,
  ActivationStatisticsCard,
  CustomerGrowthChart,
  ActivationsPerMonthChart,
} from "./sections";

const AdminReportsView = () => {
  return (
    <div className="min-h-full space-y-8 text-slate-900 font-sans pb-10">
      {/* 1. Header */}
      <ReportsHeader />

      {/* 2. Top 8 KPI Metric Cards */}
      <ReportsKpiCards />

      {/* 3. Middle Section: Revenue Overview (8 cols) + Most Popular Plans (4 cols) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <RevenueOverviewChart />
        </div>
        <div className="lg:col-span-4">
          <MostPopularPlansCard />
        </div>
      </div>

      {/* 4. Third Section: Activation Statistics (4 cols) + Customer Growth (8 cols) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <ActivationStatisticsCard />
        </div>
        <div className="lg:col-span-8">
          <CustomerGrowthChart />
        </div>
      </div>

      {/* 5. Bottom Section: Activations per Month (Full Width) */}
      <div>
        <ActivationsPerMonthChart />
      </div>
    </div>
  );
};

export default AdminReportsView;
