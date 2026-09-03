import { Check, Edit3, X } from "lucide-react";
import { useState } from "react";

export const EditPersonalInfoModal = ({
  isOpen,
  onClose,
  personalInfo,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    fullName: personalInfo.fullName || "",
    dob: personalInfo.dob || "",
    email: personalInfo.email || "",
    phone: personalInfo.phone || "",
    address: personalInfo.address || "",
    language: personalInfo.language || "French",
  });

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100">
              <Edit3 size={18} />
            </span>
            <h3 className="text-base font-bold text-primary">
              Edit Personal Information
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

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="font-bold text-primary">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-primary focus:border-btnPrimary focus:outline-none focus:ring-2 focus:ring-btnPrimary/15"
              required
            />
          </div>

          {/* Date of Birth & Language */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-primary">Date of Birth</label>
              <input
                type="text"
                value={formData.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
                placeholder="e.g. March 12, 1990"
                className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-primary focus:border-btnPrimary focus:outline-none focus:ring-2 focus:ring-btnPrimary/15"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-primary">
                Preferred Language
              </label>
              <select
                value={formData.language}
                onChange={(e) => handleChange("language", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-primary focus:border-btnPrimary focus:outline-none"
              >
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Italian">Italian</option>
              </select>
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-1">
            <label className="font-bold text-primary">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-primary focus:border-btnPrimary focus:outline-none focus:ring-2 focus:ring-btnPrimary/15"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="font-bold text-primary">Phone Number</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-primary focus:border-btnPrimary focus:outline-none focus:ring-2 focus:ring-btnPrimary/15"
              required
            />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label className="font-bold text-primary">
              Residential Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-primary focus:border-btnPrimary focus:outline-none focus:ring-2 focus:ring-btnPrimary/15"
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
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
