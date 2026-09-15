export const TicketDetailsPage = ({ ticket, onClose }) => {
  if (!ticket) return null;

  const statusBadgeClass = (variant, status) => {
    const s = (status || "").toLowerCase();
    if (s === "open" || variant === "amber") {
      return "bg-[#fff1e6] text-[#e67e22] border-[#ffd8b5]";
    }
    switch (variant) {
      case "green":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/70";
      case "blue":
        return "bg-sky-50 text-[#0284c7] border-sky-200/70";
      default:
        return "bg-[#fff1e6] text-[#e67e22] border-[#ffd8b5]";
    }
  };

  const priorityBadgeClass = (priority) => {
    switch ((priority || "").toLowerCase()) {
      case "high":
        return "bg-[#e8f4ff] text-[#2b7fd4] border-[#c5e0ff]";
      case "medium":
        return "bg-amber-50 text-amber-700 border-amber-200/70";
      case "low":
        return "bg-gray-50 text-primary/70 border-gray-200";
      default:
        return "bg-[#e8f4ff] text-[#2b7fd4] border-[#c5e0ff]";
    }
  };

  const detailRows = [
    { label: "Customer", value: ticket.customer || "Sam Rivera" },
    { label: "Subject", value: ticket.title },
    {
      label: "Priority",
      value: (
        <span
          className={`inline-flex rounded-full border px-3 py-0.5 text-xs font-semibold ${priorityBadgeClass(
            ticket.priority,
          )}`}
        >
          {ticket.priority || "Medium"}
        </span>
      ),
    },
    {
      label: "Status",
      value: (
        <span
          className={`inline-flex rounded-full border px-3 py-0.5 text-xs font-semibold ${statusBadgeClass(
            ticket.statusVariant,
            ticket.status,
          )}`}
        >
          {ticket.status}
        </span>
      ),
    },
    {
      label: "Assigned agent",
      value: ticket.assignedAgent || "Support Team",
    },
  ];

  const conversation =
    ticket.conversation?.length > 0
      ? ticket.conversation
      : [
          {
            id: 1,
            sender: "Customer",
            text: ticket.description || "No message provided.",
          },
        ];

  const ticketId =
    ticket.id.startsWith("TCK-") || ticket.id.startsWith("NS-")
      ? ticket.id
      : `TCK-${ticket.id}`;

  return (
    <div className="min-w-0 w-full space-y-5">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#38bdf8]">
          Support Ticket
        </p>
        <h2 className="mt-1.5 text-[1.75rem] font-bold leading-tight tracking-tight text-primary sm:text-3xl">
          {ticketId}
        </h2>
      </div>

      <section className="rounded-xl border border-gray-200 bg-white px-5 py-5 sm:px-6 sm:py-6">
        <h3 className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-primary/40">
          Ticket Details
        </h3>

        <div className="divide-y divide-gray-100">
          {detailRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-6 py-3.5"
            >
              <span className="shrink-0 text-[13px] text-primary/50">
                {row.label}
              </span>
              <div className="min-w-0 text-right text-[13px] font-medium text-primary">
                {row.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white px-5 py-5 sm:px-6 sm:py-6">
        <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-primary/40">
          Conversation
        </h3>

        <div className="space-y-3">
          {conversation.map((msg) => (
            <div
              key={msg.id}
              className="rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-[13px] leading-relaxed text-primary"
            >
              <span className="font-semibold text-primary">{msg.sender}:</span>{" "}
              <span className="text-primary/75">{msg.text}</span>
            </div>
          ))}
        </div>
      </section>

      <div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg bg-[#39a1fd] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2b8fe8]"
        >
          Close
        </button>
      </div>
    </div>
  );
};
