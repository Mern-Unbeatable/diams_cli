import { useState, useRef } from "react";
import { Camera, Check } from "lucide-react";

const CollaboratorAccountSettingsCard = () => {
  const [firstName, setFirstName] = useState("Kevin");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("customer@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("+1-202-555-0118");
  const [avatarUrl, setAvatarUrl] = useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
  );
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:p-7">
      {/* Card Header */}
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          ACCOUNT SETTING
        </h2>
      </div>

      {isSaved && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-700 animate-in fade-in">
          <Check className="h-3.5 w-3.5" />
          <span>Account details updated successfully!</span>
        </div>
      )}

      {/* Card Body */}
      <form onSubmit={handleSave} className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Left: Avatar with Camera Edit Icon */}
        <div className="relative mx-auto shrink-0 lg:mx-0">
          <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[#0284c7] p-1.5 shadow-md">
            <img
              src={avatarUrl}
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Change photo"
            className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-600 shadow-md ring-2 ring-white hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Camera className="h-3.5 w-3.5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Right: Input Fields Grid */}
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                First name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Last name
              </label>
              <input
                type="text"
                placeholder="Display name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-900 outline-none placeholder:text-slate-400 transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="rounded-lg bg-[#0080ff] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-blue-600 active:scale-95 cursor-pointer"
            >
              SAVE CHANGES
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CollaboratorAccountSettingsCard;
