import { useState } from "react";

const PaymentGatewayCard = ({ initialData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(initialData);
  const [isTesting, setIsTesting] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleTest = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
    }, 800);
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            Payment Gateway Configuration
          </h2>
          <p className="mt-0.5 text-sm text-slate-400">
            Edit, save or cancel this configuration section.
          </p>
        </div>

        <div>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-xl bg-[#2ea5ff] px-5 py-2 text-sm font-semibold text-white hover:bg-sky-500 transition shadow-sm"
              >
                Save
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Form Fields */}
      <div className="mt-6 space-y-5">
        {/* Row 1: Gateway name & Merchant ID */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Payment gateway settings
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={data.gatewayName}
              onChange={(e) =>
                setData({ ...data, gatewayName: e.target.value })
              }
              className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm sm:text-base font-medium transition outline-none ${
                isEditing
                  ? "border-sky-400 bg-white text-slate-900 ring-1 ring-sky-400"
                  : "border-slate-100 bg-[#f8fbfe] text-slate-800"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Merchant ID
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={data.merchantId}
              onChange={(e) =>
                setData({ ...data, merchantId: e.target.value })
              }
              className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm sm:text-base font-medium transition outline-none ${
                isEditing
                  ? "border-sky-400 bg-white text-slate-900 ring-1 ring-sky-400"
                  : "border-slate-100 bg-[#f8fbfe] text-slate-800"
              }`}
            />
          </div>
        </div>

        {/* Row 2: Connection Status Box */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-100 bg-[#f8fbfe] p-4 sm:p-5 max-w-md">
          <div>
            <span className="block text-sm font-semibold text-slate-700">
              Connection status
            </span>
            <div className="mt-1.5">
              <span className="inline-block rounded-full bg-[#e0f2fe] px-3.5 py-1 text-sm font-semibold text-[#0284c7]">
                {data.status}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleTest}
            disabled={isTesting}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95"
          >
            {isTesting ? "Testing..." : "Test Connection"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentGatewayCard;
