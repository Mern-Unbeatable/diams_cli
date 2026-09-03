import {
  ChevronRight,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router";

export const SecurityHelpCard = ({ onOpenSafetyTips }) => {
  return (
    <section className="rounded-xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-3">
      <h3 className="text-sm sm:text-base font-bold text-primary">
        Need help?
      </h3>

      <div className="divide-y divide-gray-100">
        {/* Safety tips */}
        <button
          type="button"
          onClick={onOpenSafetyTips}
          className="flex w-full items-center gap-3 py-3 first:pt-1 text-left hover:opacity-80 transition-opacity"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-50 text-btnPrimary border border-sky-100">
            <ShieldCheck size={16} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-primary">Safety tips</p>
            <p className="text-[11px] text-primary/45 truncate mt-0.5">
              Discover our tips for securing your account
            </p>
          </div>
          <ChevronRight size={14} className="text-primary/30 shrink-0" />
        </button>

        {/* Help Center */}
        <Link
          to="/dashboard/user/support"
          className="flex items-center gap-3 py-3 hover:opacity-80 transition-opacity"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-50 text-btnPrimary border border-sky-100">
            <HelpCircle size={16} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-primary">Help Center</p>
            <p className="text-[11px] text-primary/45 truncate mt-0.5">
              Find answers to your questions
            </p>
          </div>
          <ChevronRight size={14} className="text-primary/30 shrink-0" />
        </Link>

        {/* Contact us */}
        <Link
          to="/dashboard/user/support"
          className="flex items-center gap-3 py-3 last:pb-0 hover:opacity-80 transition-opacity"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-50 text-btnPrimary border border-sky-100">
            <MessageSquare size={16} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-primary">Contact us</p>
            <p className="text-[11px] text-primary/45 truncate mt-0.5">
              Speak with an advisor
            </p>
          </div>
          <ChevronRight size={14} className="text-primary/30 shrink-0" />
        </Link>
      </div>
    </section>
  );
};
