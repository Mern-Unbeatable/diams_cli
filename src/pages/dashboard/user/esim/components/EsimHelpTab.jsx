import { useState } from "react";
import {
  ChevronDown,
  Download,
  FileText,
  Headset,
  Play,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router";
import { USER_ESIM } from "@/config/userEsim";

const DEFAULT_INSTALLATION_HELP = {
  tag: "HELP CENTER",
  title: "Installation guides",
  subtitle: "Step-by-step walkthroughs for every supported platform.",
  guides: [
    {
      id: "iphone",
      name: "iPhone",
      details: "iOS 16 — iOS 19 • 6 steps",
    },
    {
      id: "android",
      name: "Android",
      details: "Android 11+ • 5 steps",
    },
    {
      id: "samsung",
      name: "Samsung",
      details: "One UI 5+ • 6 steps",
    },
    {
      id: "pixel",
      name: "Google Pixel",
      details: "Pixel 3 and newer • 5 steps",
    },
  ],
  troubleshootingTitle: "Troubleshooting",
  troubleshootingItems: [
    {
      id: "qr_fail",
      q: "QR code not working",
      a: "Make sure you have an active Wi-Fi connection, raise your screen brightness, and clean your camera lens. If scanning fails, use the 'Enter the code manually' tab.",
    },
    {
      id: "act_fail",
      q: "Activation failed",
      a: "Restart your phone and verify your software is updated to the latest OS version. Ensure carrier locks are not enabled on your device.",
    },
    {
      id: "no_sig",
      q: "No signal after install",
      a: "Toggle Airplane Mode on for 10 seconds and turn it off. Make sure Mobile Data is switched to your NovaSky line under Settings > Cellular.",
    },
    {
      id: "net_unavail",
      q: "Network unavailable",
      a: "Verify that Data Roaming is turned ON for your eSIM profile and that NovaSky APN is set to 'internet.novasky.ch'.",
    },
  ],
  videoTutorial: {
    title: "Video tutorial",
    subtitle: "Install your NovaSky eSIM in 3 minutes — full walkthrough.",
  },
  offlineResources: {
    title: "Offline resources",
    pdfButton: "Download PDF guide",
    supportButton: "Contact support",
    notice: "AVERAGE RESPONSE TIME UNDER 2 MINUTES, 24/7.",
  },
  faqTitle: "Frequently asked questions",
  faqItems: [
    {
      q: "Can I use my eSIM and a physical SIM at the same time?",
      a: "Yes! Dual SIM dual standby (DSDS) lets you keep a physical nano-SIM active alongside your NovaSky eSIM for calls, SMS, and data switching.",
    },
    {
      q: "What happens if I reset my phone?",
      a: "When performing a factory reset, select 'Keep eSIM profiles' to retain your NovaSky line. If deleted by accident, scan your QR code again to reinstall.",
    },
    {
      q: "Does the eSIM work abroad?",
      a: "Yes! Your NovaSky plan includes EU & US high-speed roaming. Roaming activates automatically when you land in covered destinations.",
    },
    {
      q: "How many transfers are included?",
      a: "eSIM device transfers and profile re-issuing are 100% free and unlimited for all NovaSky customers.",
    },
  ],
};

export const EsimHelpTab = ({ onOpenGuideModal }) => {
  const data = {
    ...DEFAULT_INSTALLATION_HELP,
    ...(USER_ESIM?.installationHelp || {}),
  };

  const [openTroubleId, setOpenTroubleId] = useState(null);
  const [openFaqIdx, setOpenFaqIdx] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleDownloadPdf = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [
        `NovaSky eSIM Installation & Setup Guide\n\n1. Connect to Wi-Fi\n2. Open Settings > Cellular > Add eSIM\n3. Scan QR Code or Enter SMDP: SMDP.NOVASKY.IO\n4. Confirm Line Label & Data Roaming\n\nFor 24/7 Support: support@novasky.ch`,
      ],
      { type: "text/plain" },
    );
    element.href = URL.createObjectURL(file);
    element.download = "NovaSky_eSIM_Installation_Guide.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-5">
      {/* 2-Column Grid for Guides & Sidebar */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Left Sub-Column: Installation Guides & Troubleshooting */}
        <div className="space-y-5">
          {/* Card 1: Installation guides */}
          <div className="rounded-xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-4">
            <div>
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#38bdf8]">
                {data.tag}
              </span>
              <h3 className="mt-1 text-lg sm:text-xl font-bold text-primary">
                {data.title}
              </h3>
              <p className="mt-1 text-xs text-primary/60">{data.subtitle}</p>
            </div>

            {/* 2x2 OS Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {(data.guides || []).map((guide) => (
                <button
                  key={guide.id}
                  type="button"
                  onClick={onOpenGuideModal}
                  className="flex items-center gap-3 rounded-xl border border-gray-200/80 bg-gray-50/70 p-3 text-left transition-all hover:bg-sky-50/60 hover:border-sky-200 group"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-primary/70 border border-gray-200/60 shadow-2xs group-hover:text-btnPrimary transition-colors">
                    <Smartphone size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-bold text-primary group-hover:text-btnPrimary transition-colors truncate">
                      {guide.name}
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-primary/50 truncate">
                      {guide.details}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Card 2: Troubleshooting */}
          <div className="rounded-xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-3.5">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles size={16} className="text-[#38bdf8]" />
              <h4 className="text-sm sm:text-base font-bold">
                {data.troubleshootingTitle}
              </h4>
            </div>

            <div className="divide-y divide-gray-100">
              {(data.troubleshootingItems || []).map((item) => (
                <div key={item.id} className="py-2.5 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenTroubleId(
                        openTroubleId === item.id ? null : item.id,
                      )
                    }
                    className="flex w-full items-center justify-between text-left text-xs font-semibold text-primary hover:text-btnPrimary transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      size={14}
                      className={`shrink-0 text-primary/40 transition-transform ${
                        openTroubleId === item.id
                          ? "rotate-180 text-btnPrimary"
                          : ""
                      }`}
                    />
                  </button>
                  {openTroubleId === item.id && (
                    <p className="mt-2 text-xs leading-relaxed text-primary/65 pr-2">
                      {item.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sub-Column: Video Tutorial & Offline Resources */}
        <div className="space-y-5">
          {/* Card 1: Video tutorial */}
          <div className="rounded-xl border border-gray-200/90 bg-white p-5 shadow-sm space-y-3.5">
            {/* Video Preview Frame */}
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              className="group relative flex h-36 sm:h-40 w-full items-center justify-center rounded-xl bg-gradient-to-br from-[#1e88e5] via-[#0284c7] to-[#0052a3] overflow-hidden shadow-inner cursor-pointer"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]" />
              {/* Play Button */}
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-md ring-4 ring-white/20 shadow-lg transition-transform group-hover:scale-110">
                <Play size={20} className="fill-white translate-x-0.5" />
              </span>
            </button>

            <div>
              <h4 className="text-xs sm:text-sm font-bold text-primary">
                {data.videoTutorial?.title || "Video tutorial"}
              </h4>
              <p className="text-[11px] sm:text-xs text-primary/60 mt-0.5 leading-relaxed">
                {data.videoTutorial?.subtitle ||
                  "Install your NovaSky eSIM in 3 minutes — full walkthrough."}
              </p>
            </div>
          </div>

          {/* Card 2: Offline resources */}
          <div className="rounded-xl border border-gray-200/90 bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <FileText size={16} className="text-[#0284c7]" />
              <h4 className="text-xs sm:text-sm font-bold">
                {data.offlineResources?.title || "Offline resources"}
              </h4>
            </div>

            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-primary transition-all hover:bg-gray-50 shadow-2xs"
              >
                <Download size={14} className="text-primary/60" />
                <span>
                  {data.offlineResources?.pdfButton || "Download PDF guide"}
                </span>
              </button>

              <Link
                to="/dashboard/user/support"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00183c] px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-[#00183c]/90"
              >
                <Headset size={14} />
                <span>
                  {data.offlineResources?.supportButton || "Contact support"}
                </span>
              </Link>
            </div>

            <p className="text-[9px] font-bold text-primary/40 uppercase tracking-wider text-center pt-1">
              {data.offlineResources?.notice ||
                "AVERAGE RESPONSE TIME UNDER 2 MINUTES, 24/7."}
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Card */}
      <div className="rounded-xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-3.5">
        <h4 className="text-sm sm:text-base font-bold text-primary">
          {data.faqTitle || "Frequently asked questions"}
        </h4>

        <div className="divide-y divide-gray-100">
          {(data.faqItems || []).map((faq, idx) => (
            <div key={idx} className="py-3 first:pt-0 last:pb-0">
              <button
                type="button"
                onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                className="flex w-full items-center justify-between text-left text-xs font-semibold text-primary hover:text-btnPrimary transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={15}
                  className={`shrink-0 text-primary/40 transition-transform ${
                    openFaqIdx === idx ? "rotate-180 text-btnPrimary" : ""
                  }`}
                />
              </button>
              {openFaqIdx === idx && (
                <p className="mt-2 text-xs leading-relaxed text-primary/65 pr-2">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Simulation */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-xl border border-gray-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-primary">
                eSIM Video Walkthrough
              </h3>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="rounded-lg p-1 text-primary/40 hover:bg-gray-100 hover:text-primary"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video w-full rounded-xl bg-slate-900 flex flex-col items-center justify-center text-white p-4 text-center">
              <div className="h-16 w-16 rounded-full bg-btnPrimary flex items-center justify-center mb-3 shadow-lg shadow-sky-500/30">
                <Play size={26} className="fill-white translate-x-0.5" />
              </div>
              <p className="text-sm font-bold">
                NovaSky eSIM Setup in 3 Minutes
              </p>
              <p className="text-xs text-white/60 mt-1">
                Visual demonstration covering QR scanning, profile naming, and
                roaming setup.
              </p>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="rounded-xl bg-btnPrimary px-4 py-2 text-xs font-bold text-white hover:bg-btnPrimary/90"
              >
                Close Video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
