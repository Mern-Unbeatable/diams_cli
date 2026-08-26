import { Navigate, useParams } from "react-router";
import { getPlanWithDetails } from "@/config/planDetails";
import PlanDetailsHeroSection from "./sections/PlanDetailsHeroSection";
import PlanDetailsContentSection from "./sections/PlanDetailsContentSection";

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
    </div>
  );
};

export default PlanDetailsView;
