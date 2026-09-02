import { ChevronDown } from "lucide-react";

const COUNTRIES = [
  "Switzerland",
  "Germany",
  "France",
  "Italy",
  "Austria",
  "Liechtenstein",
  "United Kingdom",
  "United States",
];

const StepCustomerInfo = ({ formData, onChange, onNext }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-base font-bold tracking-tight text-slate-900">
        Step 1: Customer Information
      </h2>

      <div className="space-y-5">
        {/* Row 1: First Name & Last Name */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.firstName || ""}
              onChange={(e) => onChange("firstName", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.lastName || ""}
              onChange={(e) => onChange("lastName", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Row 2: Email & Phone */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email || ""}
              onChange={(e) => onChange("email", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={formData.phone || ""}
              onChange={(e) => onChange("phone", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Row 3: Date of Birth & Country */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Date of Birth
            </label>
            <input
              type="date"
              value={formData.dob || ""}
              onChange={(e) => onChange("dob", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Country
            </label>
            <div className="relative">
              <select
                value={formData.country || "Switzerland"}
                onChange={(e) => onChange("country", e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-8 text-xs sm:text-sm font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 cursor-pointer"
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Row 4: Address, City & Postal Code */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {/* Address (6 cols) */}
          <div className="md:col-span-6">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Address
            </label>
            <input
              type="text"
              value={formData.address || ""}
              onChange={(e) => onChange("address", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          {/* City (3 cols) */}
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              City
            </label>
            <input
              type="text"
              value={formData.city || ""}
              onChange={(e) => onChange("city", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          {/* Postal Code (3 cols) */}
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Postal Code
            </label>
            <input
              type="text"
              value={formData.postalCode || ""}
              onChange={(e) => onChange("postalCode", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end pt-4">
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#0080ff] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-600 active:scale-95 cursor-pointer"
        >
          <span>Continue</span>
          <span>&gt;</span>
        </button>
      </div>
    </form>
  );
};

export default StepCustomerInfo;
