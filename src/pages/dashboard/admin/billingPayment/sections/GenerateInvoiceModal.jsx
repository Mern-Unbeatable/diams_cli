import { useState } from "react";
import { X, Calendar } from "lucide-react";

const CUSTOMER_OPTIONS = [
  "Bessie Cooper",
  "Savannah Nguyen",
  "Ronald Richards",
  "Brooklyn Simmons",
  "Leslie Alexander",
  "Robert Fox",
  "Jenny Wilson",
  "Esther Howard",
  "Arlene McCoy",
  "Jacob Jones",
];

const GenerateInvoiceModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    amount: "",
    date: "08/13/2026",
    status: "Unpaid",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const rawNum = parseFloat(formData.amount.replace(/[^0-9.]/g, "")) || 30.9;
    const newInvoice = {
      id: `inv-${Date.now()}`,
      invoiceId: `INV-2406-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: formData.customerName || "Bessie Cooper",
      amount: formData.amount
        ? formData.amount.startsWith("CHF")
          ? formData.amount
          : `CHF ${formData.amount}`
        : "CHF 30.90",
      rawAmount: rawNum,
      date: formData.date || "08/13/2026",
      status: formData.status || "Unpaid",
    };

    onSave(newInvoice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white p-6 shadow-2xl transition-all sm:p-8 z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Generate invoice
            </h2>
            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              Create a new invoice for a NovaSky customer.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-100 p-2 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Grid */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Customer Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Customer
              </label>
              <select
                value={formData.customerName}
                onChange={(e) =>
                  setFormData({ ...formData, customerName: e.target.value })
                }
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
              >
                <option value="">Select customer</option>
                {CUSTOMER_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Amount
              </label>
              <input
                type="text"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                placeholder=""
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>

            {/* Date Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Date
              </label>
              <div className="relative mt-1.5">
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  placeholder="08/13/2026"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-10 text-xs text-slate-900 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Status Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
              >
                <option value="Unpaid">Unpaid</option>
                <option value="Paid">Paid</option>
                <option value="Refund">Refund</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95 sm:text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#2ea5ff] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-500 active:scale-95 sm:text-sm"
            >
              Generate Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateInvoiceModal;
