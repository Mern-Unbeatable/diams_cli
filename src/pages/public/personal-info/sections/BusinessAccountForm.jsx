import {
  Building2,
  FileText,
  Hash,
  Mail,
  MapPin,
  User,
} from "lucide-react";
import { BUSINESS_INFO } from "@/config/personalInfo";

const labelClass =
  "mb-1.5 block text-[11px] font-bold tracking-wide text-primary/70 uppercase sm:text-xs";
const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white py-3 text-sm text-primary outline-none transition-colors placeholder:text-gray-400 focus:border-btnPrimary";

const IconField = ({
  id,
  label,
  icon: Icon,
  type = "text",
  placeholder,
  optional,
  className = "",
  multiline = false,
}) => {
  const fieldClass = `${inputClass} pl-11 pr-4 ${className}`;

  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {optional ? " (Optional)" : " *"}
      </label>
      <div className="relative">
        <Icon
          size={18}
          strokeWidth={1.75}
          className={`pointer-events-none absolute left-4 text-gray-400 ${
            multiline ? "top-3.5" : "top-1/2 -translate-y-1/2"
          }`}
        />
        {multiline ? (
          <textarea
            id={id}
            rows={4}
            placeholder={placeholder}
            className={`${fieldClass} resize-none pt-3 leading-relaxed`}
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            className={fieldClass}
          />
        )}
      </div>
    </div>
  );
};

const BusinessAccountForm = () => {
  return (
    <section className="mt-10">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-btnPrimary/10">
          <Building2 size={20} strokeWidth={1.75} className="text-btnPrimary" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-primary">{BUSINESS_INFO.title}</h2>
          <p className="mt-1 text-sm text-primary/60">{BUSINESS_INFO.description}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <IconField
          id="companyName"
          label="Company name"
          icon={Building2}
          placeholder="Enter company name"
        />
        <IconField
          id="registrationNumber"
          label="Registration number"
          icon={Hash}
          placeholder="Enter registration number"
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <IconField
          id="vatNumber"
          label="VAT number"
          icon={FileText}
          placeholder="Enter VAT number"
          optional
        />
        <IconField
          id="contactPerson"
          label="Contact person"
          icon={User}
          placeholder="Enter contact person"
        />
      </div>

      <div className="mt-4">
        <IconField
          id="businessAddress"
          label="Business address"
          icon={MapPin}
          placeholder="Street address, city, postal code"
          multiline
        />
      </div>

      <div className="mt-4">
        <IconField
          id="businessEmail"
          label="Business email"
          icon={Mail}
          type="email"
          placeholder="Enter your business email address"
        />
      </div>
    </section>
  );
};

export default BusinessAccountForm;
