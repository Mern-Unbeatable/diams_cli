import { Link } from "react-router";

const DataSubCards = ({ usageSummary }) => {
  return (
    <div className="grid gap-4 pt-2 md:grid-cols-2">
      {/* Card 1: Usage Details */}
      <div className="space-y-3 rounded-xl border border-gray-100 bg-gray-50/40 p-4">
        <h4 className="text-lg font-bold text-primary">Usage details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-primary/55">Used</span>
            <span className="font-bold text-primary">
              {usageSummary.usedData} GB
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-primary/55">Remaining</span>
            <span className="font-bold text-primary">
              {usageSummary.remainingData} GB
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-primary/55">Total</span>
            <span className="font-bold text-primary">
              {usageSummary.totalData} GB
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-primary/55">Included hotspot</span>
            <span className="font-bold text-primary">
              {usageSummary.includedHotspot} GB
            </span>
          </div>
        </div>

        <div className="pt-1">
          <Link
            to="/dashboard/user/usage"
            className="inline-flex items-center gap-1 text-xs font-semibold text-btnPrimary hover:underline"
          >
            View daily breakdown →
          </Link>
        </div>
      </div>

      {/* Card 2: Roaming Usage */}
      <div className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-gray-100 bg-gray-50/40 p-4">
        <div className="pr-16">
          <h4 className="text-lg font-bold text-primary">Roaming usage</h4>
          <p className="mt-2 text-sm leading-relaxed text-primary/55">
            {usageSummary.roamingUsageText}
          </p>
        </div>

        {/* Suitcase Image */}
        <div className="absolute right-3 bottom-3">
          <img
            src="/bag.png"
            alt="Roaming suitcase"
            className="h-40 w-auto object-contain drop-shadow-sm"
          />
        </div>

        <div className="pt-4">
          <Link
            to="/dashboard/user/plans-options"
            className="inline-flex items-center gap-1 text-xs font-semibold text-btnPrimary hover:underline"
          >
            View international rates →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DataSubCards;
