import { useState } from "react";
import {
  ArrowRight,
  ArrowRightLeft,
  Check,
  ChevronDown,
  Copy,
  Download,
  Info,
  Layers,
  Printer,
  QrCode as QrCodeIcon,
  Shield,
  Smartphone,
  Sparkles,
} from "lucide-react";
import DashboardTabs from "@/Components/dashboard/DashboardTabs";

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
}) => {
  const [copiedField, setCopiedField] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(0);

  const handleCopy = (key, text) => {
    if (text) {
      navigator.clipboard?.writeText(text);
      setCopiedField(key);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handleDownloadQr = () => {
    // Generate a downloadable QR payload
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

    // Draw simulated QR on canvas
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

      {/* Main Container Card */}
      <div className="rounded-2xl border border-gray-200/90 bg-white p-5 sm:p-8 shadow-sm space-y-6">
        {/* TAB 1: Scan a QR Code */}
        {activeTab === "qr-code" && (
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* Left QR Code Side */}
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="rounded-2xl border-2 border-dashed border-sky-200 bg-sky-50/40 p-4 sm:p-5 shadow-sm">
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

        {/* TAB 2: Enter the code manually */}
        {activeTab === "manual-code" && (
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-bold text-primary">
                Manual eSIM Activation Details
              </h4>
              <p className="mt-0.5 text-xs text-primary/60">
                If you cannot scan the QR code, enter these credentials manually
                in your phone's cellular settings.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* SM-DP+ Address */}
              <div className="space-y-1.5 rounded-xl border border-gray-200 bg-gray-50/50 p-4">
                <label className="text-[11px] font-bold uppercase tracking-wider text-primary/50">
                  SM-DP+ Address
                </label>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-semibold text-primary break-all">
                    {esimData.smdpAddress ||
                      "LPA:1$smdp.novasky.ch$MATCHING-ID-99238472"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy("smdp", esimData.smdpAddress)}
                    className="relative shrink-0 rounded-lg p-1.5 text-primary/50 hover:bg-white hover:text-btnPrimary transition-colors"
                    aria-label="Copy SM-DP+ Address"
                  >
                    {copiedField === "smdp" ? (
                      <Check size={16} className="text-emerald-600" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* Activation Code */}
              <div className="space-y-1.5 rounded-xl border border-gray-200 bg-gray-50/50 p-4">
                <label className="text-[11px] font-bold uppercase tracking-wider text-primary/50">
                  Activation Code
                </label>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-semibold text-primary break-all">
                    {esimData.activationCode || "B284-9912-4410-8821"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy("code", esimData.activationCode)}
                    className="relative shrink-0 rounded-lg p-1.5 text-primary/50 hover:bg-white hover:text-btnPrimary transition-colors"
                    aria-label="Copy Activation Code"
                  >
                    {copiedField === "code" ? (
                      <Check size={16} className="text-emerald-600" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirmation Code */}
              <div className="space-y-1.5 rounded-xl border border-gray-200 bg-gray-50/50 p-4 sm:col-span-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-primary/50">
                  Confirmation Code
                </label>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-primary/80">
                    {esimData.confirmationCode || "Not required"}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 border border-emerald-200/50">
                    Pre-authenticated
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-blue-100 bg-sky-50/60 p-4 text-xs space-y-2">
              <p className="font-bold text-primary">
                How to enter on iPhone & Android:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-primary/70">
                <li>
                  Go to{" "}
                  <strong>
                    Settings &gt; Cellular / Mobile Data &gt; Add eSIM
                  </strong>
                  .
                </li>
                <li>
                  Choose <strong>Use QR Code</strong>, then tap{" "}
                  <strong>Enter Details Manually</strong> at the bottom.
                </li>
                <li>
                  Paste the <strong>SM-DP+ Address</strong> and{" "}
                  <strong>Activation Code</strong> from above.
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* TAB 3: Transfer from a device */}
        {activeTab === "transfer" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-primary">
                  Seamless Device-to-Device eSIM Transfer
                </h4>
                <p className="text-xs text-primary/60">
                  Transfer your NovaSky eSIM profile directly without needing to
                  re-order or contact support.
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenTransferModal}
                className="inline-flex items-center gap-2 rounded-xl bg-btnPrimary px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-btnPrimary/90 transition-colors shrink-0"
              >
                <ArrowRightLeft size={15} />
                <span>Start Transfer Wizard</span>
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-200 p-4 space-y-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-xs font-bold text-[#0284c7]">
                  1
                </span>
                <h5 className="text-xs font-bold text-primary">
                  Prepare Both Devices
                </h5>
                <p className="text-[11px] text-primary/60">
                  Ensure Bluetooth and Wi-Fi are turned on on both your old and
                  new phones.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 p-4 space-y-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-xs font-bold text-[#0284c7]">
                  2
                </span>
                <h5 className="text-xs font-bold text-primary">
                  Select Nearby Transfer
                </h5>
                <p className="text-[11px] text-primary/60">
                  On the new device, open{" "}
                  <em>
                    Cellular &gt; Add eSIM &gt; Transfer from nearby device
                  </em>
                  .
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 p-4 space-y-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-xs font-bold text-[#0284c7]">
                  3
                </span>
                <h5 className="text-xs font-bold text-primary">
                  Approve & Activate
                </h5>
                <p className="text-[11px] text-primary/60">
                  Confirm the notification on your old phone. The eSIM will
                  switch immediately.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Installation help */}
        {activeTab === "help" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-primary">
                  eSIM Installation & Troubleshooting Guide
                </h4>
                <p className="text-xs text-primary/60">
                  Step-by-step guidance for iOS, Samsung, Pixel and other
                  eSIM-capable phones.
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenGuideModal}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-btnPrimary hover:underline"
              >
                <span>Full Guide Modal</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Accordion List */}
            <div className="divide-y divide-gray-100 rounded-xl border border-gray-200">
              {[
                {
                  title: "How to install eSIM on Apple iPhone (iOS 16+)",
                  content:
                    "Go to Settings > Cellular > Add eSIM > Use QR Code. Scan the code shown on the 'Scan a QR Code' tab. When the cellular plan is added, label it as Primary or Secondary and enable Cellular Data Switching.",
                },
                {
                  title: "How to install eSIM on Samsung Galaxy & Google Pixel",
                  content:
                    "Go to Settings > Connections / Network & Internet > SIM card manager > Add mobile plan / Download a SIM. Scan the QR code with the on-screen viewfinder.",
                },
                {
                  title: "My camera cannot detect or scan the QR Code",
                  content:
                    "Increase your screen brightness and clean the camera lens. Alternatively, switch to the 'Enter the code manually' tab and copy-paste the SM-DP+ address and activation code directly into your phone settings.",
                },
                {
                  title: "Can I transfer my eSIM to another device later?",
                  content:
                    "Yes, you can transfer your eSIM anytime using the 'Transfer from a device' feature or by deleting it on the current phone and scanning the QR code on your new device.",
                },
              ].map((item, idx) => (
                <div key={idx} className="p-4">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedFaq(expandedFaq === idx ? null : idx)
                    }
                    className="flex w-full items-center justify-between text-left text-xs sm:text-sm font-bold text-primary"
                  >
                    <span>{item.title}</span>
                    <ChevronDown
                      size={16}
                      className={`text-primary/40 transition-transform ${
                        expandedFaq === idx ? "rotate-180 text-btnPrimary" : ""
                      }`}
                    />
                  </button>
                  {expandedFaq === idx && (
                    <p className="mt-2 text-xs leading-relaxed text-primary/70">
                      {item.content}
                    </p>
                  )}
                </div>
              ))}
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
    </div>
  );
};
