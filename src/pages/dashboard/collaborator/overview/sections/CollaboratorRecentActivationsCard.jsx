import { useNavigate } from "react-router";
import { ChevronRight } from "lucide-react";
import { COLLABORATOR_RECENT_ACTIVATIONS } from "./collaboratorOverviewData";

const CollaboratorRecentActivationsCard = () => {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-emerald-600 border-emerald-200/60";
      case "Pending":
        return "bg-amber-50 text-amber-600 border-amber-200/60";
      case "Processing":
        return "bg-sky-50 text-sky-600 border-sky-200/60";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold tracking-tight text-slate-900">
          Recent Activations
        </h2>
        <button
          type="button"
          onClick={() => navigate("/dashboard/collaborator/orders")}
          className="group flex items-center gap-1 text-xs font-semibold text-slate-600 transition-colors hover:text-slate-900"
        >
          <span>View All</span>
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Table Container */}
      <div className="mt-4 -mx-5 overflow-x-auto sm:-mx-6">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-slate-100">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-medium text-slate-400">
                <th className="py-3 pl-5 pr-4 sm:pl-6">Customer</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">SIM Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="py-3 pl-4 pr-5 text-right sm:pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {COLLABORATOR_RECENT_ACTIVATIONS.map((item) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-slate-50/60"
                >
                  {/* Customer */}
                  <td className="py-3.5 pl-5 pr-4 font-semibold text-slate-900 text-xs sm:pl-6 sm:text-sm">
                    {item.name}
                  </td>

                  {/* Plan */}
                  <td className="whitespace-nowrap px-4 py-3.5 text-xs text-slate-700 sm:text-sm">
                    {item.plan}
                  </td>

                  {/* SIM Type */}
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <span className="inline-block rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                      {item.simType}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="whitespace-nowrap px-4 py-3.5 text-xs text-slate-500 sm:text-sm">
                    {item.date}
                  </td>

                  {/* Action */}
                  <td className="whitespace-nowrap py-3.5 pl-4 pr-5 text-right sm:pr-6">
                    <button
                      type="button"
                      onClick={() => navigate("/dashboard/collaborator/orders")}
                      className="text-xs font-semibold text-slate-700 transition-colors hover:text-sky-600 sm:text-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CollaboratorRecentActivationsCard;
