import { useState } from "react";
import {
  CollaboratorCommissionHeader,
  CollaboratorCommissionStatCards,
  CollaboratorEarningsChartCard,
  CollaboratorCommissionTableCard,
  CollaboratorCommissionDetailsModal,
} from "./sections";

const CollaboratorCommissionsView = () => {
  const [selectedCommission, setSelectedCommission] = useState(null);

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      {/* 1. Page Header */}
      <CollaboratorCommissionHeader />

      {/* 2. Top 4 Metric Stat Cards */}
      <CollaboratorCommissionStatCards />

      {/* 3. Earnings Over Time Recharts Area Chart Card */}
      <CollaboratorEarningsChartCard />

      {/* 4. Commission Details Table Card */}
      <CollaboratorCommissionTableCard
        onViewItem={(item) => setSelectedCommission(item)}
      />

      {/* 5. Commission Details Modal */}
      <CollaboratorCommissionDetailsModal
        isOpen={Boolean(selectedCommission)}
        onClose={() => setSelectedCommission(null)}
        item={selectedCommission}
      />
    </div>
  );
};

export default CollaboratorCommissionsView;
