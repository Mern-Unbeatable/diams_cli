import { useState } from "react";
import { ArrowRightLeft, Download, Info, Printer } from "lucide-react";
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
  onOpenGuideModal,
  onActivationSuccess,
}) => {
  const handleDownloadQr = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 400, 400);
    ctx.fillStyle = "#00183c";
    ctx.font = "bold 18px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("NovaSky eSIM Activation QR", 200, 40);
    ctx.fillText(esimData?.number || "+41 76 123 45 67", 200, 70);

    ctx.fillStyle = "#00183c";
    ctx.fillRect(50, 100, 300, 240);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(60, 110, 280, 220);
    ctx.fillStyle = "#00183c";
    ctx.fillRect(80, 130, 80, 80);
    ctx.fillRect(240, 130, 80, 80);
    ctx.fillRect(80, 230, 80, 80);

    const link = document.createElement("a");
    link.download = `novasky-esim-qr-${esimData?.number?.replace(/\s+/g, "") || "profile"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-primary">
          Install your eSIM
        </h2>
        <p className="text-xs sm:text-sm text-primary/60">
          Choose an installation method
        </p>
      </div>

      {/* Tabs Header */}
      <DashboardTabs
        tabs={installTabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* TAB 2: Enter the code manually -> 2-column Manual Entry layout */}
      {activeTab === "manual-code" ? (
        <EsimManualEntryTab
          esimData={esimData}
          onActivationSuccess={onActivationSuccess}
        />
      ) : activeTab === "transfer" ? (
        /* TAB 3: Transfer from a device -> 2-column Device Transfer layout */
        <EsimDeviceTransferTab onStartTransfer={onOpenTransferModal} />
      ) : activeTab === "help" ? (
        /* TAB 4: Installation help -> Full Walkthrough, Troubleshooting, Video, Offline & FAQ layout */
        <EsimHelpTab onOpenGuideModal={onOpenGuideModal} />
      ) : (
        /* Container Card for QR Code tab */
        <div className="rounded-xl border border-gray-200/90 bg-white p-5 sm:p-8 shadow-sm space-y-6">
          {/* TAB 1: Scan a QR Code */}
          {activeTab === "qr-code" && (
            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
              {/* Left QR Code Side */}
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="rounded-xl border-2 border-dashed border-sky-200 bg-sky-50/40 p-4 sm:p-5 shadow-sm">
                  <VectorQrCode />
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm sm:text-base font-bold text-[#0284c7]">
                    Scan this QR Code with your device
                  </h4>
                  <p className="text-xs text-primary/60 max-w-xs mx-auto">
                    Open the camera or QR code reader on your smartphone.
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleDownloadQr}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-primary/70 transition-colors hover:bg-gray-50 hover:text-primary shadow-xs"
                  >
                    <Download size={13} className="text-primary/50" />
                    <span>Save QR</span>
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-primary/70 transition-colors hover:bg-gray-50 hover:text-primary shadow-xs"
                  >
                    <Printer size={13} className="text-primary/50" />
                    <span>Print</span>
                  </button>
                </div>
              </div>

              {/* Central "ou" Divider on Desktop */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex-col items-center">
                <div className="h-28 w-px bg-gray-200" />
                <div className="my-2 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-xs font-medium text-primary/50 shadow-xs">
                  ou
                </div>
                <div className="h-28 w-px bg-gray-200" />
              </div>

              {/* Mobile Divider */}
              <div className="flex lg:hidden items-center justify-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-xs text-primary/50 font-medium">
                  ou
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Right Transfer Side */}
              <div className="flex flex-col items-center justify-center text-center lg:px-6 space-y-4">
                <div className="space-y-2 max-w-sm">
                  <h4 className="text-base sm:text-lg font-bold text-primary">
                    Do you already have an eSIM on another device?
                  </h4>
                  <p className="text-xs text-primary/60">
                    Easily transfer your eSIM to your new device.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onOpenTransferModal}
                  className="inline-flex items-center gap-2 rounded-xl border border-sky-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#0284c7] transition-all hover:bg-sky-50 hover:border-sky-400 shadow-sm"
                >
                  <ArrowRightLeft size={16} />
                  <span>Transfer my eSIM</span>
                </button>
              </div>
            </div>
          )}

          {/* Bottom Banner Notice */}
          <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-[#eef7ff] p-3 sm:p-3.5 text-xs text-primary/80">
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
