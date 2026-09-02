import { useState } from "react";
import { ChevronRight, Check, Zap, Sparkles } from "lucide-react";

const getInitials = (name) => {
  if (!name) return "AC";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const getStatusBadge = (status) => {
  const s = String(status || "").toLowerCase();
  if (s.includes("activated") || s.includes("active") || s.includes("completed")) {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 border border-emerald-200/60">
        Activated
      </span>
    );
  }
  if (s.includes("processing")) {
    return (
      <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600 border border-sky-200/60">
        Processing
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600 border border-amber-200/60">
      Pending
    </span>
  );
};

const CollaboratorActivationDetailsView = ({ activation, onBack, onStartActivation }) => {
  const [isActivating, setIsActivating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(activation?.status || "Pending");

  if (!activation) return null;

  const handleStart = () => {
    setIsActivating(true);
    setTimeout(() => {
      setCurrentStatus("Activated");
      setIsActivating(false);
      if (onStartActivation) onStartActivation(activation.id);
    }, 600);
  };

  const timelineSteps = activation.timeline || [
    { title: "Order Received", completed: true },
    { title: "SIM Provisioned", completed: currentStatus === "Activated" },
    { title: "Activation Initiated", completed: currentStatus === "Activated" },
    { title: "Line Activated", completed: currentStatus === "Activated" },
  ];

  return (
    <div className="space-y-4">
      {/* 1. Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <button
          type="button"
          onClick={onBack}
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          Activations
        </button>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        <span className="font-semibold text-slate-900">
          {activation.activationId}
        </span>
      </nav>

      {/* 2. Main White Card */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:p-8 space-y-8">
        {/* Customer Header Info & Status */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Blue Initials Avatar */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0080ff] text-sm font-bold text-white shadow-sm">
              {getInitials(activation.customer)}
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#0b1736] sm:text-2xl">
                {activation.customer}
              </h1>
              <p className="mt-0.5 text-xs text-slate-400">
                {activation.plan} · {activation.simType}
              </p>
            </div>
          </div>

          <div>{getStatusBadge(currentStatus)}</div>
        </div>

        {/* 5-Column Key-Value Info Bar */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 border-y border-slate-100/80 py-5">
          <div>
            <span className="block text-xs font-normal text-slate-400">
              Activation ID
            </span>
            <div className="mt-1 font-mono text-xs sm:text-sm font-bold text-slate-900">
              {activation.activationId}
            </div>
          </div>

          <div>
            <span className="block text-xs font-normal text-slate-400">
              Phone Number
            </span>
            <div className="mt-1 font-mono text-xs sm:text-sm font-medium text-slate-700">
              {activation.phone || "+41 79 345 67 89"}
            </div>
          </div>

          <div>
            <span className="block text-xs font-normal text-slate-400">
              SIM Type
            </span>
            <div className="mt-1 text-xs sm:text-sm font-bold text-slate-900">
              {activation.simType}
            </div>
          </div>

          <div>
            <span className="block text-xs font-normal text-slate-400">
              Started Date
            </span>
            <div className="mt-1 font-mono text-xs sm:text-sm font-bold text-slate-900">
              {activation.startDate}
            </div>
          </div>

          <div>
            <span className="block text-xs font-normal text-slate-400">
              Last Updated
            </span>
            <div className="mt-1 font-mono text-xs sm:text-sm font-bold text-slate-900">
              {activation.lastUpdated}
            </div>
          </div>
        </div>

        {/* Activation Timeline */}
        <div>
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 mb-4">
            Activation Timeline
          </h2>

          <div className="space-y-3.5">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-3">
                {step.completed ? (
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10b981] text-white shadow-2xs">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                ) : (
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[9px] text-slate-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  </div>
                )}
                <span
                  className={`text-xs sm:text-sm font-semibold ${
                    step.completed ? "text-slate-800" : "text-slate-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleStart}
            disabled={isActivating || currentStatus === "Activated"}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0f172a] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <Zap className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span>
              {isActivating
                ? "Starting Activation..."
                : currentStatus === "Activated"
                ? "Line Active"
                : "Start Activation"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollaboratorActivationDetailsView;
