import HelpHeroSection from "./sections/HelpHeroSection";
import HelpCategoriesSection from "./sections/HelpCategoriesSection";
import HelpFaqSection from "./sections/HelpFaqSection";
import HelpContactSection from "./sections/HelpContactSection";
import HelpResourcesSection from "./sections/HelpResourcesSection";

const HelpView = () => {
  return (
    <>
      <HelpHeroSection />
      <HelpCategoriesSection />
      <HelpFaqSection />
      <HelpContactSection />
      <HelpResourcesSection />
    </>
  );
};

export default HelpView;
