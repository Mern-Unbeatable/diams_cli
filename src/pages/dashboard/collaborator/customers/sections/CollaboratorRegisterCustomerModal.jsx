import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import {
  COLLABORATOR_PLAN_OPTIONS,
  COLLABORATOR_SIM_TYPE_OPTIONS,
} from "./collaboratorCustomerData";

const CollaboratorRegisterCustomerModal = ({ isOpen, onClose, onRegister }) => {
  const [formData, setFormData] = useState({
    customer: "",
    email: "",
    phone: "",
    plan: "NovaSky Max",
    simType: "eSIM",
    status: "Active",
  });

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];
    const newCustomer = {
      id: `cust-${Date.now()}`,
      profileId: `C-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: formData.customer,
      email: formData.email,
      phone: formData.phone,
      customerType: "Private",
      plan: formData.plan,
      simType: formData.simType,
      usage: "0.0 GB of 50 GB",
      lineStatus: "Active",
      registrationDate: today,
      status: formData.status,
      invoice: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      paymentHistory: `CHF 49.90 paid on ${today}`,
    };

    if (onRegister) {
      onRegister(newCustomer);
    }
    onClose();
  };

  const planOptions = COLLABORATOR_PLAN_OPTIONS.filter((p) => p !== "All");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all sm:p-7 z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Register New Customer
            </h2>
            <p className="mt-0.5 text-xs text-slate-400">
              Register a customer directly under your collaborator account.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-100 p-1.5 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Customer Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                value={formData.customer}
                onChange={(e) => handleChange("customer", e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+41 78 123 45 67"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-mono font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Plan */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Plan
              </label>
              <div className="relative">
                <select
                  value={formData.plan}
                  onChange={(e) => handleChange("plan", e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-8 text-xs font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  {planOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* SIM Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                SIM Type
              </label>
              <div className="relative">
                <select
                  value={formData.simType}
                  onChange={(e) => handleChange("simType", e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-8 text-xs font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  {COLLABORATOR_SIM_TYPE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#0080ff] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-600 active:scale-95"
            >
              Register Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollaboratorRegisterCustomerModal;
