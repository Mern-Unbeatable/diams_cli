import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";

const SupportDetailsView = ({ ticket, onBack, onUpdateTicket }) => {
  const [currentStatus, setCurrentStatus] = useState(ticket?.status || "Open");
  const [assignedAgent, setAssignedAgent] = useState(
    ticket?.assignedAgent || "Mira Roth",
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
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition-colors hover:text-sky-600"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Support Center</span>
      </button>

      <div className="bg-white p-4 rounded-xl shadow-sm space-y-6">
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
              <span className="inline-block rounded-full bg-[#e0f7fa] px-3.5 py-0.5 text-xs font-semibold text-[#0284c7]">
                {priority}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-normal">Status</span>
              <span className="inline-block rounded-full bg-[#fff3e0] px-3.5 py-0.5 text-xs font-semibold text-[#f57c00]">
                {currentStatus}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-normal">Assigned agent</span>
              <span className="font-semibold text-slate-900">
                {assignedAgent}
              </span>
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

          {/* Inline Reply Box */}
          {isReplying && (
            <form onSubmit={handleSendReply} className="mt-4 space-y-3">
              <textarea
                rows={3}
                required
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your response to the customer..."
                className="w-full rounded-xl border border-slate-200 bg-white p-4 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500 resize-none"
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
            className="rounded-xl bg-[#2ea5ff] px-7 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-sky-500 active:scale-95"
          >
            Reply
          </button>

          <button
            type="button"
            onClick={handleAssign}
            className="rounded-xl bg-[#0b192c] px-7 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95"
          >
            Assign
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl bg-[#38bdf8] px-7 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-sky-400 active:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportDetailsView;
