import CoverageHeroSection from "./sections/CoverageHeroSection";
import CoverageCheckSection from "./sections/CoverageCheckSection";
import CoverageNetworkSection from "./sections/CoverageNetworkSection";
import CoverageMapSection from "./sections/CoverageMapSection";
import CoverageCtaSection from "./sections/CoverageCtaSection";
import FaqSection from "@/Components/public/FaqSection";
import { COVERAGE_FAQ } from "@/config/coverage";

const CoverageView = () => {
  return (
    <>
      <CoverageHeroSection />
      <CoverageCheckSection />
      <CoverageNetworkSection />
      <CoverageMapSection />
      <FaqSection
        title={COVERAGE_FAQ.title}
        items={COVERAGE_FAQ.items}
        variant="light"
      />
      <CoverageCtaSection />
    </>
  );
};

export default CoverageView;
