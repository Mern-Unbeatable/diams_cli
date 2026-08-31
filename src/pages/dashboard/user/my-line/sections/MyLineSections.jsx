import { useState } from "react";
import { Link } from "react-router";
import {
  BarChart3,
  Calendar,
  Check,
  ChevronRight,
  Copy,
  Eye,
  EyeOff,
  FileText,
  HelpCircle,
  Headset,
  Lock,
  MessageCircle,
  Pencil,
  Plus,
  Smartphone,
  Zap,
} from "lucide-react";
import { USER_MY_LINE } from "@/config/userMyLine";

const DetailRow = ({ label, value, highlight, copy, onCopy }) => (
  <div className="flex items-center justify-between gap-4 border-b border-gray-100 py-3 last:border-b-0">
    <span className="text-sm text-primary/55">{label}</span>
    <span className="flex items-center gap-2 text-sm font-semibold text-primary">
      <span className={highlight ?? ""}>{value}</span>
      {copy ? (
        <button
          type="button"
          onClick={onCopy}
          className="text-primary/40 transition-colors hover:text-btnPrimary"
          aria-label={`Copy ${label}`}
        >
          <Copy size={14} />
        </button>
      ) : null}
    </span>
  </div>
);

const MaskedField = ({ label, value }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-xs text-primary/55">{label}</p>
        <p className="mt-1 font-mono text-sm font-semibold text-primary">
          {visible ? value : "••••"}
        </p>
      </div>
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        className="rounded-md p-1.5 text-primary/45 transition-colors hover:bg-gray-50 hover:text-primary"
        aria-label={visible ? `Hide ${label}` : `Show ${label}`}
      >
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
};

const QUICK_ACTION_ICONS = {
  barChart: BarChart3,
  plus: Plus,
  file: FileText,
};

const HELP_ICONS = {
  message: MessageCircle,
  help: HelpCircle,
  headset: Headset,
};

const LineSummaryCard = () => {
  const { summary, simCardImage } = USER_MY_LINE;

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text.replace(/\s/g, ""));
  };

  const parts = summary.bannerMessage.split(". ");
  const firstPart = parts[0] ? `${parts[0]}.` : "";
  const secondPart = parts[1] ?? "";

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[auto_1fr_320px] lg:items-start">
        <div className="flex justify-center lg:justify-start">
          <img
            src={simCardImage}
            alt="NovaSky SIM card"
            className="h-44 w-auto object-contain"
          />
        </div>

        <div>
          <p className="text-sm text-primary/55">{summary.label}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <h3 className="text-2xl font-bold text-primary sm:text-[1.75rem]">
              {summary.phone}
            </h3>
            <span className="rounded bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
              {summary.status}
            </span>
            <button
              type="button"
              onClick={() => handleCopy(summary.phone)}
              className="text-primary/40 transition-colors hover:text-btnPrimary"
              aria-label="Copy phone number"
            >
              <Copy size={15} />
            </button>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-primary">{summary.plan}</p>
            <span className="rounded bg-[#eef7ff] px-1.5 py-0.5 text-[10px] font-bold text-btnPrimary">
              {summary.networkBadge}
            </span>
          </div>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-primary/55">
            <Calendar size={13} />
            {summary.since}
          </p>
        </div>

        <div className="border-t border-gray-100 pt-4 lg:border-t-0 lg:border-l lg:border-gray-200 lg:pt-0 lg:pl-6 space-y-1">
          <DetailRow label="ICCID" value={summary.iccid} />
          <DetailRow label="SIM Type" value={summary.simType} />
          <DetailRow
            label="Status"
            value={
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {summary.lineStatus}
              </span>
            }
          />
          <DetailRow label="Network" value={summary.network} />
          <DetailRow
            label="Data Renewal"
            value={
              <span>
                {summary.dataRenewal}{" "}
                <span className="font-normal text-primary/45">
                  ({summary.dataRenewalHint})
                </span>
              </span>
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-[#dbeafe] bg-[#eef7ff] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-btnPrimary shadow-sm">
            <Zap size={14} strokeWidth={2.5} className="text-btnPrimary" />
          </span>
          <div>
            <p className="text-sm font-semibold text-primary">{firstPart}</p>
            <p className="text-xs text-primary/60">{secondPart}</p>
          </div>
        </div>
        <Link
          to={summary.viewUsagePath}
          className="inline-flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-gray-50"
        >
          View Usage
        </Link>
      </div>
    </section>
  );
};

const LineDetailsTab = () => (
  <div className="border-b border-gray-200">
    <button
      type="button"
      className="border-b-2 border-btnPrimary px-1 pb-3 text-sm font-semibold text-btnPrimary"
    >
      Line Details
    </button>
  </div>
);

const LineInformationCard = () => {
  const { lineInfo } = USER_MY_LINE;

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text.replace(/\s/g, ""));
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h3 className="text-base font-bold text-primary">Line Information</h3>
      <div className="mt-2">
        {lineInfo.map((item) => (
          <DetailRow
            key={item.label}
            label={item.label}
            value={item.value}
            highlight={item.highlight}
            copy={item.copy}
            onCopy={() => handleCopy(item.value)}
          />
        ))}
      </div>
    </section>
  );
};

const PinPukCard = () => (
  <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
    <h3 className="text-base font-bold text-primary">PIN & PUK</h3>
    <div className="mt-4 space-y-4">
      <MaskedField label="SIM PIN" value="1234" />
      <MaskedField label="PUK Code" value="87654321" />
    </div>
    <button
      type="button"
      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-btnPrimary py-3 text-sm font-semibold text-btnPrimary transition-colors hover:bg-[#eef7ff]"
    >
      <Lock size={15} />
      Change PIN / PUK
    </button>
  </section>
);

const QuickActionsCard = () => {
  const { quickActions } = USER_MY_LINE;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h3 className="text-base font-bold text-primary">Quick Actions</h3>
      <ul className="mt-3 divide-y divide-gray-100">
        {quickActions.map(({ id, label, icon, path }) => {
          const Icon = QUICK_ACTION_ICONS[icon] ?? BarChart3;

          return (
            <li key={id}>
              <Link
                to={path}
                className="flex items-center gap-3 py-3 transition-colors hover:opacity-80"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef7ff]">
                  <Icon size={17} className="text-btnPrimary" />
                </span>
                <span className="flex-1 text-sm font-medium text-primary">{label}</span>
                <ChevronRight size={16} className="text-primary/35" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const LineStatusCard = () => (
  <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
    <h3 className="text-base font-bold text-primary">Line Status</h3>
    <div className="mt-4 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500 bg-emerald-50/20 text-emerald-600">
        <Check size={24} strokeWidth={2.5} />
      </div>
      <h4 className="mt-4 text-base font-bold text-primary">Your line is active</h4>
      <p className="mt-1 text-sm text-primary/55">All services are running smoothly.</p>
      <button
        type="button"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
        Suspend Line
      </button>
    </div>
    <div className="mt-6 text-left">
      <p className="text-xs text-primary/55">Need to stop your line temporarily?</p>
      <button type="button" className="mt-1 text-xs font-semibold text-btnPrimary hover:underline">
        Suspend now →
      </button>
    </div>
  </section>
);

const SimPromoCard = () => {
  const { simPromo } = USER_MY_LINE;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef7ff]">
          <Smartphone size={18} className="text-btnPrimary" />
        </span>
        <div>
          <h3 className="font-bold text-primary">{simPromo.title}</h3>
          <p className="mt-1 text-sm text-primary/55">{simPromo.description}</p>
          <Link
            to={simPromo.path}
            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-btnPrimary hover:opacity-80"
          >
            {simPromo.linkLabel} →
          </Link>
        </div>
      </div>
    </section>
  );
};

const HelpSupportCard = () => {
  const { help } = USER_MY_LINE;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h3 className="text-base font-bold text-primary">Help & Support</h3>
      <ul className="mt-3 divide-y divide-gray-100">
        {help.items.map(({ id, title, description, icon }) => {
          const Icon = HELP_ICONS[icon] ?? HelpCircle;

          return (
            <li key={id}>
              <Link
                to={help.seeAllPath}
                className="flex items-center gap-3 py-3 transition-colors hover:opacity-80"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef7ff]">
                  <Icon size={17} className="text-btnPrimary" />
                </span>
                <span className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-primary">{title}</p>
                  <p className="text-xs text-primary/55">{description}</p>
                </span>
                <ChevronRight size={16} className="shrink-0 text-primary/35" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export {
  LineSummaryCard,
  LineDetailsTab,
  LineInformationCard,
  PinPukCard,
  QuickActionsCard,
  LineStatusCard,
  SimPromoCard,
  HelpSupportCard,
};
