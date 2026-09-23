import { useMemo } from "react";
import PlansHeroSection from "./sections/PlansHeroSection";
import ComparePlansSection from "./sections/ComparePlansSection";
import PricingPlans from "@/Components/public/PricingPlans";
import FaqSection from "@/Components/public/FaqSection";
import CtaSection from "@/Components/public/CtaSection";
import QueryStatus from "@/Components/common/QueryStatus";
import { usePlans } from "@/features/public/plans";
import { unwrapList } from "@/lib/query/unwrap";
import { PLANS } from "@/config/plans";

const PlansView = () => {
  const plansQuery = usePlans();
  const plans = useMemo(() => {
    const rows = unwrapList(plansQuery.data);
    return rows.length ? rows : PLANS;
  }, [plansQuery.data]);

  return (
    <>
      <PlansHeroSection />
      <QueryStatus
        isLoading={plansQuery.isLoading}
        isError={plansQuery.isError}
        error={plansQuery.error}
        onRetry={() => plansQuery.refetch()}
        errorTitle="Unable to load plans"
      >
        <PricingPlans plans={plans} />
      </QueryStatus>
      <ComparePlansSection />
      <FaqSection />
      <CtaSection />
    </>
  );
};

export default PlansView;
