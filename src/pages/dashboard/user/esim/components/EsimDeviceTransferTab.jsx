import {
  ArrowRight,
  ArrowRightLeft,
  Clock,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { USER_ESIM } from "@/config/userEsim";

const DEFAULT_DEVICE_TRANSFER = {
  tag: "DEVICE TRANSFER",
  title: "Move your eSIM to a new device",
  subtitle: "Your number and plan stay the same — only the profile moves.",
  currentDevice: {
    label: "CURRENT DEVICE",
    name: "iPhone 14 Pro",
    details: "iOS 18.2 • Active since Mar 2024",
  },
  newDevice: {
    label: "NEW DEVICE",
    name: "iPhone 16 Pro Max",
    details: "iOS 19.1 • Detected nearby",
  },
  stepsTitle: "Transfer steps",
  steps: [
    {
      id: 1,
      title: "Verify account",
      description: "Confirm your NovaSky identity with a one-time code.",
      active: true,
    },
    {
      id: 2,
      title: "Select current device",
      description: "Choose the device holding the active eSIM.",
      active: false,
    },
    {
      id: 3,
      title: "Confirm transfer",
      description: "Review the line and accept the transfer terms.",
      active: false,
    },
    {
      id: 4,
      title: "Activate on new device",
      description: "Finish setup on the receiving device.",
      active: false,
    },
  ],
  startButtonText: "Start transfer",
  estimatedTime: {
    title: "Estimated transfer time",
    value: "2–5 min",
    description:
      "Your service stays online on the current device until the new profile activates.",
  },
  supportedDevices: {
    title: "Supported devices",
    devices: [
      { brand: "Apple", models: "iPhone XS and newer, iPad Pro (2018+)" },
      { brand: "Samsung", models: "Galaxy S20 and newer, Fold / Flip series" },
      { brand: "Google", models: "Pixel 3 and newer" },
      { brand: "Other", models: "Motorola Razr, Oppo Find X, Huawei P40" },
    ],
  },
};

export const EsimDeviceTransferTab = ({ onStartTransfer }) => {
  const data = {
    ...DEFAULT_DEVICE_TRANSFER,
    ...(USER_ESIM?.deviceTransfer || {}),
  };

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {/* Left Main Card */}
      <div className="rounded-2xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-5 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Header */}
          <div>
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#38bdf8]">
              {data.tag}
            </span>
            <h3 className="mt-1 text-lg sm:text-xl font-bold text-primary">
              {data.title}
            </h3>
            <p className="mt-1 text-xs text-primary/60">{data.subtitle}</p>
          </div>

          {/* Device Transition Cards */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
            {/* Current Device */}
            <div className="flex items-center gap-3 rounded-xl border border-gray-200/80 bg-gray-50/70 p-3 sm:p-3.5 flex-1 min-w-0">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-primary/70 border border-gray-200/60 shadow-2xs">
                <Smartphone size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] sm:text-[10px] font-extrabold text-primary/45 uppercase tracking-wider">
                  {data.currentDevice?.label || "CURRENT DEVICE"}
                </p>
                <p className="text-xs sm:text-sm font-bold text-primary truncate">
                  {data.currentDevice?.name || "iPhone 14 Pro"}
                </p>
                <p className="text-[10px] sm:text-[11px] text-primary/50 truncate">
                  {data.currentDevice?.details || "iOS 18.2 • Active since Mar 2024"}
                </p>
              </div>
            </div>

            {/* Transition Arrow */}
            <div className="flex justify-center py-1 sm:py-0">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-btnPrimary text-white shadow-xs text-xs font-bold">
                <ArrowRight size={14} />
              </span>
            </div>

            {/* New Device */}
            <div className="flex items-center gap-3 rounded-xl border border-sky-200 bg-sky-50/50 p-3 sm:p-3.5 flex-1 min-w-0">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#0284c7] border border-sky-100 shadow-2xs">
                <Smartphone size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] sm:text-[10px] font-extrabold text-[#0284c7] uppercase tracking-wider">
                  {data.newDevice?.label || "NEW DEVICE"}
                </p>
                <p className="text-xs sm:text-sm font-bold text-primary truncate">
                  {data.newDevice?.name || "iPhone 16 Pro Max"}
                </p>
                <p className="text-[10px] sm:text-[11px] text-primary/50 truncate">
                  {data.newDevice?.details || "iOS 19.1 • Detected nearby"}
                </p>
              </div>
            </div>
          </div>

          {/* Transfer Steps */}
          <div className="space-y-2.5 pt-1">
            <h4 className="text-xs sm:text-sm font-bold text-primary">
              {data.stepsTitle || "Transfer steps"}
            </h4>

            <div className="space-y-2">
              {(data.steps || []).map((step) => (
                <div
                  key={step.id}
                  className={`flex items-start gap-3 rounded-xl p-3 transition-colors ${
                    step.active
                      ? "border border-sky-200 bg-sky-50/60"
                      : "border border-gray-100 bg-gray-50/40"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      step.active
                        ? "bg-btnPrimary text-white shadow-2xs"
                        : "bg-gray-100 text-primary/50"
                    }`}
                  >
                    {step.id}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-bold text-primary">
                      {step.title}
                    </h5>
                    <p className="text-[11px] text-primary/60 mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onStartTransfer}
            className="inline-flex items-center gap-2 rounded-xl bg-[#00183c] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:bg-[#00183c]/90 active:scale-[0.98]"
          >
            <ArrowRightLeft size={15} />
            <span>{data.startButtonText || "Start transfer"}</span>
          </button>
        </div>
      </div>

      {/* Right Column: Estimated transfer time & Supported devices */}
      <div className="space-y-4 flex flex-col justify-between">
        {/* Widget 1: Estimated transfer time */}
        <div className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-sm space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0284c7]">
            <Clock size={15} />
            <span>{data.estimatedTime?.title || "Estimated transfer time"}</span>
          </div>
          <h4 className="text-2xl sm:text-3xl font-extrabold text-primary">
            {data.estimatedTime?.value || "2–5 min"}
          </h4>
          <p className="text-xs text-primary/60 leading-relaxed">
            {data.estimatedTime?.description ||
              "Your service stays online on the current device until the new profile activates."}
          </p>
        </div>

        {/* Widget 2: Supported devices */}
        <div className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0284c7]">
            <ShieldCheck size={15} />
            <span>{data.supportedDevices?.title || "Supported devices"}</span>
          </div>

          <div className="space-y-2 pt-0.5 text-xs">
            {(data.supportedDevices?.devices || []).map((dev, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-gray-100 bg-gray-50/70 p-2.5 space-y-0.5"
              >
                <p className="font-bold text-primary">{dev.brand}</p>
                <p className="text-[11px] text-primary/50">{dev.models}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
