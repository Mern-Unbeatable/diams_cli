import { useState } from "react";
import { X, Calendar } from "lucide-react";

const RECIPIENT_OPTIONS = [
  "Optional (All)",
  "Bessie Cooper",
  "Albert Flores",
  "Marvin McKinney",
  "Dianne Russell",
  "Cameron Williamson",
  "Robert Fox",
  "Jane Cooper",
  "Brooklyn Simmons",
];

const CreateNotificationModal = ({ isOpen, onClose, onSave }) => {
  const [audience, setAudience] = useState("All Customers");
  const [notificationType, setNotificationType] = useState("Email");
  const [recipient, setRecipient] = useState("Optional (All)");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("08/13/2026");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNotification = {
      id: `ntf-${Date.now()}`,
      ntfId: `NTF-${Math.floor(6000 + Math.random() * 900)}`,
      audience:
        audience === "All Customers" ? "All Customer" : "Individual Customer",
      subject: subject || "Service update notice",
      type: notificationType,
      status: "Sent",
      date: date || "08/13/2026",
      message: message || "Important account update notification.",
    };

    onSave(newNotification);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-xl overflow-hidden rounded-xl bg-white p-6 shadow-2xl transition-all sm:p-8 z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Create notification
            </h2>
            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              Compose Email, SMS or Push messages for NovaSky customers.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-100 p-1.5 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Select audience */}
          <div>
            <label className="block text-xs font-semibold text-slate-800">
              Select audience
            </label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <label
                className={`flex items-center gap-3 rounded-xl border p-3.5 cursor-pointer transition-all ${
                  audience === "All Customers"
                    ? "border-sky-500 bg-sky-50/40 text-slate-900"
                    : "border-slate-200 hover:border-slate-300 text-slate-600"
                }`}
              >
                <input
                  type="radio"
                  name="audience"
                  value="All Customers"
                  checked={audience === "All Customers"}
                  onChange={() => setAudience("All Customers")}
                  className="h-4 w-4 text-sky-600 focus:ring-sky-500"
                />
                <span className="text-xs font-semibold sm:text-sm">
                  All Customers
                </span>
              </label>

              <label
                className={`flex items-center gap-3 rounded-xl border p-3.5 cursor-pointer transition-all ${
                  audience === "Individual Customer"
                    ? "border-sky-500 bg-sky-50/40 text-slate-900"
                    : "border-slate-200 hover:border-slate-300 text-slate-600"
                }`}
              >
                <input
                  type="radio"
                  name="audience"
                  value="Individual Customer"
                  checked={audience === "Individual Customer"}
                  onChange={() => setAudience("Individual Customer")}
                  className="h-4 w-4 text-sky-600 focus:ring-sky-500"
                />
                <span className="text-xs font-semibold sm:text-sm">
                  Individual Customer
                </span>
              </label>
            </div>
          </div>

          {/* Row 2: Notification Type & Recipient */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-800">
                Notification Type
              </label>
              <select
                value={notificationType}
                onChange={(e) => setNotificationType(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
              >
                <option value="Email">Email</option>
                <option value="Sms">SMS</option>
                <option value="Push">Push</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800">
                Recipient
              </label>
              <select
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
              >
                {RECIPIENT_OPTIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-semibold text-slate-800">
              Subject
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder=""
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold text-slate-800">
              Message
            </label>
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder=""
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-3.5 text-xs text-slate-900 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm resize-none"
            />
          </div>

          {/* Schedule or Send Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-800">
              Schedule or Send Date
            </label>
            <div className="relative mt-1.5">
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="08/13/2026"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-10 text-xs text-slate-900 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
              <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
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
              Send Notification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNotificationModal;
