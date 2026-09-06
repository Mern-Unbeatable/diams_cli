import { LineSummaryCard } from "./sections/LineSummaryCard";
import { LineDetailsTab } from "./sections/LineDetailsTab";
import { LineInformationCard } from "./sections/LineInformationCard";
import { PinPukCard } from "./sections/PinPukCard";
import { QuickActionsCard } from "./sections/QuickActionsCard";
import { LineStatusCard } from "./sections/LineStatusCard";
import { SimPromoCard } from "./sections/SimPromoCard";
import { HelpSupportCard } from "./sections/HelpSupportCard";

const MyLineView = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-primary sm:text-[1.75rem]">
        My Line
      </h2>
      <p className="mt-1 text-sm text-primary/60">
        Manage your NovaSky line and services.
      </p>
    </div>

    <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_340px]">
      {/* Left Main Column */}
      <div className="space-y-6 min-w-0">
        <LineSummaryCard />
        <LineDetailsTab />

        <div className="grid gap-6 md:grid-cols-2">
          <LineInformationCard />
          <div className="space-y-6">
            <PinPukCard />
            <QuickActionsCard />
          </div>
        </div>
      </div>

      {/* Right Column / Sidebar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-1 gap-6 items-start">
        <LineStatusCard />
        <SimPromoCard />
        <HelpSupportCard />
      </div>
    </div>
  </div>
);

export default MyLineView;
