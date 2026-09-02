import UsageBoostersGrid from "./sections/UsageBoostersGrid";
import UsageHeader from "./sections/UsageHeader";
import UsageMainCard from "./sections/UsageMainCard";
import UsageNeedMoreBanner from "./sections/UsageNeedMoreBanner";
import UsagePlanBanner from "./sections/UsagePlanBanner";
import UsageSidebar from "./sections/UsageSidebar";


const UsageView = () => {
  return (
    <div className="space-y-6">
      <UsageHeader />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <UsagePlanBanner />
          <UsageMainCard />
          <UsageNeedMoreBanner />
          <UsageBoostersGrid />
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          <UsageSidebar />
        </div>
      </div>
    </div>
  );
};

export default UsageView;
