import { Navigate, useParams } from "react-router";
import { getPlanWithDetails } from "@/config/planDetails";
import { PLAN_FAQ_SECTION } from "@/config/planFaq";
import PlanDetailsHeroSection from "./sections/PlanDetailsHeroSection";
import PlanDetailsContentSection from "./sections/PlanDetailsContentSection";
import GoodToKnowSection from "@/Components/public/GoodToKnowSection";
import FaqSection from "@/Components/public/FaqSection";
import CtaSection from "@/Components/public/CtaSection";

const PlanDetailsView = () => {
  const { planId } = useParams();
  const plan = getPlanWithDetails(planId);

  if (!plan) {
    return <Navigate to="/plans" replace />;
  }

  return (
    <div className="bg-primary">
      <PlanDetailsHeroSection plan={plan} />
      <PlanDetailsContentSection plan={plan} />

      <div className="space-y-14 pb-0 pt-14 sm:space-y-16 sm:pt-16">
        <GoodToKnowSection />
        <FaqSection
          title={PLAN_FAQ_SECTION.title}
          items={PLAN_FAQ_SECTION.items}
          align="left"
          columns={1}
        />
        <CtaSection
          button={{ label: "Choose your plan", path: `/plans/${plan.id}/configure` }}
        />
      </div>
    </div>
  );
};

export default PlanDetailsView;
