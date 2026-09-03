import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";

export const PERMISSION_MODULES = [
  "Overview / Analytics",
  "Customer",
  "Orders",
  "Identity Verification",
  "Plan",
  "Add-ons",
  "eSIM Management",
  "Billing & Payment",
  "Support Center",
  "CMS Management",
  "Reports & Analytics",
  "System Settings",
];

const EditUserModal = ({ isOpen, onClose, user, onSave }) => {
  const [selectedPermissions, setSelectedPermissions] = useState([
    "Overview / Analytics",
  ]);
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    if (user) {
      setStatus(user.status || "Active");
      if (user.access) {
        setSelectedPermissions([
          user.access.includes("Overview")
            ? "Overview / Analytics"
            : user.access,
        ]);
      } else {
        setSelectedPermissions(["Overview / Analytics"]);
      }
    }
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  const togglePermission = (moduleName) => {
    setSelectedPermissions((prev) =>
      prev.includes(moduleName)
        ? prev.filter((p) => p !== moduleName)
        : [...prev, moduleName],
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(user.id, {
        status,
        permissions: selectedPermissions,
        access: selectedPermissions[0] || "Overview",
      });
    }
    onClose();
  };

  const title = user.role
    ? user.role.toLowerCase().includes("access")
      ? user.role
      : `${user.role} access`
    : "Moderator access";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-sm sm:max-w-md overflow-hidden rounded-xl bg-white p-5 shadow-2xl transition-all sm:p-6 z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Checkbox List with compact spacing & no unnecessary scrollbar */}
        <div className="mt-3.5 space-y-2.5">
          {PERMISSION_MODULES.map((moduleName) => {
            const isChecked = selectedPermissions.includes(moduleName);
            return (
              <label
                key={moduleName}
                onClick={() => togglePermission(moduleName)}
                className="flex items-center gap-3 cursor-pointer select-none group py-0.5"
              >
                <div
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded transition-all ${
                    isChecked
                      ? "bg-[#2ea5ff] border border-[#2ea5ff] text-white"
                      : "border-2 border-slate-300 bg-white group-hover:border-slate-400"
                  }`}
                >
                  {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
                <span className="text-xs font-semibold text-slate-800 sm:text-[13px]">
                  {moduleName}
                </span>
              </label>
            );
          })}
        </div>

        {/* Action Buttons Row */}
        <div className="mt-4 flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setStatus("Active")}
            className={`rounded-xl px-4 py-1.5 text-xs font-semibold transition-all ${
              status === "Active"
                ? "border border-sky-400 bg-sky-50 text-sky-600 shadow-sm"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            Active
          </button>

          <button
            type="button"
            onClick={() => setStatus("Disabled")}
            className={`rounded-xl px-4 py-1.5 text-xs font-semibold transition-all ${
              status === "Disabled"
                ? "border border-rose-400 bg-rose-50 text-rose-600 shadow-sm"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            Disabled
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-[#2ea5ff] px-6 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-sky-500 active:scale-95"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
