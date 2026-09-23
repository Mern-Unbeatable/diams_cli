import { useMemo, useState } from "react";
import {
  useCollaboratorCommissionSummary,
  useCollaboratorCommissions,
} from "@/features/dash/collaborator/commissions";
import { unwrapList } from "@/lib/query/unwrap";
import { COMMISSION_STAT_CARDS } from "./sections/collaboratorCommissionData";
import {
  CollaboratorCommissionHeader,
  CollaboratorCommissionStatCards,
  CollaboratorEarningsChartCard,
  CollaboratorCommissionTableCard,
  CollaboratorCommissionDetailsModal,
} from "./sections";

const CollaboratorCommissionsView = () => {
  const [selectedCommission, setSelectedCommission] = useState(null);

  const commissionsQuery = useCollaboratorCommissions();
  const summaryQuery = useCollaboratorCommissionSummary();

  const commissionItems = useMemo(() => {
    const raw = commissionsQuery.data;
    if (Array.isArray(raw?.list)) return raw.list;
    return unwrapList(raw);
  }, [commissionsQuery.data]);

  const summaryCards =
    summaryQuery.data?.cards ||
    commissionsQuery.data?.summary?.cards ||
    COMMISSION_STAT_CARDS;

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      <CollaboratorCommissionHeader />

      <CollaboratorCommissionStatCards cards={summaryCards} />

      <CollaboratorEarningsChartCard />

      <CollaboratorCommissionTableCard
        items={commissionItems}
        onViewItem={(item) => setSelectedCommission(item)}
        isLoading={commissionsQuery.isLoading}
        isFetching={commissionsQuery.isFetching && !commissionsQuery.isLoading}
        error={commissionsQuery.isError ? commissionsQuery.error : null}
        onRetry={() => commissionsQuery.refetch()}
      />

      <CollaboratorCommissionDetailsModal
        isOpen={Boolean(selectedCommission)}
        onClose={() => setSelectedCommission(null)}
        item={selectedCommission}
      />
    </div>
  );
};

export default CollaboratorCommissionsView;
