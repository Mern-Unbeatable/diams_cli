import { useNavigate } from "react-router";
import { Package, ChevronRight } from "lucide-react";

const CustomerInvoicesTab = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      <Package className="h-10 w-10 text-slate-300 stroke-[1.5]" />
      <p className="mt-3 text-xs sm:text-sm font-medium text-slate-500">
        Navigate to the Invoices section to view full details.
      </p>
      <button
        type="button"
        onClick={() => navigate("/dashboard/collaborator/orders")}
        className="group mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-slate-700 transition-colors hover:text-sky-600 cursor-pointer"
      >
        <span>Go to Invoices</span>
        <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
};

export default CustomerInvoicesTab;
