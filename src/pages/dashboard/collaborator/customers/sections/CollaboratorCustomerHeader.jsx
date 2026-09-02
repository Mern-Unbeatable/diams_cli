const CollaboratorCustomerHeader = ({ onRegisterCustomer }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
          My Customers
        </h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Manage customers you personally registered with NovaSky
        </p>
      </div>

      <button
        type="button"
        onClick={onRegisterCustomer}
        className="inline-flex items-center justify-center rounded-xl bg-[#0080ff] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-600 active:scale-95 sm:text-sm"
      >
        Register Customer
      </button>
    </div>
  );
};

export default CollaboratorCustomerHeader;
