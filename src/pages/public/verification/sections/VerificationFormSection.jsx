import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Camera,
  Check,
  ChevronLeft,
  Focus,
  ScanLine,
  Sun,
  Upload,
  Zap,
} from "lucide-react";
import {
  SELFIE_CHECKLIST,
  UPLOAD_INFO,
  UPLOAD_TIPS,
  VERIFICATION_PAGE,
} from "@/config/verification";
import IdTypeSelector from "@/Components/public/IdTypeSelector";
import SecureInfoBanner from "@/Components/public/SecureInfoBanner";
import selfieImage from "@/assets/plans/takeselfie.png";

const TIP_ICONS = {
  sun: Sun,
  scan: ScanLine,
  focus: Focus,
  flash: Zap,
};

const VerificationFormSection = ({ planId }) => {
  const [idType, setIdType] = useState("national-id");

  return (
    <div className="min-w-0">
      <h1 className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
        {VERIFICATION_PAGE.title}{" "}
        <span className="text-btnPrimary">{VERIFICATION_PAGE.titleAccent}</span>
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-primary/70 sm:text-base">
        {VERIFICATION_PAGE.subtitle}
      </p>

      <div className="mt-8">
        <IdTypeSelector value={idType} onChange={setIdType} />
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-primary">
          1. Upload your identity document
        </h2>
        <p className="mt-2 text-sm text-primary/60">{UPLOAD_INFO.formats}</p>

        <button
          type="button"
          className="mt-5 flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-btnPrimary/30 bg-[#f0f7ff] px-6 py-10 transition-colors hover:border-btnPrimary/50 hover:bg-[#e8f3ff]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-btnPrimary/15">
            <Upload size={22} strokeWidth={1.75} className="text-btnPrimary" />
          </div>
          <p className="mt-4 text-base font-semibold text-btnPrimary">
            Click to upload
          </p>
          <p className="mt-1 text-sm text-primary/55">
            or drag and drop your file here
          </p>
        </button>

        <p className="mt-6 text-sm font-semibold text-primary">
          {UPLOAD_INFO.tipsTitle}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {UPLOAD_TIPS.map(({ id, icon, label }) => {
            const Icon = TIP_ICONS[icon];

            return (
              <div
                key={id}
                className="flex flex-col items-center rounded-lg border border-gray-100 bg-[#f8fafc] px-3 py-4 text-center"
              >
                <Icon
                  size={20}
                  strokeWidth={1.75}
                  className="text-btnPrimary"
                />
                <span className="mt-2 text-xs font-medium text-primary/70">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-primary">2. Take a selfie</h2>
        <p className="mt-2 text-sm text-primary/60">
          Take a selfie while holding your identity document.
        </p>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-8">
          <div className="flex flex-col items-center">
            <img
              src={selfieImage}
              alt="Example selfie with ID card"
              className="w-full max-w-70 rounded-xl"
            />
            <button
              type="button"
              className="mt-5 inline-flex w-full max-w-70 items-center justify-center gap-2 rounded-lg bg-btnPrimary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Camera size={18} />
              Take a Photo
            </button>
          </div>

          <ul className="space-y-4 pt-2">
            {SELFIE_CHECKLIST.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-primary">
                <Check
                  size={18}
                  strokeWidth={2.5}
                  className="mt-0.5 shrink-0 text-btnPrimary"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SecureInfoBanner />

      <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to={`/plans/${planId}/personal-info`}
          className="inline-flex items-center justify-center gap-1 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-btnPrimary transition-colors hover:bg-gray-50"
        >
          <ChevronLeft size={16} />
          Back
        </Link>

        <Link
          to={`/plans/${planId}/payment`}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-btnPrimary px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:min-w-50"
        >
          Continue
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default VerificationFormSection;
