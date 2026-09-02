const CustomerPersonalInfoTab = ({ customer }) => {
  if (!customer) return null;

  return (
    <div className="grid grid-cols-1 gap-y-7 gap-x-12 sm:grid-cols-2 max-w-4xl py-1">
      {/* Left Column */}
      <div className="space-y-6">
        <div>
          <span className="block text-xs font-medium text-slate-400">
            Full Name
          </span>
          <div className="mt-1 text-sm font-semibold text-slate-900">
            {customer.customer}
          </div>
        </div>

        <div>
          <span className="block text-xs font-medium text-slate-400">
            Phone
          </span>
          <div className="mt-1 text-sm font-semibold text-slate-900">
            {customer.phone || "+41 78 456 78 90"}
          </div>
        </div>

        <div>
          <span className="block text-xs font-medium text-slate-400">
            Address
          </span>
          <div className="mt-1 text-sm font-semibold text-slate-900">
            {customer.address || "Via Nassa 8"}
          </div>
        </div>

        <div>
          <span className="block text-xs font-medium text-slate-400">
            Postal Code
          </span>
          <div className="mt-1 text-sm font-semibold text-slate-900">
            {customer.postalCode || "6900"}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <div>
          <span className="block text-xs font-medium text-slate-400">
            Email
          </span>
          <div className="mt-1 text-sm font-semibold text-slate-900">
            {customer.email}
          </div>
        </div>

        <div>
          <span className="block text-xs font-medium text-slate-400">
            Date of Birth
          </span>
          <div className="mt-1 text-sm font-semibold text-slate-900">
            {customer.dob || "1978-11-08"}
          </div>
        </div>

        <div>
          <span className="block text-xs font-medium text-slate-400">
            City
          </span>
          <div className="mt-1 text-sm font-semibold text-slate-900">
            {customer.city || "Lugano"}
          </div>
        </div>

        <div>
          <span className="block text-xs font-medium text-slate-400">
            Country
          </span>
          <div className="mt-1 text-sm font-semibold text-slate-900">
            {customer.country || "Switzerland"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPersonalInfoTab;
