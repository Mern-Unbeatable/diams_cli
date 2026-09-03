import { ChevronRight, Laptop, Smartphone } from "lucide-react";

export const ConnectedDevicesCard = ({ devices, onManageDevices }) => {
  return (
    <section className="rounded-xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-bold text-primary">
          Connected devices
        </h3>
        <button
          type="button"
          onClick={onManageDevices}
          className="text-xs font-semibold text-btnPrimary hover:underline"
        >
          See all →
        </button>
      </div>

      {/* Devices List */}
      <div className="divide-y divide-gray-100 text-xs">
        {(devices || []).map((dev) => (
          <div
            key={dev.id}
            onClick={onManageDevices}
            className="flex items-center justify-between py-3 first:pt-0 last:pb-0 hover:bg-gray-50/50 -mx-2 px-2 rounded-xl transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-primary/60 border border-gray-100 group-hover:text-btnPrimary transition-colors">
                {dev.icon === "laptop" ? (
                  <Laptop size={15} />
                ) : (
                  <Smartphone size={15} />
                )}
              </span>
              <div className="min-w-0">
                <p className="font-bold text-primary group-hover:text-btnPrimary transition-colors truncate">
                  {dev.name}
                </p>
                <p className="text-[10px] text-primary/45 truncate mt-0.5">
                  {dev.location} • {dev.os}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {dev.isCurrent ? (
                <span className="inline-flex items-center rounded-md bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-[#0284c7] border border-sky-100">
                  Current device
                </span>
              ) : (
                <span className="text-[10px] text-primary/45 font-medium">
                  {dev.lastActive}
                </span>
              )}
              <ChevronRight
                size={14}
                className="text-primary/30 group-hover:text-btnPrimary group-hover:translate-x-0.5 transition-all"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Link */}
      <div className="pt-2 border-t border-gray-100">
        <button
          type="button"
          onClick={onManageDevices}
          className="text-xs font-bold text-btnPrimary hover:underline"
        >
          Manage all devices →
        </button>
      </div>
    </section>
  );
};
