import { useRef, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ChevronLeft,
  Cpu,
  Download,
  Hash,
  Mail,
  QrCode,
  ScanLine,
} from "lucide-react";
import {
  ACTIVATION_CODE,
  ACTIVATION_EMAIL,
  ACTIVATION_PAGE,
  ACTIVATION_STEPS,
  ACTIVATION_TABS,
} from "@/config/activation";
import { ACCOUNT_PATH } from "@/config/navigation";
import ActivationTroubleshootingCard from "@/Components/public/ActivationTroubleshootingCard";
import welcomeBannerImage from "@/assets/plans/welcome-banner.png";
import qrCodeImage from "@/assets/plans/qr-code.svg";

const STEP_ICONS = {
  camera: Camera,
  scan: ScanLine,
  download: Download,
  check: CheckCircle2,
};

const TAB_ICONS = {
  scan: QrCode,
  code: Hash,
  email: Mail,
};

const ActivationCodeInputs = ({ length }) => {
  const [digits, setDigits] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    const next = value.replace(/\D/g, "").slice(-1);
    const updated = [...digits];
    updated[index] = next;
    setDigits(updated);

    if (next && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="mt-4 flex gap-3">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          aria-label={`Activation code digit ${index + 1}`}
          className="h-14 w-14 rounded-lg border border-gray-300 bg-white text-center text-lg font-semibold text-primary outline-none transition-colors focus:border-btnPrimary sm:h-16 sm:w-16"
        />
      ))}
    </div>
  );
};

const ActivationFormSection = ({ planId }) => {
  const [activeTab, setActiveTab] = useState("scan");

  return (
    <div className="min-w-0">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-btnPrimary/10">
          <Cpu size={26} strokeWidth={1.75} className="text-btnPrimary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
            {ACTIVATION_PAGE.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-primary/70 sm:text-base">
            {ACTIVATION_PAGE.subtitle}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 sm:px-5">
        <CheckCircle2
          size={22}
          strokeWidth={1.75}
          className="mt-0.5 shrink-0 text-emerald-600"
        />
        <p className="text-sm leading-relaxed text-emerald-800">
          {ACTIVATION_PAGE.successMessage}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {ACTIVATION_TABS.map(({ id, label }) => {
          const Icon = TAB_ICONS[id];
          const isActive = activeTab === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-btnPrimary bg-btnPrimary/10 text-btnPrimary"
                  : "border-gray-200 bg-white text-primary/60 hover:border-gray-300 hover:text-primary"
              }`}
            >
              <Icon size={16} strokeWidth={1.75} />
              {label}
            </button>
          );
        })}
      </div>

      {activeTab === "scan" && (
        <ol className="mt-8 space-y-6">
          {ACTIVATION_STEPS.map(({ id, icon, title, description }, index) => {
            const Icon = STEP_ICONS[icon];

            return (
              <li key={id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-btnPrimary text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  {index < ACTIVATION_STEPS.length - 1 && (
                    <span className="mt-2 w-px flex-1 bg-gray-200" />
                  )}
                </div>
                <div className="min-w-0 flex-1 pb-2">
                  <div className="flex items-start gap-3">
                    <Icon
                      size={20}
                      strokeWidth={1.75}
                      className="mt-0.5 shrink-0 text-btnPrimary"
                    />
                    <div>
                      <p className="font-bold text-primary">{title}</p>
                      {description && (
                        <p className="mt-1 text-sm leading-relaxed text-primary/65">
                          {description}
                        </p>
                      )}
                    </div>
                  </div>
                  {id === "scan" && (
                    <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:max-w-[280px]">
                      <img
                        src={qrCodeImage}
                        alt="eSIM activation QR code"
                        className="block aspect-square w-full"
                      />
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}

      {activeTab === "code" && (
        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <p className="font-bold text-primary">{ACTIVATION_CODE.label}</p>
          <ActivationCodeInputs length={ACTIVATION_CODE.digits} />
        </div>
      )}

      {activeTab === "email" && (
        <div className="mt-8 rounded-xl border border-gray-200 bg-white px-5 py-10 text-center sm:px-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/5">
            <Mail size={28} strokeWidth={1.5} className="text-primary" />
          </div>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-primary/70 sm:text-base">
            {ACTIVATION_EMAIL.message}
          </p>
        </div>
      )}

      {activeTab !== "scan" && <ActivationTroubleshootingCard />}

      <div className="mt-10 overflow-hidden rounded-2xl">
        <img
          src={welcomeBannerImage}
          alt="Welcome to NovaSky"
          className="block h-auto w-full"
        />
      </div>

      <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to={`/plans/${planId}/confirmation`}
          className="inline-flex items-center justify-center gap-1 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-btnPrimary transition-colors hover:bg-gray-50"
        >
          <ChevronLeft size={16} />
          Back
        </Link>

        <Link
          to={ACCOUNT_PATH}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-btnPrimary px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:min-w-[200px]"
        >
          Continue
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default ActivationFormSection;
