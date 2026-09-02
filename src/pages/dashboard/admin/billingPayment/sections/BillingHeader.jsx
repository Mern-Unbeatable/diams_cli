const BillingHeader = ({ onGenerateInvoice }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
          Billing & Payments
        </h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Track revenue, invoices, pending payments, payment received actions and refunds.
        </p>
      </div>

      <button
        type="button"
        onClick={onGenerateInvoice}
        className="rounded-xl bg-[#2ea5ff] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-sky-500 active:scale-95 sm:text-sm"
      >
        Generate Invoice
      </button>
    </div>
  );
};

export default BillingHeader;
