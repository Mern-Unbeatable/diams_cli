import { Camera, Check, UploadCloud, X } from "lucide-react";
import { useState } from "react";

export const UploadAvatarModal = ({
  isOpen,
  onClose,
  currentInitials,
  onSave,
}) => {
  const [initials, setInitials] = useState(currentInitials || "AM");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initials.trim()) {
      onSave(initials.trim().toUpperCase());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100">
              <Camera size={18} />
            </span>
            <h3 className="text-base font-bold text-primary">Profile Photo</h3>
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
          {/* Avatar Preview */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1e88e5] text-2xl font-bold text-white shadow-md">
              {initials.slice(0, 2).toUpperCase() || "AM"}
            </div>
            <p className="text-[11px] text-primary/50">Avatar Preview</p>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-primary">Avatar Initials</label>
            <input
              type="text"
              maxLength={2}
              value={initials}
              onChange={(e) => setInitials(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-center text-sm font-bold text-primary uppercase focus:border-btnPrimary focus:outline-none"
              required
            />
          </div>

          {/* Upload Placeholder Box */}
          <div className="rounded-xl border-2 border-dashed border-sky-200 bg-sky-50/50 p-4 text-center space-y-1 cursor-pointer hover:bg-sky-50 transition-colors">
            <UploadCloud size={22} className="mx-auto text-btnPrimary" />
            <p className="font-bold text-primary text-xs">Upload New Image</p>
            <p className="text-[10px] text-primary/50">JPG, PNG or GIF, max 5MB</p>
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
              <span>Save Photo</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
