import { Filter, Plus, Search } from "lucide-react";
import { useState } from "react";

export const SupportTicketsTab = ({
  tickets,
  onOpenNewTicket,
  onSelectTicket,
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTickets = (tickets || []).filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      t.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getBadgeClass = (variant) => {
    switch (variant) {
      case "green":
        return "bg-emerald-50 text-emerald-600 border-emerald-200/50";
      case "blue":
        return "bg-sky-50 text-btnPrimary border-sky-100";
      case "amber":
        return "bg-amber-50 text-amber-600 border-amber-200/50";
      default:
        return "bg-gray-50 text-primary/70 border-gray-200";
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls: Search, Filter, New Ticket CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tickets by ID or subject..."
              className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-3.5 pr-8 text-xs font-medium text-primary focus:border-btnPrimary focus:outline-none"
            />
            <Search
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40"
            />
          </div>

          {/* Filter Pill Select */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-primary focus:border-btnPrimary focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="in progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <button
          type="button"
          onClick={onOpenNewTicket}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-btnPrimary px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-btnPrimary/90 transition-colors shrink-0"
        >
          <Plus size={15} />
          <span>Open New Ticket</span>
        </button>
      </div>

      {/* Tickets Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200/90 bg-white shadow-sm">
        <div className="divide-y divide-gray-100">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((t) => (
              <div
                key={t.id}
                onClick={() => onSelectTicket?.(t)}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 gap-2.5 hover:bg-gray-50/70 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span
                    className={`inline-flex shrink-0 items-center rounded-md border px-2 py-0.5 text-[10px] font-bold mt-0.5 ${getBadgeClass(
                      t.statusVariant,
                    )}`}
                  >
                    {t.status}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-primary truncate">
                      {t.title}
                    </p>
                    <p className="text-[11px] text-primary/50 mt-0.5">
                      #{t.id} • Category: {t.category || "General"} •{" "}
                      {t.updated}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 text-right">
                  <span className="text-[11px] text-primary/45 font-medium">
                    {t.date}
                  </span>
                  <span className="text-xs font-semibold text-btnPrimary hover:underline">
                    View Details →
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-primary/50 text-xs">
              No tickets found matching your query.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
