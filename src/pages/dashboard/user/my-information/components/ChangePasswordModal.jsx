import { Check, Lock, X } from "lucide-react";
import { useState } from "react";

export const ChangePasswordModal = ({ isOpen, onClose, onSuccess }) => {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPass.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (newPass !== confirmPass) {
      setError("New passwords do not match.");
      return;
    }
    setError("");
    onSuccess?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100">
              <Lock size={18} />
            </span>
            <h3 className="text-base font-bold text-primary">
              Change Password
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-primary/40 hover:bg-gray-100 hover:text-primary transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50/80 p-2.5 text-rose-700 font-semibold">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="font-bold text-primary">Current Password</label>
            <input
              type="password"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 font-semibold text-primary focus:border-btnPrimary focus:outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-primary">New Password</label>
            <input
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 font-semibold text-primary focus:border-btnPrimary focus:outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-primary">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 font-semibold text-primary focus:border-btnPrimary focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-4 py-2 font-semibold text-primary/70 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-btnPrimary px-5 py-2 font-bold text-white shadow-sm hover:bg-btnPrimary/90 transition-colors"
            >
              <Check size={14} />
              <span>Update Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
