import { useState } from "react";
import { X } from "lucide-react";

const ReplyTicketModal = ({ isOpen, onClose, ticket, onSendReply }) => {
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (onSendReply) {
      onSendReply(ticket?.id, message.trim());
    }
    setMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white p-6 shadow-2xl transition-all sm:p-8 z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Reply to ticket
            </h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Send a reply to the support conversation.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 p-1.5 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-800">
              Message
            </label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder=""
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-4 text-xs font-medium text-slate-900 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95 sm:text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#2ea5ff] px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-500 active:scale-95 sm:text-sm"
            >
              Send Reply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReplyTicketModal;
