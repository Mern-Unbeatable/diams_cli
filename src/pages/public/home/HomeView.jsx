import HeroSection from "@/pages/public/home/sections/HeroSection";
import FeaturesSection from "@/pages/public/home/sections/FeaturesSection";
import PricingPlans from "@/Components/public/PricingPlans";
import HomeSeo from "@/pages/public/home/HomeSeo";

const HomeView = () => {
  return (
    <>
      <HomeSeo />
      <HeroSection />
      <h2 className="sr-only">Plans</h2>
      <PricingPlans />
      <h2 className="sr-only">Features</h2>
      <FeaturesSection />
    </>
  );
};

export default HomeView;
