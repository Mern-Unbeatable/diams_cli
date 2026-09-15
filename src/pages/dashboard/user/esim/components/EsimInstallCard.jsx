import { ArrowRightLeft, Info } from "lucide-react";
import DashboardTabs from "@/Components/dashboard/DashboardTabs";
import { EsimManualEntryTab } from "./EsimManualEntryTab";
import { EsimDeviceTransferTab } from "./EsimDeviceTransferTab";
import { EsimHelpTab } from "./EsimHelpTab";

// Crisp SVG QR Code component
const VectorQrCode = () => (
  <svg
    viewBox="0 0 200 200"
    className="h-44 w-44 sm:h-52 sm:w-52 transition-transform duration-300 hover:scale-105"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="200" height="200" fill="#ffffff" rx="12" />

    {/* Corner Finder Top-Left */}
    <rect x="16" y="16" width="48" height="48" rx="6" fill="#00183c" />
    <rect x="24" y="24" width="32" height="32" rx="4" fill="#ffffff" />
    <rect x="32" y="32" width="16" height="16" rx="2" fill="#00183c" />

    {/* Corner Finder Top-Right */}
    <rect x="136" y="16" width="48" height="48" rx="6" fill="#00183c" />
    <rect x="144" y="24" width="32" height="32" rx="4" fill="#ffffff" />
    <rect x="152" y="32" width="16" height="16" rx="2" fill="#00183c" />

    {/* Corner Finder Bottom-Left */}
    <rect x="16" y="136" width="48" height="48" rx="6" fill="#00183c" />
    <rect x="24" y="144" width="32" height="32" rx="4" fill="#ffffff" />
    <rect x="32" y="152" width="16" height="16" rx="2" fill="#00183c" />

    {/* Aligners & Timing lines */}
    <rect x="76" y="24" width="8" height="8" fill="#00183c" />
    <rect x="92" y="24" width="8" height="8" fill="#00183c" />
    <rect x="108" y="24" width="8" height="8" fill="#00183c" />
    <rect x="24" y="76" width="8" height="8" fill="#00183c" />
    <rect x="24" y="92" width="8" height="8" fill="#00183c" />
    <rect x="24" y="108" width="8" height="8" fill="#00183c" />

    {/* Matrix Pattern Dots / Data Blocks */}
    <rect x="76" y="44" width="8" height="8" fill="#00183c" />
    <rect x="84" y="52" width="8" height="8" fill="#00183c" />
    <rect x="100" y="44" width="8" height="8" fill="#00183c" />
    <rect x="116" y="36" width="8" height="8" fill="#00183c" />

    <rect x="44" y="76" width="8" height="8" fill="#00183c" />
    <rect x="52" y="84" width="8" height="8" fill="#00183c" />
    <rect x="36" y="100" width="8" height="8" fill="#00183c" />

    {/* Center Cluster */}
    <rect x="72" y="72" width="56" height="56" rx="8" fill="#0284c7" />
    <rect x="78" y="78" width="44" height="44" rx="6" fill="#ffffff" />

    {/* NovaSky Chip Logo inside QR */}
    <g transform="translate(86, 86)">
      <rect width="28" height="28" rx="5" fill="#00183c" />
      <path
        d="M6 14h16M14 6v16M10 10l8 8M18 10l-8 8"
        stroke="#38bdf8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="14" cy="14" r="3" fill="#ffffff" />
    </g>

    {/* Additional Matrix Details */}
    <rect x="136" y="76" width="8" height="8" fill="#00183c" />
    <rect x="152" y="84" width="8" height="8" fill="#00183c" />
    <rect x="168" y="76" width="8" height="8" fill="#00183c" />
    <rect x="144" y="100" width="8" height="8" fill="#00183c" />
    <rect x="160" y="108" width="8" height="8" fill="#00183c" />
    <rect x="176" y="100" width="8" height="8" fill="#00183c" />

    <rect x="76" y="136" width="8" height="8" fill="#00183c" />
    <rect x="92" y="144" width="8" height="8" fill="#00183c" />
    <rect x="108" y="136" width="8" height="8" fill="#00183c" />
    <rect x="84" y="160" width="8" height="8" fill="#00183c" />
    <rect x="100" y="168" width="8" height="8" fill="#00183c" />
    <rect x="116" y="156" width="8" height="8" fill="#00183c" />

    <rect x="136" y="136" width="16" height="8" fill="#00183c" />
    <rect x="160" y="144" width="8" height="16" fill="#00183c" />
    <rect x="144" y="168" width="16" height="8" fill="#00183c" />
    <rect x="168" y="168" width="8" height="8" fill="#00183c" />
  </svg>
);

export const EsimInstallCard = ({
  installTabs,
  activeTab,
  setActiveTab,
  esimData,
  onOpenTransferModal,
  onActivationSuccess,
  onOpenGuideModal,
}) => {
  return (
    <div className="min-w-0 space-y-4">
      <div>
        <h2 className="text-lg font-bold text-primary sm:text-xl">
          Install your eSIM
        </h2>
        <p className="text-xs text-primary/60 sm:text-sm">
          Choose an installation method
        </p>
      </div>

      <DashboardTabs
        tabs={installTabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "manual-code" ? (
        <EsimManualEntryTab
          esimData={esimData}
          onActivationSuccess={onActivationSuccess}
        />
      ) : activeTab === "transfer" ? (
        <EsimDeviceTransferTab onStartTransfer={onOpenTransferModal} />
      ) : activeTab === "help" ? (
        <EsimHelpTab onOpenGuideModal={onOpenGuideModal} />
      ) : (
        <div className="space-y-6 rounded-xl border border-gray-200/90 bg-white p-5 shadow-sm sm:p-8">
          {activeTab === "qr-code" && (
            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="rounded-xl border-2 border-dashed border-sky-200 bg-sky-50/40 p-4 shadow-sm sm:p-5">
                  <VectorQrCode />
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#0284c7] sm:text-base">
                    Scan this QR Code
                  </h4>
                  <p className="mx-auto max-w-xs text-xs text-primary/60">
                    Open the camera or QR code reader on your smartphone.
                  </p>
                </div>
              </div>

              <div className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 flex-col items-center lg:flex">
                <div className="h-28 w-px bg-gray-200" />
                <div className="my-2 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-xs font-medium text-primary/50 shadow-xs">
                  or
                </div>
                <div className="h-28 w-px bg-gray-200" />
              </div>

              <div className="flex items-center justify-center gap-3 lg:hidden">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-xs font-medium text-primary/50">
                  or
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <div className="flex flex-col items-center justify-center space-y-4 text-center lg:px-6">
                <div className="max-w-sm space-y-2">
                  <h4 className="text-base font-bold text-primary sm:text-lg">
                    Do you already have an eSIM on another device?
                  </h4>
                  <p className="text-xs text-primary/60">
                    Easily transfer your eSIM to your new device.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onOpenTransferModal}
                  className="inline-flex items-center gap-2 rounded-xl border border-sky-300 bg-white px-5 py-2.5 text-xs font-semibold text-[#0284c7] shadow-sm transition-all hover:border-sky-400 hover:bg-sky-50 sm:text-sm"
                >
                  <ArrowRightLeft size={16} />
                  <span>Transfer my eSIM</span>
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-[#eef7ff] p-3 text-xs text-primary/80 sm:p-3.5">
            <Info size={18} className="shrink-0 text-btnPrimary" />
            <p className="text-[11px] sm:text-xs">
              Make sure you have a stable internet connection to install your
              eSIM.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
