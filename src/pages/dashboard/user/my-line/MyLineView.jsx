import { USER_MY_LINE } from "@/config/userMyLine";
import {
  HelpSupportCard,
  LineDetailsTab,
  LineInformationCard,
  LineStatusCard,
  LineSummaryCard,
  PinPukCard,
  QuickActionsCard,
  SimPromoCard,
} from "./sections/MyLineSections";

const MyLineView = () => (
  <div className="space-y-6">
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Left Column (2/3 width) */}
      <div className="lg:col-span-2 space-y-6">
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

      {/* Right Column (1/3 width) */}
      <div className="space-y-6">
        <LineStatusCard />
        <SimPromoCard />
        <HelpSupportCard />
      </div>
    </div>
  </div>
);

export default MyLineView;
