const BillingKpiCards = ({
  revenue = "328.70",
  paidCount = 4,
  unpaidCount = 2,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* 1. Revenue Card */}
      <div className="flex flex-col justify-between rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
        <div>
          <span className="text-xs font-semibold text-slate-500">Revenue</span>
          <div className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            CHF {revenue}
          </div>
        </div>
        <div className="mt-5 h-1 w-full rounded-full bg-emerald-500" />
      </div>

      {/* 2. Paid Invoices Card */}
      <div className="flex flex-col justify-between rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
        <div>
          <span className="text-xs font-semibold text-slate-500">
            Paid Invoices
          </span>
          <div className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            {paidCount}
          </div>
        </div>
        <div className="mt-5 h-1 w-full rounded-full bg-emerald-500" />
      </div>

      {/* 3. Unpaid Invoices Card */}
      <div className="flex flex-col justify-between rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
        <div>
          <span className="text-xs font-semibold text-slate-500">
            Unpaid Invoices
          </span>
          <div className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            {unpaidCount}
          </div>
        </div>
        <div className="mt-5 h-1 w-full rounded-full bg-rose-500" />
      </div>
    </div>
  );
};

export default BillingKpiCards;
