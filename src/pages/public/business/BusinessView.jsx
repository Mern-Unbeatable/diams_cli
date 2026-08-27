import BusinessHeroSection from "./sections/BusinessHeroSection";
import BusinessWhyChooseSection from "./sections/BusinessWhyChooseSection";
import BusinessPlansSection from "./sections/BusinessPlansSection";
import BusinessFeaturesSection from "./sections/BusinessFeaturesSection";
import BusinessCtaSection from "./sections/BusinessCtaSection";

const BusinessView = () => {
  return (
    <>
      <BusinessHeroSection />
      <BusinessWhyChooseSection />
      <BusinessPlansSection />
      <div className="bg-[#eef4fa]">
        <BusinessFeaturesSection />
        <BusinessCtaSection />
      </div>
    </>
  );
};

export default BusinessView;
