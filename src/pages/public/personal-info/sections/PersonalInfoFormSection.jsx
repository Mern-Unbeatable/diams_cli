import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Check, ChevronLeft, Eye, EyeOff } from "lucide-react";
import { PASSWORD_RULES, PERSONAL_INFO_PAGE } from "@/config/personalInfo";
import AccountTypeToggle from "@/Components/public/AccountTypeToggle";
import PersonalAccountForm from "./PersonalAccountForm";
import BusinessAccountForm from "./BusinessAccountForm";

const labelClass = "mb-1.5 block text-sm font-bold text-primary";
const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-primary outline-none transition-colors placeholder:text-gray-400 focus:border-btnPrimary";

const PasswordInput = ({ id, label, placeholder, value, onChange }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${inputClass} pr-11`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};

const PasswordRequirements = ({ password }) => {
  return (
    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
      {PASSWORD_RULES.map(({ id, label, test }) => {
        const met = test(password);

        return (
          <li
            key={id}
            className={`flex items-center gap-1.5 text-xs ${
              met ? "text-emerald-600" : "text-gray-400"
            }`}
          >
            <Check size={14} strokeWidth={2.5} />
            {label}
          </li>
        );
      })}
    </ul>
  );
};

const PersonalInfoFormSection = ({ planId }) => {
  const [accountType, setAccountType] = useState("personal");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <div className="min-w-0">
      <h1 className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
        {PERSONAL_INFO_PAGE.title}{" "}
        <span className="text-btnPrimary">{PERSONAL_INFO_PAGE.titleAccent}</span>
      </h1>
      <p className="mt-2 text-sm text-primary/70 sm:text-base">
        {PERSONAL_INFO_PAGE.subtitle}
      </p>

      <div className="mt-8">
        <AccountTypeToggle value={accountType} onChange={setAccountType} />
      </div>

      {accountType === "personal" ? (
        <PersonalAccountForm />
      ) : (
        <BusinessAccountForm />
      )}

      {accountType === "personal" && (
        <section className="mt-10">
          <PasswordInput
            id="password"
            label="Password"
            placeholder="Create a secure password"
            value={password}
            onChange={setPassword}
          />
          <PasswordRequirements password={password} />

          <div className="mt-4">
            <PasswordInput
              id="confirmPassword"
              label="Confirm password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />
          </div>
        </section>
      )}

      <label className="mt-8 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-btnPrimary"
        />
        <span className="text-sm leading-snug text-primary/80">
          I accept the{" "}
          <a href="#" className="font-medium text-btnPrimary hover:underline">
            Terms and Conditions
          </a>{" "}
          and the{" "}
          <a href="#" className="font-medium text-btnPrimary hover:underline">
            Privacy Policy
          </a>{" "}
          of NovaSky.
        </span>
      </label>

      <div className="mt-8">
        <Link
          to={`/plans/${planId}/verification`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-btnPrimary px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:text-base"
        >
          Continue
          <ArrowRight size={18} />
        </Link>

        <div className="mt-4 text-center">
          <Link
            to={`/plans/${planId}/configure`}
            className="inline-flex items-center gap-1 text-sm font-medium text-btnPrimary transition-opacity hover:opacity-80"
          >
            <ChevronLeft size={16} />
            Back to configuration
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoFormSection;
