import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const getEsimStatusBadge = (status) => {
  const norm = String(status).toLowerCase();
  switch (norm) {
    case "active":
      return "bg-[#e6f4ea] text-[#137333]";
    case "suspended":
      return "bg-[#fee2e2] text-[#ef4444]";
    case "pending":
      return "bg-[#fef9c3] text-[#a16207]";
    case "reissue":
      return "bg-[#f3e8ff] text-[#7e22ce]";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const getQrStatusBadge = (status) => {
  const norm = String(status).toLowerCase();
  switch (norm) {
    case "generated":
      return "bg-[#e6f4ea] text-[#137333]";
    case "pending":
      return "bg-[#e0f2fe] text-[#0284c7]";
    case "failed":
      return "bg-[#fee2e2] text-[#ef4444]";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const EsimDetailsView = ({ profile, onBack, onStatusChange }) => {
  const [currentStatus, setCurrentStatus] = useState(
    profile?.esimStatus || "Suspended"
  );
  const [currentQrStatus, setCurrentQrStatus] = useState(
    profile?.qrStatus || "Generated"
  );

  const customerName = profile?.customer || "Sophie Meier";
  const esimId = profile?.esimId || profile?.id?.replace("esim-", "E-509") || "E-5091";
  const phone = profile?.phone || "+41 79 382 14 60";
  const activationDate = profile?.activationDate || "18 Jun 2024";
  const lineType = profile?.lineType || "Consumer eSIM";

  const handleActivate = () => {
    setCurrentStatus("Active");
    if (onStatusChange) {
      onStatusChange(profile?.id, "Active");
    }
  };

  const handleReissue = () => {
    setCurrentStatus("Reissue");
    setCurrentQrStatus("Pending");
    if (onStatusChange) {
      onStatusChange(profile?.id, "Reissue");
    }
  };

  return (
    <div className="w-full space-y-6 pb-12 text-slate-900 font-sans">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 transition-colors hover:text-sky-600"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to eSIM Profiles</span>
      </button>

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          eSIM details
        </h1>
        <p className="mt-0.5 font-mono text-xs text-slate-400">
          {esimId}
        </p>
      </div>

      {/* 1. Main Profile Card */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8 space-y-6">
        {/* Customer Info & Status Badge */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              {customerName}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
              {phone}
            </p>
          </div>

          <span
            className={`rounded-full px-3.5 py-1 text-xs font-semibold ${getEsimStatusBadge(
              currentStatus
            )}`}
          >
            {currentStatus}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100/80" />

        {/* Details Key-Value List */}
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="flex items-center justify-between py-1">
            <span className="text-slate-500">eSIM ID</span>
            <span className="font-semibold text-slate-900">{esimId}</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-500">Activation date</span>
            <span className="font-semibold text-slate-900">{activationDate}</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-500">QR status</span>
            <span
              className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${getQrStatusBadge(
                currentQrStatus
              )}`}
            >
              {currentQrStatus}
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-500">Line type</span>
            <span className="font-semibold text-slate-900">{lineType}</span>
          </div>
        </div>
      </div>

      {/* 2. QR Delivery Status Box */}
      <div className="rounded-2xl border border-sky-100 bg-[#f6fbff] p-5 sm:p-6 space-y-1">
        <h3 className="text-sm font-bold text-slate-900">
          QR delivery status
        </h3>
        <p className="text-xs sm:text-sm text-slate-500">
          QR code is ready for the customer.
        </p>
      </div>

      {/* 3. Bottom Action Buttons Row */}
      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="button"
          onClick={handleActivate}
          className="flex-1 min-w-[200px] rounded-xl bg-[#2ea5ff] py-3 px-6 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-sky-500 active:scale-95 text-center"
        >
          Activate eSIM
        </button>

        <button
          type="button"
          onClick={handleReissue}
          className="rounded-xl border border-slate-200 bg-white py-3 px-8 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95 text-center"
        >
          Reissue
        </button>
      </div>
    </div>
  );
};

export default EsimDetailsView;
