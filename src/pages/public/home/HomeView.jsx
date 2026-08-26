import HeroSection from "@/pages/public/home/sections/HeroSection";
import FeaturesSection from "@/pages/public/home/sections/FeaturesSection";
import PricingPlans from "@/Components/public/PricingPlans";

const HomeView = () => {
  return (
    <>
      <HeroSection />
      <PricingPlans />
      <FeaturesSection />
    </>
  );
};

export default HomeView;
