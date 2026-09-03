import { useNavigate } from "react-router";
import { ChevronRight, Check, Activity } from "lucide-react";

const getStatusBadge = (status) => {
  const s = String(status || "").toLowerCase();
  if (s.includes("completed") || s.includes("active") || s.includes("paid")) {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 border border-emerald-200/60">
        Completed
      </span>
    );
  }
  if (s.includes("processing")) {
    return (
      <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600 border border-sky-200/60">
        Processing
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600 border border-amber-200/60">
      Pending
    </span>
  );
};

const DEFAULT_TIMELINE = [
  { title: "Customer Registered", date: "Aug 12, 2026", completed: true },
  { title: "Plan Selected", date: "Aug 12, 2026", completed: true },
  { title: "Order Submitted", date: "Aug 12, 2026", completed: true },
  { title: "SIM/eSIM Processing", date: "Aug 13, 2026", completed: true },
  { title: "Activation Started", date: "Aug 13, 2026", completed: true },
  { title: "Activated", date: "Aug 13, 2026", completed: true },
];

const CollaboratorOrderDetailsView = ({ order, onBack }) => {
  const navigate = useNavigate();

  if (!order) return null;

  return (
    <div className="space-y-4">
      {/* 1. Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <button
          type="button"
          onClick={onBack}
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          Orders
        </button>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        <span className="font-semibold text-slate-900">{order.orderId}</span>
      </nav>

      {/* 2. Main White Card */}
      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:p-8 space-y-8">
        {/* Top Header Row */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#0b1736] sm:text-2xl">
              {order.orderId}
            </h1>
            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              Placed on {order.orderDate}
            </p>
          </div>

          <div>{getStatusBadge(order.status)}</div>
        </div>

        {/* 2-Column Metadata Details */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-14">
          {/* Column 1: Customer */}
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 mb-4">
              Customer
            </h2>
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-400">Name</span>
                <span className="font-bold text-slate-900">
                  {order.customer}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Order ID</span>
                <span className="font-mono font-medium text-slate-700">
                  {order.orderId}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Service */}
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 mb-4">
              Service
            </h2>
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-400">Plan</span>
                <span className="font-bold text-slate-900">{order.plan}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-400">SIM Type</span>
                <span className="font-medium text-slate-700">
                  {order.simType}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Amount</span>
                <span className="font-bold text-slate-900">{order.amount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Timeline */}
        <div>
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 mb-4">
            Order Timeline
          </h2>

          <div className="space-y-3.5">
            {DEFAULT_TIMELINE.map((step, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs sm:text-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10b981] text-white shadow-2xs">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span className="font-semibold text-slate-800">
                    {step.title}
                  </span>
                </div>
                <span className="font-mono text-xs text-slate-400">
                  {step.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/dashboard/collaborator/customers")}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
          >
            View Customer
          </button>

          <button
            type="button"
            onClick={() => {}}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
          >
            <Activity className="h-3.5 w-3.5 text-slate-500" />
            <span>Track Activation</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollaboratorOrderDetailsView;
