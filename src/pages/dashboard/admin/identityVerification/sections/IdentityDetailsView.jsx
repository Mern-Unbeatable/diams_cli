import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const getStatusBadge = (status) => {
  const norm = String(status).toLowerCase().trim();
  switch (norm) {
    case "pending":
      return "bg-[#e0f7fa] text-[#0097a7]";
    case "approved":
      return "bg-[#e8f0fe] text-[#3b82f6]";
    case "rejected":
      return "bg-[#fee2e2] text-[#ef4444]";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const IdentityDetailsView = ({
  item,
  onBack,
  onApprove,
  onReject,
  onSaveComment,
}) => {
  const [comment, setComment] = useState(item?.comment || "");

  if (!item) return null;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-sky-600 transition-colors hover:text-sky-700"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Identity Verification</span>
      </button>

      {/* Main Container Card */}
      <div className="space-y-6 rounded-xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:p-8">
        {/* Top Review Title & Ref */}
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
            Verification review
          </h2>
          <p className="mt-0.5 font-mono text-xs text-slate-400">
            {item.verificationId || "V-8841"} |{" "}
            {item.relatedOrder || "NS-240618-047"}
          </p>
        </div>

        {/* Customer Name, Timestamp & Status Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {item.customer}
            </h1>
            <p className="mt-0.5 text-xs text-slate-400">
              Submitted {item.submittedTime || `${item.submittedDate}, 08:32`}
            </p>
          </div>

          <span
            className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium tracking-tight ${getStatusBadge(
              item.status,
            )}`}
          >
            {item.status}
          </span>
        </div>

        {/* 2 Document Preview Cards (Uploaded ID & Selfie) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Box 1: Uploaded ID */}
          <div className="rounded-xl border border-dashed border-slate-200/90 bg-white p-6 text-center transition-colors hover:border-slate-300">
            <h3 className="text-sm font-bold text-slate-900">Uploaded ID</h3>
            <p className="mt-0.5 text-xs text-slate-400">
              {item.uploadedIdType || "Swiss identity card"}
            </p>
            <button
              type="button"
              className="mt-2 inline-block text-xs font-semibold text-sky-500 hover:underline"
            >
              Preview
            </button>
          </div>

          {/* Box 2: Selfie */}
          <div className="rounded-xl border border-dashed border-slate-200/90 bg-white p-6 text-center transition-colors hover:border-slate-300">
            <h3 className="text-sm font-bold text-slate-900">Selfie</h3>
            <p className="mt-0.5 text-xs text-slate-400">Face match ready</p>
            <button
              type="button"
              className="mt-2 inline-block text-xs font-semibold text-sky-500 hover:underline"
            >
              Preview
            </button>
          </div>
        </div>

        {/* CUSTOMER INFORMATION Section */}
        <div className="space-y-3.5 rounded-xl border border-slate-100/90 bg-[#f8fafc]/60 p-5 sm:p-6">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Customer Information
          </h2>

          <div className="space-y-2.5 text-xs sm:text-[13px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Full name</span>
              <span className="font-semibold text-slate-900">
                {item.customer}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Document type</span>
              <span className="font-semibold text-slate-900">
                {item.documentTypeRaw ||
                  item.documentType?.replace(/\s+/g, "_")}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Related order</span>
              <span className="font-mono font-semibold text-slate-900">
                {item.relatedOrder || "NS-240618-047"}
              </span>
            </div>
          </div>
        </div>

        {/* ADD COMMENT Section */}
        <div className="space-y-3 rounded-xl border border-slate-100/90 bg-[#f8fafc]/60 p-5 sm:p-6">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Add Comment
          </h2>

          <div>
            <input
              type="text"
              placeholder="Write a Comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                if (onSaveComment) onSaveComment(item.id, e.target.value);
              }}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onApprove && onApprove(item)}
            className="rounded-xl bg-[#2ea5ff] px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-sky-600 active:scale-95 sm:text-sm"
          >
            Approve
          </button>

          <button
            type="button"
            onClick={() => onReject && onReject(item)}
            className="rounded-xl bg-[#e11d48] px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-rose-700 active:scale-95 sm:text-sm"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdentityDetailsView;
