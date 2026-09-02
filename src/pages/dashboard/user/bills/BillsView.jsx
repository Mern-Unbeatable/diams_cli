import {
  BillsAutoPaymentBanner,
  BillsHeader,
  BillsSidebar,
  BillsTableCard,
} from "./sections/BillsSections";

const BillsView = () => {
  return (
    <div className="space-y-6">
      <BillsHeader />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <BillsAutoPaymentBanner />
          <BillsTableCard />
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          <BillsSidebar />
        </div>
      </div>
    </div>
  );
};

export default BillsView;
