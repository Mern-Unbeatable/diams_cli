import PlansHeroSection from "./sections/PlansHeroSection";
import ComparePlansSection from "./sections/ComparePlansSection";
import PricingPlans from "@/Components/public/PricingPlans";

const PlansView = () => {
  return (
    <>
      <PlansHeroSection />
      <PricingPlans />
      <ComparePlansSection />
    </>
  );
};

export default PlansView;
