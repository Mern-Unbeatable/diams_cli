import { useState } from "react";
import { MoreVertical, Eye, FileText, Ban, CheckCircle } from "lucide-react";

const CustomerTable = ({ customers }) => {
  const [activeMenuId, setActiveMenuId] = useState(null);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "suspended":
        return "bg-rose-50 text-rose-700 border-rose-100";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-100/90 bg-white">
      <table className="w-full min-w-[850px] border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-100 bg-[#f8fafc]/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <th className="py-3.5 pl-5 pr-3">Customer</th>
            <th className="px-3 py-3.5">Email</th>
            <th className="px-3 py-3.5">Phone</th>
            <th className="px-3 py-3.5">Plan</th>
            <th className="px-3 py-3.5">Line Status</th>
            <th className="px-3 py-3.5">Registration Date</th>
            <th className="px-3 py-3.5">Status</th>
            <th className="py-3.5 pl-3 pr-5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100/80 text-xs">
          {customers.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-12 text-center text-sm text-slate-400">
                No customers found matching the criteria.
              </td>
            </tr>
          ) : (
            customers.map((cust) => (
              <tr
                key={cust.id}
                className="transition-colors hover:bg-slate-50/50"
              >
                {/* 1. Customer */}
                <td className="py-4 pl-5 pr-3 font-semibold text-slate-900">
                  {cust.customer}
                </td>

                {/* 2. Email */}
                <td className="px-3 py-4 text-slate-500">
                  {cust.email}
                </td>

                {/* 3. Phone */}
                <td className="px-3 py-4 font-mono text-slate-500">
                  {cust.phone}
                </td>

                {/* 4. Plan */}
                <td className="px-3 py-4 font-medium text-slate-600">
                  {cust.plan}
                </td>

                {/* 5. Line Status */}
                <td className="px-3 py-4">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${getStatusBadge(
                      cust.lineStatus
                    )}`}
                  >
                    {cust.lineStatus}
                  </span>
                </td>

                {/* 6. Registration Date */}
                <td className="px-3 py-4 font-mono text-slate-500">
                  {cust.registrationDate}
                </td>

                {/* 7. Status */}
                <td className="px-3 py-4">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${getStatusBadge(
                      cust.status
                    )}`}
                  >
                    {cust.status}
                  </span>
                </td>

                {/* 8. Actions */}
                <td className="relative py-4 pl-3 pr-5 text-right">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveMenuId(activeMenuId === cust.id ? null : cust.id)
                    }
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>

                  {/* Actions Dropdown */}
                  {activeMenuId === cust.id && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setActiveMenuId(null)}
                      />
                      <div className="absolute right-5 top-12 z-20 w-44 rounded-xl border border-slate-100 bg-white p-1 text-left shadow-xl ring-1 ring-black/5">
                        <button
                          type="button"
                          onClick={() => setActiveMenuId(null)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                        >
                          <Eye className="h-3.5 w-3.5 text-slate-400" />
                          <span>View Profile</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveMenuId(null)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                        >
                          <FileText className="h-3.5 w-3.5 text-slate-400" />
                          <span>Invoices</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveMenuId(null)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-rose-600 transition-colors hover:bg-rose-50"
                        >
                          <Ban className="h-3.5 w-3.5" />
                          <span>{cust.status === "Suspended" ? "Activate" : "Suspend"}</span>
                        </button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
