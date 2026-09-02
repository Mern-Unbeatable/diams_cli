import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import ReplyTicketModal from "./ReplyTicketModal";
import AssignTicketModal from "./AssignTicketModal";
import CloseTicketModal from "./CloseTicketModal";

const getPriorityBadgeStyle = (priority) => {
  const norm = String(priority).toLowerCase();
  switch (norm) {
    case "high":
      return "bg-[#e0f2fe] text-[#0284c7]";
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
    case "open":
      return "bg-[#fff3e0] text-[#f57c00]";
    case "pending":
      return "bg-[#e0f2fe] text-[#0284c7]";
    case "closed":
      return "bg-[#e6f4ea] text-[#137333]";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const SupportDetailsView = ({ ticket, onBack, onUpdateTicket }) => {
  const [currentStatus, setCurrentStatus] = useState(ticket?.status || "Open");
  const [assignedAgent, setAssignedAgent] = useState(
    ticket?.assignedAgent || "Mira Roth"
  );
  const [messages, setMessages] = useState([
    {
      sender: "Customer",
      text: "Customer: My family SIMs stopped working.",
    },
    {
      sender: ticket?.assignedAgent || "Mira Roth",
      text: `${ticket?.assignedAgent || "Mira Roth"}: We are reviewing your overdue invoice and line status.`,
    },
  ]);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  const ticketId = ticket?.ticketId || "TCK-5011";
  const customer = ticket?.customer || "Jonas Baumann";
  const subject = ticket?.subject || "Line suspended after overdue invoice";
  const priority = ticket?.priority || "High";

  const handleSendReply = (ticketId, messageText) => {
    const newMsg = {
      sender: assignedAgent,
      text: `${assignedAgent}: ${messageText}`,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const handleAssignAgent = (ticketId, newAgent) => {
    setAssignedAgent(newAgent);
    if (onUpdateTicket) {
      onUpdateTicket(ticket?.id, { assignedAgent: newAgent });
    }
  };

  const handleConfirmClose = () => {
    setCurrentStatus("Closed");
    if (onUpdateTicket) {
      onUpdateTicket(ticket?.id, { status: "Closed" });
    }
  };

  return (
    <div className="w-full space-y-6 pb-12 text-slate-900 font-sans">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition-colors hover:text-sky-600"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Support Center</span>
      </button>

      <div className="rounded-xl bg-white p-6 shadow-sm space-y-6">
        {/* Header */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284c7]">
            SUPPORT TICKET
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl mt-0.5">
            {ticketId}
          </h1>
        </div>

        {/* 1. TICKET DETAILS Card */}
        <div className="rounded-2xl border border-slate-100 bg-[#f8fbfe] p-6 sm:p-7 space-y-4">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            TICKET DETAILS
          </span>

          <div className="space-y-3.5 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-normal">Customer</span>
              <span className="font-semibold text-slate-900">{customer}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-normal">Subject</span>
              <span className="font-semibold text-slate-900">{subject}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-normal">Priority</span>
              <span
                className={`inline-block rounded-full px-3.5 py-0.5 text-xs font-semibold ${getPriorityBadgeStyle(
                  priority
                )}`}
              >
                {priority}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-normal">Status</span>
              <span
                className={`inline-block rounded-full px-3.5 py-0.5 text-xs font-semibold ${getStatusBadgeStyle(
                  currentStatus
                )}`}
              >
                {currentStatus}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-normal">Assigned agent</span>
              <span className="font-semibold text-slate-900">{assignedAgent}</span>
            </div>
          </div>
        </div>

        {/* 2. CONVERSATION Card */}
        <div className="rounded-2xl border border-slate-100 bg-[#f8fbfe] p-6 sm:p-7 space-y-4">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            CONVERSATION
          </span>

          <div className="space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-100/90 bg-white p-4 text-xs sm:text-sm text-slate-800 shadow-none"
              >
                {msg.text}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => setIsReplyModalOpen(true)}
            className="rounded-xl bg-[#2ea5ff] px-7 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-sky-500 active:scale-95"
          >
            Reply
          </button>

          <button
            type="button"
            onClick={() => setIsAssignModalOpen(true)}
            className="rounded-xl bg-[#0b192c] px-7 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95"
          >
            Assign
          </button>

          <button
            type="button"
            onClick={() => setIsCloseModalOpen(true)}
            className="rounded-xl bg-[#38bdf8] px-7 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-sky-400 active:scale-95"
          >
            Close
          </button>
        </div>
      </div>

      {/* Reply to Ticket Modal */}
      <ReplyTicketModal
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        ticket={ticket}
        onSendReply={handleSendReply}
      />

      {/* Assign Ticket Modal */}
      <AssignTicketModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        ticket={{ ...ticket, assignedAgent }}
        onAssign={handleAssignAgent}
      />

      {/* Close Ticket Modal */}
      <CloseTicketModal
        isOpen={isCloseModalOpen}
        onClose={() => setIsCloseModalOpen(false)}
        ticket={ticket}
        onConfirmClose={handleConfirmClose}
      />
    </div>
  );
};

export default SupportDetailsView;
