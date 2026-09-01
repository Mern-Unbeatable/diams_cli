import { Check, Mail, UploadCloud, X } from "lucide-react";
import { useState } from "react";

export const NewTicketModal = ({ isOpen, onClose, onCreateTicket }) => {
  const [topic, setTopic] = useState("eSIM");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    const newTicket = {
      id: `NS-${Math.floor(10000 + Math.random() * 90000)}`,
      title: subject.trim(),
      category: topic,
      status: "In Progress",
      statusVariant: "blue",
      updated: "Just now",
      date: "Today",
      description: description.trim(),
    };

    onCreateTicket?.(newTicket);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100">
              <Mail size={18} />
            </span>
            <h3 className="text-base font-bold text-primary">
              Open a Support Ticket
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

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-primary">Topic Category</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 font-semibold text-primary focus:border-btnPrimary focus:outline-none"
            >
              <option value="eSIM">eSIM & Activation</option>
              <option value="Data">Data & Connectivity</option>
              <option value="Billing">Billing & Payments</option>
              <option value="Account">Account & Profile</option>
              <option value="SIM">SIM & PUK</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-primary">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Cannot connect to 5G network in Zurich"
              className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 font-semibold text-primary focus:border-btnPrimary focus:outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-primary">Detailed Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please describe your issue in detail..."
              className="w-full rounded-xl border border-gray-200 bg-white p-3 font-medium text-primary focus:border-btnPrimary focus:outline-none"
              required
            />
          </div>

          <div className="rounded-xl border border-dashed border-sky-200 bg-sky-50/40 p-3 text-center cursor-pointer hover:bg-sky-50 transition-colors">
            <UploadCloud size={18} className="mx-auto text-btnPrimary" />
            <p className="font-semibold text-primary text-[11px] mt-0.5">
              Attach screenshot or log file (Optional)
            </p>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-4 py-2 font-semibold text-primary/70 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-btnPrimary px-5 py-2 font-bold text-white shadow-sm hover:bg-btnPrimary/90 transition-colors"
            >
              <Check size={14} />
              <span>Submit Ticket</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
