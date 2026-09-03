import { ChevronRight } from "lucide-react";

export const RecentTicketsSection = ({ tickets, onSelectTicket }) => {
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
    <section className="space-y-3.5">
      <h3 className="text-base sm:text-lg font-bold text-primary">
        My Recent Tickets
      </h3>

      <div className="rounded-xl border border-gray-200/90 bg-white p-2 sm:p-3 shadow-sm divide-y divide-gray-100">
        {(tickets || []).map((ticket) => (
          <button
            key={ticket.id}
            type="button"
            onClick={() => onSelectTicket?.(ticket)}
            className="flex w-full items-center justify-between p-3 sm:p-3.5 text-left transition-colors hover:bg-gray-50/70 rounded-xl group cursor-pointer"
          >
            {/* Left: Badge & Ticket Info */}
            <div className="flex items-center gap-3.5 min-w-0 pr-3">
              <span
                className={`inline-flex shrink-0 items-center rounded-md border px-2 py-0.5 text-[10px] sm:text-[11px] font-bold ${getBadgeClass(
                  ticket.statusVariant,
                )}`}
              >
                {ticket.status}
              </span>

              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-primary group-hover:text-btnPrimary transition-colors truncate">
                  {ticket.title}
                </p>
                <p className="text-[11px] text-primary/45 mt-0.5 truncate">
                  Ticket #{ticket.id} • {ticket.updated}
                </p>
              </div>
            </div>

            {/* Right: Date & Chevron */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[11px] text-primary/45 font-medium">
                {ticket.date}
              </span>
              <ChevronRight
                size={15}
                className="text-primary/30 group-hover:text-btnPrimary group-hover:translate-x-0.5 transition-all"
              />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
