import { Smartphone, Lock, Voicemail } from "lucide-react";

const getServiceIcon = (iconType) => {
  switch (iconType) {
    case "lock":
      return (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <Lock className="h-5 w-5" />
        </div>
      );
    case "voicemail":
      return (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
          <Voicemail className="h-5 w-5" />
        </div>
      );
    case "sim":
    default:
      return (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <Smartphone className="h-5 w-5" />
        </div>
      );
  }
};

const PremiumServicesView = ({ servicesData, onEdit, onDelete }) => {
  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Managed Services
        </h2>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Configure and monitor your active telecommunication services.
        </p>
      </div>

      {/* 6-Card Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        {servicesData.map((service, index) => {
          const isAmberPrice = service.priceType === "amber";

          return (
            <div
              key={service.id || index}
              className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 sm:p-7 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <div>
                {/* Top: Icon + Title & Price */}
                <div className="flex items-start gap-3.5">
                  {getServiceIcon(service.icon)}

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900 sm:text-[17px]">
                      {service.title}
                    </h3>

                    <div>
                      <span
                        className={`inline-block rounded-md px-2.5 py-0.5 font-mono text-[11px] font-semibold ${
                          isAmberPrice
                            ? "border border-[#ffedd5] bg-[#fff7ed] text-[#ea580c]"
                            : "border border-[#ede9fe] bg-[#f5f3ff] text-[#7c3aed]"
                        }`}
                      >
                        {service.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 min-h-[48px] border-b border-slate-100/70 pb-4 text-xs leading-relaxed text-slate-500">
                  {service.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onEdit && onEdit(service)}
                  className="flex-1 rounded-xl bg-[#38bdf8] py-2.5 px-4 text-xs font-semibold text-white shadow-sm transition-all hover:bg-sky-500 active:scale-95 sm:text-sm text-center"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete && onDelete(service)}
                  className="flex-1 rounded-xl bg-[#ff4b4b] py-2.5 px-4 text-xs font-semibold text-white shadow-sm transition-all hover:bg-red-600 active:scale-95 sm:text-sm text-center"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PremiumServicesView;
