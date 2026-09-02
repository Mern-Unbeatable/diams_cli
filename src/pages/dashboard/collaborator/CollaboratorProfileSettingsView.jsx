import { useState } from "react";
import { User, Shield, Bell, Key, Save } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const CollaboratorProfileSettingsView = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "Jordan Lee");
  const [email, setEmail] = useState(user?.email || "collaborator@novasky.com");
  const [phone, setPhone] = useState("+41 78 990 12 34");
  const [partnerId] = useState("COLLAB-7729");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-full space-y-6 text-slate-900 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0b1736] sm:text-[28px]">
          Profile & Settings
        </h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Manage your collaborator partner account details and preferences.
        </p>
      </div>

      {isSaved && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-xs font-semibold text-emerald-700 animate-in fade-in">
          ✓ Profile settings updated successfully!
        </div>
      )}

      {/* Main Settings Card */}
      <form
        onSubmit={handleSave}
        className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:p-8 space-y-6"
      >
        {/* Profile Card Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0080ff] text-lg font-bold text-white shadow-sm">
            JL
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">{name}</h2>
            <p className="text-xs text-slate-400">
              Partner ID: <span className="font-mono text-slate-700">{partnerId}</span>
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Partner Role
            </label>
            <input
              type="text"
              disabled
              value="Official NovaSky Collaborator"
              className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-500 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0080ff] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-600 active:scale-95 cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CollaboratorProfileSettingsView;
