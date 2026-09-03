import { X } from "lucide-react";
import { useState } from "react";

export const PhoneNumberModal = ({
  isOpen,
  onClose,
  initialPhone = "+41 76 123 45 67",
  onSave,
}) => {
  const [phone, setPhone] = useState(initialPhone);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.(phone);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 sm:p-7 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-lg p-1.5 text-primary/40 hover:bg-gray-100 hover:text-primary transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="space-y-1.5 pr-6">
          <h3 className="text-xl font-bold text-primary sm:text-2xl">
            Update phone number
          </h3>
          <p className="text-xs sm:text-sm text-primary/60 leading-relaxed">
            Used for two-factor authentication and security alerts.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-primary/80">
              Phone number
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+41 76 123 45 67"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-xs sm:text-sm text-primary placeholder:text-primary/40 focus:border-[#3b99fc] focus:outline-none focus:ring-2 focus:ring-[#3b99fc]/20"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary/70 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#3b99fc] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-btnPrimary transition-colors"
            >
              Save phone number
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
