import {
  Phone,
  Infinity as InfinityIcon,
  Clock,
  Globe,
  Check,
} from "lucide-react";

const InternationalCallsView = ({ callsData, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
      {callsData.map((item) => {
        const isPopular = Boolean(item.isPopular);

        return (
          <div
            key={item.id}
            className={`relative flex flex-col justify-between rounded-xl bg-white p-6 sm:p-7 shadow-sm transition-all duration-200 hover:shadow-md ${
              isPopular
                ? "border-2 border-sky-500 ring-1 ring-sky-500/20"
                : "border border-slate-100"
            }`}
          >
            {/* Top Floating Badge for Most Popular */}
            {isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#0284c7] px-3.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm flex items-center gap-1">
                <span>★</span>
                <span>MOST POPULAR</span>
              </div>
            )}

            <div>
              {/* Header: Tag & Price */}
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                  {item.tag}
                </span>
                <span className="text-base font-bold text-slate-900 sm:text-lg">
                  {item.price}
                </span>
              </div>

              {/* Title with Icon */}
              <div className="mt-5 flex items-center gap-2 text-slate-900">
                {item.iconType === "infinity" ? (
                  <InfinityIcon className="h-5 w-5 shrink-0 text-sky-500" />
                ) : (
                  <Phone className="h-4 w-4 shrink-0 text-sky-500" />
                )}
                <h3 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                  {item.minutes}
                </h3>
              </div>

              {/* Tagline */}
              <p className="mt-1.5 min-h-[36px] text-xs text-slate-500 leading-relaxed">
                {item.tagline}
              </p>

              {/* Validity Box */}
              <div className="my-4 flex w-fit items-center gap-2.5 rounded-xl border border-slate-100/80 bg-slate-50/80 px-3.5 py-2">
                <Clock className="h-4 w-4 text-sky-500" />
                <div>
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    VALIDITY
                  </span>
                  <span className="block text-xs font-bold text-slate-800">
                    {item.validity}
                  </span>
                </div>
              </div>

              {/* Included Countries */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <Globe className="h-3.5 w-3.5 text-sky-500" />
                  <span>Included:</span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {item.countries.map((country) => (
                    <span
                      key={country}
                      className="rounded-md border border-slate-100 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                      {country}
                    </span>
                  ))}
                </div>

                {item.moreCountriesCount && (
                  <button
                    type="button"
                    className="block text-xs font-semibold text-sky-600 hover:underline cursor-pointer pt-0.5"
                  >
                    +{item.moreCountriesCount} more
                  </button>
                )}
              </div>

              {/* Feature Checklist */}
              <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-4">
                {item.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                    <span className="text-xs text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons (Edit & Delete) */}
            <div className="mt-6 flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onEdit && onEdit(item)}
                className="flex-1 rounded-xl bg-[#38bdf8] py-2.5 px-4 text-xs font-semibold text-white shadow-sm transition-all hover:bg-sky-500 active:scale-95 sm:text-sm text-center"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete && onDelete(item)}
                className="flex-1 rounded-xl bg-[#ff4b4b] py-2.5 px-4 text-xs font-semibold text-white shadow-sm transition-all hover:bg-red-600 active:scale-95 sm:text-sm text-center"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InternationalCallsView;
