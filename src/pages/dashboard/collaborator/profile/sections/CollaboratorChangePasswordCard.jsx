import { useState } from "react";
import { Eye, EyeOff, Check } from "lucide-react";

const CollaboratorChangePasswordCard = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }
    setErrorMessage("");
    setIsSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:p-7">
      {/* Card Header */}
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          CHANGE PASSWORD
        </h2>
      </div>

      {isSuccess && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-700 animate-in fade-in">
          <Check className="h-3.5 w-3.5" />
          <span>Password changed successfully!</span>
        </div>
      )}

      {errorMessage && (
        <div className="mt-4 rounded-xl bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 animate-in fade-in">
          {errorMessage}
        </div>
      )}

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Current Password */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-3.5 pr-9 text-xs font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showCurrent ? (
                  <EyeOff className="h-3.5 w-3.5" />
                ) : (
                  <Eye className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                placeholder="8+ characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-3.5 pr-9 text-xs font-medium text-slate-900 outline-none placeholder:text-slate-400 transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showNew ? (
                  <EyeOff className="h-3.5 w-3.5" />
                ) : (
                  <Eye className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-3.5 pr-9 text-xs font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {showConfirm ? (
                <EyeOff className="h-3.5 w-3.5" />
              ) : (
                <Eye className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="rounded-lg bg-[#0080ff] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-blue-600 active:scale-95 cursor-pointer"
          >
            CHANGE PASSWORD
          </button>
        </div>
      </form>
    </div>
  );
};

export default CollaboratorChangePasswordCard;
