import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";

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
      return "bg-[#fef3c7] text-[#d97706]";
    case "pending":
      return "bg-[#e0f2fe] text-[#0284c7]";
    case "closed":
      return "bg-[#e6f4ea] text-[#137333]";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const SupportDetailsView = ({ ticket, onBack, onUpdateTicket }) => {
  const [currentStatus, setCurrentStatus] = useState(
    ticket?.status || "Open"
  );
  const [assignedAgent, setAssignedAgent] = useState(
    ticket?.assignedAgent || "Mira Roth"
  );
  const [messages, setMessages] = useState([
    {
      sender: `Customer (${ticket?.customer || "Jonas Baumann"})`,
      text: "Customer: My family SIMs stopped working.",
    },
    {
      sender: assignedAgent,
      text: `${assignedAgent}: We are reviewing your overdue invoice and line status.`,
    },
  ]);
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const ticketId = ticket?.ticketId || "TCK-5011";
  const customer = ticket?.customer || "Jonas Baumann";
  const subject = ticket?.subject || "Line suspended after overdue invoice";
  const priority = ticket?.priority || "High";

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg = {
      sender: assignedAgent,
      text: `${assignedAgent}: ${replyText.trim()}`,
    };
    setMessages((prev) => [...prev, newMsg]);
    setReplyText("");
    setIsReplying(false);
  };

  const handleAssign = () => {
    const newAgent = prompt("Enter agent name to assign:", assignedAgent);
    if (newAgent) {
      setAssignedAgent(newAgent);
      if (onUpdateTicket) {
        onUpdateTicket(ticket?.id, { assignedAgent: newAgent });
      }
    }
  };

  const handleClose = () => {
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
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 transition-colors hover:text-sky-600"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Support Center</span>
      </button>

      {/* Header */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-sky-500">
          Support Ticket
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl mt-0.5">
          {ticketId}
        </h1>
      </div>

      {/* 1. Ticket Details Card */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-7 space-y-4">
        <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Ticket Details
        </span>

        <div className="space-y-3.5 text-xs sm:text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Customer</span>
            <span className="font-semibold text-slate-900">{customer}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Subject</span>
            <span className="font-semibold text-slate-900">{subject}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Priority</span>
            <span
              className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${getPriorityBadgeStyle(
                priority
              )}`}
            >
              {priority}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Status</span>
            <span
              className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${getStatusBadgeStyle(
                currentStatus
              )}`}
            >
              {currentStatus}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Assigned agent</span>
            <span className="font-semibold text-slate-900">{assignedAgent}</span>
          </div>
        </div>
      </div>

      {/* 2. Conversation Card */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-7 space-y-4">
        <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Conversation
        </span>

        <div className="space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-100/90 bg-[#f8fafc] p-4 text-xs sm:text-sm text-slate-700"
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Inline Reply Form */}
        {isReplying && (
          <form onSubmit={handleSendReply} className="mt-4 space-y-3">
            <textarea
              rows={3}
              required
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your response to the customer..."
              className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500 resize-none"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsReplying(false)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#2ea5ff] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-sky-500"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send Reply</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 3. Action Buttons Row */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="button"
          onClick={() => setIsReplying(!isReplying)}
          className="rounded-xl bg-[#2ea5ff] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-sky-500 active:scale-95"
        >
          Reply
        </button>

        <button
          type="button"
          onClick={handleAssign}
          className="rounded-xl bg-[#0b192c] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95"
        >
          Assign
        </button>

        <button
          type="button"
          onClick={handleClose}
          className="rounded-xl bg-[#38bdf8] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-cyan-500 active:scale-95"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SupportDetailsView;
