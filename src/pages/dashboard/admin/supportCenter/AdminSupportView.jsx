import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import DataTable from "@/Components/dashboard/DataTable";
import {
  SupportHeader,
  SupportDetailsView,
  ReplyTicketModal,
  AssignTicketModal,
  CloseTicketModal,
  SUPPORT_TICKETS_DATA,
  SUPPORT_ACTIONS,
} from "./sections";

const getPriorityBadgeStyle = (priority) => {
  const norm = String(priority).toLowerCase();
  switch (norm) {
    case "high":
      return "bg-[#fee2e2] text-[#ef4444]";
    case "medium":
      return "bg-[#fef9c3] text-[#a16207]";
    case "low":
      return "bg-[#f1f5f9] text-[#64748b]";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const getStatusBadgeStyle = (status) => {
  const norm = String(status).toLowerCase();
  switch (norm) {
    case "pending":
      return "bg-[#e0f2fe] text-[#0284c7]";
    case "open":
      return "bg-[#fef9c3] text-[#a16207]";
    case "closed":
      return "bg-[#e6f4ea] text-[#137333]";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const AdminSupportView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tickets, setTickets] = useState(SUPPORT_TICKETS_DATA);
  const [selectedPriority, setSelectedPriority] = useState("All Priority");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  const [selectedTicketForReply, setSelectedTicketForReply] = useState(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const [selectedTicketForAssign, setSelectedTicketForAssign] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const [selectedTicketForClose, setSelectedTicketForClose] = useState(null);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  // Find active ticket for details view
  const currentTicket = useMemo(() => {
    if (!id) return null;
    return (
      tickets.find(
        (t) =>
          t.id.toLowerCase() === id.toLowerCase() ||
          t.ticketId.toLowerCase() === id.toLowerCase() ||
          t.customer.toLowerCase().replace(/\s+/g, "-") === id.toLowerCase(),
      ) || tickets[0]
    );
  }, [id, tickets]);

  // Filter tickets based on Priority and Status filters
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const matchPriority =
        selectedPriority === "All Priority" ||
        t.priority.toLowerCase() === selectedPriority.toLowerCase();
      const matchStatus =
        selectedStatus === "All Statuses" ||
        t.status.toLowerCase() === selectedStatus.toLowerCase();
      return matchPriority && matchStatus;
    });
  }, [tickets, selectedPriority, selectedStatus]);

  // Table Columns Definition matching the screenshot
  const columns = useMemo(
    () => [
      {
        key: "ticketId",
        label: "Ticket ID",
        render: (row) => (
          <span className="font-medium text-slate-700">{row.ticketId}</span>
        ),
      },
      {
        key: "customer",
        label: "Customer",
        render: (row) => (
          <span className="font-medium text-slate-900">{row.customer}</span>
        ),
      },
      {
        key: "subject",
        label: "Subject",
        render: (row) => (
          <span className="text-slate-800 leading-snug">{row.subject}</span>
        ),
      },
      {
        key: "priority",
        label: "Priority",
        render: (row) => (
          <span
            className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${getPriorityBadgeStyle(
              row.priority,
            )}`}
          >
            {row.priority}
          </span>
        ),
      },
      {
        key: "status",
        label: "Status",
        render: (row) => (
          <span
            className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${getStatusBadgeStyle(
              row.status,
            )}`}
          >
            {row.status}
          </span>
        ),
      },
      {
        key: "assignedAgent",
        label: "Assigned Agent",
        render: (row) => (
          <span className="font-medium text-slate-700">
            {row.assignedAgent}
          </span>
        ),
      },
      {
        key: "activationDate",
        label: "Activation Date",
        render: (row) => (
          <span className="text-slate-600">{row.activationDate}</span>
        ),
      },
      {
        key: "action",
        label: "Action",
        align: "center",
      },
    ],
    [],
  );

  // Action Menu Click Handler
  const handleActionClick = (actionName, row) => {
    const act = String(actionName).toLowerCase();
    if (act.includes("detail") || act === "details") {
      navigate(`/dashboard/admin/support/${row.ticketId || row.id}`);
    } else if (act.includes("reply")) {
      setSelectedTicketForReply(row);
      setIsReplyModalOpen(true);
    } else if (act.includes("assign")) {
      setSelectedTicketForAssign(row);
      setIsAssignModalOpen(true);
    } else if (act.includes("closed")) {
      setSelectedTicketForClose(row);
      setIsCloseModalOpen(true);
    } else if (act.includes("open")) {
      setTickets((prev) =>
        prev.map((t) => (t.id === row.id ? { ...t, status: "Open" } : t)),
      );
    } else if (act.includes("pending")) {
      setTickets((prev) =>
        prev.map((t) => (t.id === row.id ? { ...t, status: "Pending" } : t)),
      );
    } else if (act.includes("high")) {
      setTickets((prev) =>
        prev.map((t) => (t.id === row.id ? { ...t, priority: "High" } : t)),
      );
    } else if (act.includes("low")) {
      setTickets((prev) =>
        prev.map((t) => (t.id === row.id ? { ...t, priority: "Low" } : t)),
      );
    }
  };

  // Update ticket details (from Details view or Modal)
  const handleUpdateTicket = (ticketId, updates) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, ...updates } : t)),
    );
  };

  const handleAssignAgent = (ticketId, newAgent) => {
    handleUpdateTicket(ticketId, { assignedAgent: newAgent });
  };

  const handleConfirmClose = (ticketId) => {
    handleUpdateTicket(ticketId, { status: "Closed" });
  };

  const handleSendReply = (ticketId, messageText) => {
    console.log(`Reply sent to ticket ${ticketId}:`, messageText);
  };

  return (
    <div className="min-h-full space-y-6 text-slate-900 font-sans">
      {/* 1. If URL has :id, render SupportDetailsView */}
      {id ? (
        currentTicket ? (
          <SupportDetailsView
            ticket={currentTicket}
            onBack={() => navigate("/dashboard/admin/support")}
            onUpdateTicket={handleUpdateTicket}
          />
        ) : (
          <div className="rounded-xl border border-slate-100 bg-white p-8 text-center shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Ticket Not Found
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              No ticket found with ID &quot;{id}&quot;.
            </p>
            <button
              type="button"
              onClick={() => navigate("/dashboard/admin/support")}
              className="mt-4 inline-flex items-center rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-sky-700"
            >
              Back to Support Center
            </button>
          </div>
        )
      ) : (
        /* 2. Main Support Center Table View */
        <>
          {/* Header with Priority & Status Filter Dropdowns */}
          <SupportHeader
            selectedPriority={selectedPriority}
            onSelectPriority={setSelectedPriority}
            selectedStatus={selectedStatus}
            onSelectStatus={setSelectedStatus}
          />

          {/* Support Tickets Table with Common DataTable */}
          <DataTable
            columns={columns}
            data={filteredTickets}
            actions={SUPPORT_ACTIONS}
            onActionClick={handleActionClick}
            pageSize={10}
            emptyMessage="No support tickets found matching the selected filters."
          />

          {/* Reply Ticket Modal for Table actions */}
          <ReplyTicketModal
            isOpen={isReplyModalOpen}
            onClose={() => {
              setIsReplyModalOpen(false);
              setSelectedTicketForReply(null);
            }}
            ticket={selectedTicketForReply}
            onSendReply={handleSendReply}
          />

          {/* Assign Ticket Modal for Table actions */}
          <AssignTicketModal
            isOpen={isAssignModalOpen}
            onClose={() => {
              setIsAssignModalOpen(false);
              setSelectedTicketForAssign(null);
            }}
            ticket={selectedTicketForAssign}
            onAssign={handleAssignAgent}
          />

          {/* Close Ticket Modal for Table actions */}
          <CloseTicketModal
            isOpen={isCloseModalOpen}
            onClose={() => {
              setIsCloseModalOpen(false);
              setSelectedTicketForClose(null);
            }}
            ticket={selectedTicketForClose}
            onConfirmClose={handleConfirmClose}
          />
        </>
      )}
    </div>
  );
};

export default AdminSupportView;
