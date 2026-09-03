import { Laptop, LogOut, Smartphone, X } from "lucide-react";
import { useState } from "react";

export const DevicesModal = ({ isOpen, onClose, initialDevices }) => {
  const [devices, setDevices] = useState(initialDevices || []);

  if (!isOpen) return null;

  const handleRevoke = (id) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100">
              <Laptop size={18} />
            </span>
            <h3 className="text-base font-bold text-primary">
              Connected Devices
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-primary/40 hover:bg-gray-100 hover:text-primary transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs">
          <p className="text-primary/70">
            These devices are currently authorized and logged into your NovaSky
            account.
          </p>

          <div className="divide-y divide-gray-100 rounded-xl border border-gray-200">
            {devices.map((dev) => (
              <div
                key={dev.id}
                className="flex items-center justify-between p-3.5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-primary/60 border border-gray-100">
                    {dev.icon === "laptop" ? (
                      <Laptop size={16} />
                    ) : (
                      <Smartphone size={16} />
                    )}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-primary">{dev.name}</p>
                      {dev.isCurrent && (
                        <span className="rounded bg-sky-50 px-1.5 py-0.5 text-[9px] font-bold text-[#0284c7] border border-sky-100">
                          This Device
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-primary/50 mt-0.5">
                      {dev.location} • {dev.os}
                    </p>
                  </div>
                </div>

                {!dev.isCurrent && (
                  <button
                    type="button"
                    onClick={() => handleRevoke(dev.id)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:underline"
                  >
                    <LogOut size={13} />
                    <span>Log Out</span>
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-btnPrimary px-5 py-2 font-bold text-white shadow-sm hover:bg-btnPrimary/90 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
