import { CheckCircle2, Clock, FileText, Send, X } from "lucide-react";
import { useState } from "react";

export const TicketDetailsModal = ({ isOpen, onClose, ticket }) => {
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([
    {
      id: 1,
      sender: "Support Agent (Marc B.)",
      text: "Hello! We have received your inquiry and our engineering team is reviewing your profile.",
      time: "2 days ago",
    },
  ]);

  if (!isOpen || !ticket) return null;

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;

    setReplies((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "You",
        text: reply.trim(),
        time: "Just now",
      },
    ]);
    setReply("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-[#0284c7] border border-sky-100">
                Ticket #{ticket.id}
              </span>
              <span className="text-xs text-primary/45 font-medium">
                {ticket.date}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-primary mt-1">
              {ticket.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-primary/40 hover:bg-gray-100 hover:text-primary transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs">
          <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 space-y-1">
            <p className="font-bold text-primary">Original Description</p>
            <p className="text-primary/70 leading-relaxed">
              {ticket.description || "No further details provided."}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <p className="font-bold text-primary text-[11px] uppercase tracking-wider text-primary/50">
              Updates & Replies
            </p>
            {replies.map((r) => (
              <div
                key={r.id}
                className={`p-3 rounded-xl border ${
                  r.sender === "You"
                    ? "bg-sky-50/60 border-sky-100 ml-4"
                    : "bg-white border-gray-100 mr-4"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-primary">{r.sender}</span>
                  <span className="text-[10px] text-primary/40">{r.time}</span>
                </div>
                <p className="text-primary/80 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reply Form */}
        <form
          onSubmit={handleSendReply}
          className="pt-3 border-t border-gray-100 flex gap-2"
        >
          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type a follow-up reply..."
            className="flex-1 rounded-xl border border-gray-200 px-3.5 py-2 text-xs font-medium text-primary focus:border-btnPrimary focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-xl bg-btnPrimary px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-btnPrimary/90 transition-colors"
          >
            Reply
          </button>
        </form>
      </div>
    </div>
  );
};
