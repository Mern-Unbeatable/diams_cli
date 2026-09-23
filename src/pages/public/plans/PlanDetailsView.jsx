import { Navigate, useParams } from "react-router";
import { getPlanWithDetails } from "@/config/planDetails";
import { PLAN_FAQ_SECTION } from "@/config/planFaq";
import QueryStatus from "@/Components/common/QueryStatus";
import { usePlan } from "@/features/public/plans";
import PlanDetailsHeroSection from "./sections/PlanDetailsHeroSection";
import PlanDetailsContentSection from "./sections/PlanDetailsContentSection";
import GoodToKnowSection from "@/Components/public/GoodToKnowSection";
import FaqSection from "@/Components/public/FaqSection";
import CtaSection from "@/Components/public/CtaSection";

const PlanDetailsView = () => {
  const { planId } = useParams();
  const planQuery = usePlan(planId);
  const configPlan = getPlanWithDetails(planId);

  const plan = configPlan
    ? { ...configPlan, ...(planQuery.data || {}) }
    : planQuery.data;

  if (!planId || (!configPlan && !planQuery.isLoading && !planQuery.isError && !plan)) {
    return <Navigate to="/plans" replace />;
  }

  const content = plan ? (
    <div className="bg-primary">
      <PlanDetailsHeroSection plan={plan} />
      <PlanDetailsContentSection plan={plan} />

      <div className="space-y-14 pb-0 pt-14 sm:space-y-16 sm:pt-16">
        <GoodToKnowSection />
        <FaqSection
          title={PLAN_FAQ_SECTION.title}
          items={PLAN_FAQ_SECTION.items}
          align="left"
        />
        <CtaSection
          button={{
            label: "Choose your plan",
            path: `/plans/${plan.id}/configure`,
          }}
        />
      </div>
    </div>
  ) : null;

  if (configPlan) {
    return content;
  }

  return (
    <QueryStatus
      isLoading={planQuery.isLoading}
      isError={planQuery.isError}
      error={planQuery.error}
      onRetry={() => planQuery.refetch()}
      errorTitle="Unable to load plan"
      isEmpty={!plan}
      emptyTitle="Plan not found"
      emptyMessage="This plan is unavailable."
    >
      {content}
    </QueryStatus>
  );
};

export default PlanDetailsView;
