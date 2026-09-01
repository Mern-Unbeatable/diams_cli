import {
  Calendar,
  Check,
  ChevronRight,
  Copy,
  CreditCard,
  KeyRound,
  Lock,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

export const AccountInfoCard = ({
  accountInfo,
  onChangePassword,
  onChangePin,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAccount = () => {
    if (accountInfo?.accountNumber) {
      navigator.clipboard?.writeText(accountInfo.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="rounded-2xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-4">
      <h3 className="text-base sm:text-lg font-bold text-primary">
        Account Information
      </h3>

      <div className="divide-y divide-gray-100">
        {/* Account Number */}
        <div className="flex items-center justify-between py-3 first:pt-0">
          <div className="flex items-center gap-3.5 min-w-0">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-primary/60 border border-gray-100">
              <CreditCard size={15} />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-primary/45">
                Account Number
              </p>
              <div className="flex items-center gap-2">
                <p className="text-xs sm:text-sm font-bold text-primary font-mono truncate">
                  {accountInfo.accountNumber}
                </p>
                <button
                  type="button"
                  onClick={handleCopyAccount}
                  className="relative p-1 text-primary/40 hover:text-btnPrimary transition-colors"
                  aria-label="Copy Account Number"
                >
                  {copied ? (
                    <Check size={13} className="text-emerald-600" />
                  ) : (
                    <Copy size={13} />
                  )}
                  {copied && (
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-white shadow">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Account Type */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3.5 min-w-0">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-primary/60 border border-gray-100">
              <Sparkles size={15} className="text-[#0284c7]" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-primary/45">
                Account Type
              </p>
              <p className="text-xs sm:text-sm font-bold text-primary truncate">
                {accountInfo.accountType} {accountInfo.accountTypeBadge || "💎"}
              </p>
            </div>
          </div>
          <ChevronRight size={15} className="text-primary/30 shrink-0" />
        </div>

        {/* Member Since */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3.5 min-w-0">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-primary/60 border border-gray-100">
              <Calendar size={15} />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-primary/45">
                Member Since
              </p>
              <p className="text-xs sm:text-sm font-bold text-primary truncate">
                {accountInfo.memberSince}
              </p>
            </div>
          </div>
          <ChevronRight size={15} className="text-primary/30 shrink-0" />
        </div>

        {/* Password */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3.5 min-w-0">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-primary/60 border border-gray-100">
              <Lock size={15} />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-primary/45">
                Password
              </p>
              <p className="text-xs sm:text-sm font-bold text-primary font-mono tracking-widest truncate">
                {accountInfo.passwordMasked || "••••••••••••"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onChangePassword}
            className="inline-flex items-center gap-0.5 text-xs font-semibold text-btnPrimary hover:underline"
          >
            <span>Change</span>
            <ChevronRight size={13} />
          </button>
        </div>

        {/* Line PIN */}
        <div className="flex items-center justify-between py-3 last:pb-0">
          <div className="flex items-center gap-3.5 min-w-0">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-primary/60 border border-gray-100">
              <KeyRound size={15} />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-primary/45">
                Line PIN
              </p>
              <p className="text-xs sm:text-sm font-bold text-primary font-mono tracking-widest truncate">
                {accountInfo.pinMasked || "••••"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onChangePin}
            className="inline-flex items-center gap-0.5 text-xs font-semibold text-btnPrimary hover:underline"
          >
            <span>Change</span>
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
};
