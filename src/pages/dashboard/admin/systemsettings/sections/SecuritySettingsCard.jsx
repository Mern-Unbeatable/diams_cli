import { useState } from "react";
import { Check } from "lucide-react";

const SecuritySettingsCard = ({ initialData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [require2fa, setRequire2fa] = useState(initialData.require2fa);
  const [sessionTimeout, setSessionTimeout] = useState(
    initialData.sessionTimeout,
  );
  const [securityConfig, setSecurityConfig] = useState(
    initialData.securityConfig,
  );

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-6 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            Security Settings
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
        {/* Row 1: 2FA checkbox & Session Timeout */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 items-end">
          <div
            onClick={() => isEditing && setRequire2fa(!require2fa)}
            className={`flex items-center gap-3.5 rounded-xl border p-4 transition ${
              isEditing ? "cursor-pointer" : "cursor-default"
            } ${
              require2fa
                ? "border-slate-200 bg-[#f8fbfe]"
                : "border-slate-100 bg-white"
            }`}
          >
            <div
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded transition ${
                require2fa
                  ? "bg-[#2ea5ff] border border-[#2ea5ff] text-white"
                  : "border-2 border-slate-300 bg-white"
              }`}
            >
              {require2fa && <Check className="h-3 w-3 stroke-[3]" />}
            </div>
            <span className="text-sm sm:text-base font-semibold text-slate-800">
              Require two-factor authentication
            </span>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Session timeout minutes
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm sm:text-base font-medium transition outline-none ${
                isEditing
                  ? "border-sky-400 bg-white text-slate-900 ring-1 ring-sky-400"
                  : "border-slate-100 bg-[#f8fbfe] text-slate-800"
              }`}
            />
          </div>
        </div>

        {/* Row 2: Security configuration */}
        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Security configuration
          </label>
          <input
            type="text"
            disabled={!isEditing}
            value={securityConfig}
            onChange={(e) => setSecurityConfig(e.target.value)}
            className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm sm:text-base font-medium transition outline-none ${
              isEditing
                ? "border-sky-400 bg-white text-slate-900 ring-1 ring-sky-400"
                : "border-slate-100 bg-[#f8fbfe] text-slate-800"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default SecuritySettingsCard;
