import { useState, useMemo } from "react";
import DataTable from "@/Components/dashboard/DataTable";
import {
  SupportHeader,
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
  const [tickets, setTickets] = useState(SUPPORT_TICKETS_DATA);
  const [selectedPriority, setSelectedPriority] = useState("All Priority");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

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
              row.priority
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
              row.status
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
    []
  );

  // Action Menu Click Handler
  const handleActionClick = (actionName, row) => {
    const act = String(actionName).toLowerCase();
    if (act.includes("closed")) {
      setTickets((prev) =>
        prev.map((t) => (t.id === row.id ? { ...t, status: "Closed" } : t))
      );
    } else if (act.includes("open")) {
      setTickets((prev) =>
        prev.map((t) => (t.id === row.id ? { ...t, status: "Open" } : t))
      );
    } else if (act.includes("pending")) {
      setTickets((prev) =>
        prev.map((t) => (t.id === row.id ? { ...t, status: "Pending" } : t))
      );
    } else if (act.includes("high")) {
      setTickets((prev) =>
        prev.map((t) => (t.id === row.id ? { ...t, priority: "High" } : t))
      );
    } else if (act.includes("low")) {
      setTickets((prev) =>
        prev.map((t) => (t.id === row.id ? { ...t, priority: "Low" } : t))
      );
    } else if (act.includes("assigned")) {
      const agent = prompt("Enter agent name to assign:", row.assignedAgent);
      if (agent) {
        setTickets((prev) =>
          prev.map((t) => (t.id === row.id ? { ...t, assignedAgent: agent } : t))
        );
      }
    } else {
      console.log("Ticket action:", actionName, row);
    }
  };

  return (
    <div className="min-h-full space-y-6 text-slate-900 font-sans">
      {/* 1. Header with Priority & Status Filter Dropdowns */}
      <SupportHeader
        selectedPriority={selectedPriority}
        onSelectPriority={setSelectedPriority}
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
      />

      {/* 2. Support Tickets Table with Common DataTable */}
      <DataTable
        columns={columns}
        data={filteredTickets}
        actions={SUPPORT_ACTIONS}
        onActionClick={handleActionClick}
        pageSize={10}
        emptyMessage="No support tickets found matching the selected filters."
      />
    </div>
  );
};

export default AdminSupportView;
