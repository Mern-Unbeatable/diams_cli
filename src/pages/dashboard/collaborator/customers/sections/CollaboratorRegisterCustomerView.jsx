import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import {
  StepCustomerInfo,
  StepKycDocuments,
  StepPlanSelection,
  StepSimSelection,
} from "./registerSteps";

const INITIAL_FORM_DATA = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  country: "Switzerland",
  address: "",
  city: "",
  postalCode: "",
  kycType: "National ID Card",
  kycExpiry: "2030-12-31",
  kycFileName: "",
  plan: "NovaSky Plus",
  simType: "eSIM",
};

const STEPS = [
  { id: 1, label: "Customer Info" },
  { id: 2, label: "KYC Documents" },
  { id: 3, label: "Plan Selection" },
  { id: 4, label: "SIM / eSIM" },
];

const CollaboratorRegisterCustomerView = ({ onBack, onRegisterSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleCompleteRegistration = () => {
    setIsSubmitting(true);
    const fullName =
      `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim() ||
      "New Customer";

    const newCustomer = {
      id: `cust-${Date.now()}`,
      profileId: `C-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: fullName,
      email: formData.email || "customer@example.ch",
      phone: formData.phone || "+41 78 456 78 90",
      dob: formData.dob || "1990-01-01",
      address: formData.address || "Bahnhofstrasse 1",
      city: formData.city || "Zurich",
      postalCode: formData.postalCode || "8001",
      country: formData.country || "Switzerland",
      customerType: "Private",
      plan: formData.plan || "NovaSky Plus",
      simType: formData.simType || "eSIM",
      usage: "0 GB of 80 GB",
      lineStatus: "Pending",
      status: "Active",
      kycStatus: "Submitted",
      kycDocument: `${formData.kycType} · Expires Dec 2030`,
      registrationDate: new Date().toISOString().split("T")[0],
      invoice: `INV-${Math.floor(9000 + Math.random() * 900)}`,
      paymentHistory: "CHF 39.90 pending",
    };

    setTimeout(() => {
      setIsSubmitting(false);
      if (onRegisterSuccess) {
        onRegisterSuccess(newCustomer);
      }
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <button
          type="button"
          onClick={onBack}
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          My Customers
        </button>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        <span className="font-semibold text-slate-900">Register New Customer</span>
      </nav>

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0b1736] sm:text-[28px]">
          Register New Customer
        </h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Complete all steps to register a new customer.
        </p>
      </div>

      {/* 4-Step Stepper Header */}
      <div className="flex items-center justify-between py-2">
        {STEPS.map((step, idx) => {
          const isCurrent = step.id === currentStep;
          const isDone = step.id < currentStep;

          return (
            <div
              key={step.id}
              className="flex flex-1 items-center last:flex-initial"
            >
              <div className="flex items-center gap-2.5">
                {/* Step Circle */}
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                    isDone
                      ? "bg-emerald-500 text-white shadow-xs"
                      : isCurrent
                      ? "bg-[#0080ff] text-white shadow-xs ring-4 ring-sky-100"
                      : "border border-slate-200 bg-slate-100 text-slate-400"
                  }`}
                >
                  {isDone ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : step.id}
                </div>

                {/* Step Label */}
                <span
                  className={`text-xs font-medium sm:text-sm whitespace-nowrap ${
                    isCurrent
                      ? "font-bold text-slate-900"
                      : isDone
                      ? "font-semibold text-slate-700"
                      : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connecting Line */}
              {idx < STEPS.length - 1 && (
                <div
                  className={`h-[1px] flex-1 mx-4 sm:mx-6 transition-colors ${
                    isDone ? "bg-emerald-400" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Views */}
      {currentStep === 3 ? (
        <div className="pt-2">
          <StepPlanSelection
            formData={formData}
            onChange={handleFieldChange}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:p-8">
          {currentStep === 1 && (
            <StepCustomerInfo
              formData={formData}
              onChange={handleFieldChange}
              onNext={handleNext}
            />
          )}

          {currentStep === 2 && (
            <StepKycDocuments
              formData={formData}
              onChange={handleFieldChange}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          )}

          {currentStep === 4 && (
            <StepSimSelection
              formData={formData}
              onChange={handleFieldChange}
              onSubmit={handleCompleteRegistration}
              onPrev={handlePrev}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CollaboratorRegisterCustomerView;
