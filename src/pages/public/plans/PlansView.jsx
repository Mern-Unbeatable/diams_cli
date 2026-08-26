import PlansHeroSection from "./sections/PlansHeroSection";
import ComparePlansSection from "./sections/ComparePlansSection";
import PricingPlans from "@/Components/public/PricingPlans";
import FaqSection from "@/Components/public/FaqSection";
import CtaSection from "@/Components/public/CtaSection";

const PlansView = () => {
  return (
    <>
      <PlansHeroSection />
      <PricingPlans />
      <ComparePlansSection />
      <FaqSection />
      <CtaSection />
    </>
  );
};

export default PlansView;
