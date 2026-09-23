import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import DataTable from "@/Components/dashboard/DataTable";
import ErrorState from "@/Components/common/ErrorState";
import {
  useTicket,
  useTickets,
  useUpdateTicket,
  useReplyTicket,
} from "@/features/dash/admin/support";
import { unwrapList } from "@/lib/query/unwrap";
import { useMutationFeedback } from "@/hooks/useMutationFeedback";
import { isNotFoundError } from "@/lib/api/errors";
import {
  SupportHeader,
  SupportDetailsView,
  ReplyTicketModal,
  AssignTicketModal,
  CloseTicketModal,
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

  const [selectedPriority, setSelectedPriority] = useState("All Priority");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  const [selectedTicketForReply, setSelectedTicketForReply] = useState(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const [selectedTicketForAssign, setSelectedTicketForAssign] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const [selectedTicketForClose, setSelectedTicketForClose] = useState(null);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  const listFilters = useMemo(() => {
    const filters = {};
    if (selectedPriority !== "All Priority") filters.priority = selectedPriority;
    if (selectedStatus !== "All Statuses") filters.status = selectedStatus;
    return filters;
  }, [selectedPriority, selectedStatus]);

  const ticketsQuery = useTickets(listFilters);
  const ticketQuery = useTicket(id);
  const updateTicket = useUpdateTicket();
  const replyTicket = useReplyTicket();

  useMutationFeedback(updateTicket, {
    successMessage: "Ticket updated.",
    errorTitle: "Update failed",
  });
  useMutationFeedback(replyTicket, {
    successMessage: "Reply sent.",
    errorTitle: "Reply failed",
  });

  const tickets = useMemo(
    () => unwrapList(ticketsQuery.data),
    [ticketsQuery.data],
  );

  const currentTicket = id ? ticketQuery.data : null;
  const detailLoading = Boolean(id) && ticketQuery.isLoading;
  const detailError = Boolean(id) && ticketQuery.isError;
  const detailMissing =
    Boolean(id) &&
    !ticketQuery.isLoading &&
    (isNotFoundError(ticketQuery.error) ||
      (!ticketQuery.isError && !currentTicket && ticketQuery.isFetched));

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

  const mutateTicket = (ticketId, updates) => {
    if (updateTicket.isPending) return;
    updateTicket.mutate({ id: ticketId, payload: updates });
  };

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
    } else if (act.includes("closed") && act.includes("status")) {
      setSelectedTicketForClose(row);
      setIsCloseModalOpen(true);
    } else if (act === "closed") {
      setSelectedTicketForClose(row);
      setIsCloseModalOpen(true);
    } else if (act.includes("open")) {
      mutateTicket(row.id, { status: "Open" });
    } else if (act.includes("pending")) {
      mutateTicket(row.id, { status: "Pending" });
    } else if (act.includes("high")) {
      mutateTicket(row.id, { priority: "High" });
    } else if (act.includes("low")) {
      mutateTicket(row.id, { priority: "Low" });
    }
  };

  const handleUpdateTicket = (ticketId, updates) => {
    mutateTicket(ticketId, updates);
  };

  const handleAssignAgent = (ticketId, newAgent) => {
    mutateTicket(ticketId, { assignedAgent: newAgent });
  };

  const handleConfirmClose = (ticketId) => {
    mutateTicket(ticketId, { status: "Closed" });
  };

  const handleSendReply = (ticketId, messageText) => {
    if (replyTicket.isPending) return;
    replyTicket.mutate({ id: ticketId, payload: { message: messageText } });
  };

  if (id) {
    if (detailLoading) {
      return (
        <DataTable
          columns={columns}
          data={[]}
          isLoading
          emptyMessage="Loading ticket…"
        />
      );
    }

    if (detailError && !isNotFoundError(ticketQuery.error)) {
      return (
        <div className="rounded-xl border border-slate-100 bg-white shadow-sm">
          <ErrorState
            title="Unable to load ticket"
            error={ticketQuery.error}
            onRetry={() => ticketQuery.refetch()}
          />
        </div>
      );
    }

    if (detailMissing || !currentTicket) {
      return (
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
      );
    }

    return (
      <div className="min-h-full space-y-6 text-slate-900 font-sans">
        <SupportDetailsView
          ticket={currentTicket}
          onBack={() => navigate("/dashboard/admin/support")}
          onUpdateTicket={handleUpdateTicket}
        />
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-6 text-slate-900 font-sans">
      <SupportHeader
        selectedPriority={selectedPriority}
        onSelectPriority={setSelectedPriority}
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
      />

      <DataTable
        columns={columns}
        data={tickets}
        actions={SUPPORT_ACTIONS}
        onActionClick={handleActionClick}
        pageSize={10}
        emptyMessage="No support tickets found matching the selected filters."
        isLoading={ticketsQuery.isLoading}
        isFetching={ticketsQuery.isFetching && !ticketsQuery.isLoading}
        error={ticketsQuery.isError ? ticketsQuery.error : null}
        onRetry={() => ticketsQuery.refetch()}
      />

      <ReplyTicketModal
        isOpen={isReplyModalOpen}
        onClose={() => {
          setIsReplyModalOpen(false);
          setSelectedTicketForReply(null);
        }}
        ticket={selectedTicketForReply}
        onSendReply={handleSendReply}
      />

      <AssignTicketModal
        isOpen={isAssignModalOpen}
        onClose={() => {
          setIsAssignModalOpen(false);
          setSelectedTicketForAssign(null);
        }}
        ticket={selectedTicketForAssign}
        onAssign={handleAssignAgent}
      />

      <CloseTicketModal
        isOpen={isCloseModalOpen}
        onClose={() => {
          setIsCloseModalOpen(false);
          setSelectedTicketForClose(null);
        }}
        ticket={selectedTicketForClose}
        onConfirmClose={handleConfirmClose}
      />
    </div>
  );
};

export default AdminSupportView;
