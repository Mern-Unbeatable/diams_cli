import { Check, Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";

export const ChangePasswordModal = ({ isOpen, onClose, onSave }) => {
  const [currentPassword, setCurrentPassword] = useState("password123");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!isOpen) return null;

  // Validation rules
  const rules = {
    length: newPassword.length >= 8,
    lowercase: /[a-z]/.test(newPassword),
    uppercase: /[A-Z]/.test(newPassword),
    number: /\d/.test(newPassword),
    symbol: /[^A-Za-z0-9]/.test(newPassword),
  };

  const handleClose = () => {
    setNewPassword("");
    setConfirmPassword("");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.({ currentPassword, newPassword });
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 sm:p-7 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-5 top-5 rounded-lg p-1.5 text-primary/40 hover:bg-gray-100 hover:text-primary transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="space-y-1.5 pr-6">
          <h3 className="text-xl font-bold text-primary sm:text-2xl">
            Change password
          </h3>
          <p className="text-xs sm:text-sm text-primary/60">
            Choose a strong password you don't use anywhere else.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Current Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-primary/80">
              Current password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 pr-10 text-xs sm:text-sm text-primary placeholder:text-primary/40 focus:border-[#3b99fc] focus:outline-none focus:ring-2 focus:ring-[#3b99fc]/20"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary"
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-primary/80">
              New password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 pr-10 text-xs sm:text-sm text-primary placeholder:text-primary/40 focus:border-[#3b99fc] focus:outline-none focus:ring-2 focus:ring-[#3b99fc]/20"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary"
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Rules Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 py-1 text-[11px] text-primary/60">
            <div
              className={`flex items-center gap-1.5 ${
                rules.length ? "text-emerald-600 font-semibold" : "text-primary/45"
              }`}
            >
              {rules.length ? <Check size={13} /> : <span>✕</span>}
              <span>At least 8 characters</span>
            </div>

            <div
              className={`flex items-center gap-1.5 ${
                rules.uppercase ? "text-emerald-600 font-semibold" : "text-primary/45"
              }`}
            >
              {rules.uppercase ? <Check size={13} /> : <span>✕</span>}
              <span>One uppercase letter</span>
            </div>

            <div
              className={`flex items-center gap-1.5 ${
                rules.lowercase ? "text-emerald-600 font-semibold" : "text-primary/45"
              }`}
            >
              {rules.lowercase ? <Check size={13} /> : <span>✕</span>}
              <span>One lowercase letter</span>
            </div>

            <div
              className={`flex items-center gap-1.5 ${
                rules.number ? "text-emerald-600 font-semibold" : "text-primary/45"
              }`}
            >
              {rules.number ? <Check size={13} /> : <span>✕</span>}
              <span>One number</span>
            </div>

            <div
              className={`flex items-center gap-1.5 ${
                rules.symbol ? "text-emerald-600 font-semibold" : "text-primary/45"
              }`}
            >
              {rules.symbol ? <Check size={13} /> : <span>✕</span>}
              <span>One symbol (!@#$...)</span>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-primary/80">
              Confirm new password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 pr-10 text-xs sm:text-sm text-primary placeholder:text-primary/40 focus:border-[#3b99fc] focus:outline-none focus:ring-2 focus:ring-[#3b99fc]/20"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary/70 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#3b99fc] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-btnPrimary transition-colors"
            >
              Update password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
