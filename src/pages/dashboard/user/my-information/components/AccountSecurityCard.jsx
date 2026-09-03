import { ArrowRight, ChevronRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router";

export const AccountSecurityCard = ({ securitySummary }) => {
  return (
    <section className="rounded-xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 text-primary">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-[#0284c7]">
          <ShieldCheck size={16} />
        </span>
        <h3 className="text-sm sm:text-base font-bold">Account Security</h3>
      </div>

      <div className="divide-y divide-gray-100 text-xs">
        {/* Two-Factor Authentication */}
        <Link
          to="/dashboard/user/security"
          className="flex items-center justify-between py-3 first:pt-0 hover:opacity-80 transition-opacity"
        >
          <div>
            <p className="font-bold text-primary">Two-Factor Authentication</p>
            <p className="text-[11px] font-semibold text-emerald-600 mt-0.5">
              {securitySummary?.twoFactor || "Enabled"}
            </p>
          </div>
          <ChevronRight size={14} className="text-primary/30 shrink-0" />
        </Link>

        {/* Secure Login */}
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="font-bold text-primary">Secure Login</p>
            <p className="text-[11px] text-primary/50 mt-0.5">
              {securitySummary?.secureLogin || "All your logins are protected."}
            </p>
          </div>
          <span className="inline-flex items-center rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600 border border-emerald-200/50">
            {securitySummary?.secureLoginStatus || "Active"}
          </span>
        </div>

        {/* Connected Devices */}
        <Link
          to="/dashboard/user/security"
          className="flex items-center justify-between py-3 hover:opacity-80 transition-opacity"
        >
          <div>
            <p className="font-bold text-primary">Connected Devices</p>
            <p className="text-[11px] text-primary/50 mt-0.5">
              {securitySummary?.connectedDevices || "3 Devices"}
            </p>
          </div>
          <ChevronRight size={14} className="text-primary/30 shrink-0" />
        </Link>

        {/* Active Sessions */}
        <Link
          to="/dashboard/user/security"
          className="flex items-center justify-between py-3 last:pb-0 hover:opacity-80 transition-opacity"
        >
          <div>
            <p className="font-bold text-primary">Active Sessions</p>
            <p className="text-[11px] text-primary/50 mt-0.5">
              {securitySummary?.activeSessions || "1 Active Session"}
            </p>
          </div>
          <ChevronRight size={14} className="text-primary/30 shrink-0" />
        </Link>
      </div>

      <div className="pt-2 border-t border-gray-100">
        <Link
          to="/dashboard/user/security"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-btnPrimary hover:underline"
        >
          <span>View all security options</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </section>
  );
};
