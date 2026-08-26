import { PLANS } from "@/config/plans";
import PlanCard from "@/Components/public/PlanCard";

const PricingPlans = ({ plans = PLANS }) => {
  return (
    <section className="bg-primary">
      <div className="mx-auto container px-5 py-14 sm:px-6 sm:py-20 lg:px-10">
        <div className="grid gap-6 pt-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
