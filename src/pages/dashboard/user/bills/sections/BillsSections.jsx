import { useState } from "react";
import { Link } from "react-router";
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  CreditCard,
  Download,
  FileText,
  Filter,
  Heart,
  HelpCircle,
  MessageCircle,
  Phone,
  ShieldCheck,
  X,
} from "lucide-react";
import { USER_BILLS } from "@/config/userBills";
import DashboardTabs from "@/Components/dashboard/DashboardTabs";

export const BillsHeader = () => (
  <div>
    <h2 className="text-2xl font-bold text-primary sm:text-[1.75rem]">Bills</h2>
    <p className="mt-1 text-sm text-primary/60">
      View and download all your bills.
    </p>
  </div>
);

export const BillsAutoPaymentBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { autoPayment } = USER_BILLS;

  if (!isVisible) return null;

  return (
    <section className="flex flex-col gap-3 rounded-xl border border-blue-100 bg-[#eef7ff] p-4 sm:flex-row sm:items-center sm:justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-white text-btnPrimary shadow-sm">
          <FileText size={20} />
        </span>
        <div>
          <h4 className="text-xs font-bold text-primary sm:text-sm">
            {autoPayment.title}
          </h4>
          <p className="text-[11px] text-primary/60 sm:text-xs">
            {autoPayment.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 shrink-0">
        <button
          type="button"
          className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-btnPrimary shadow-sm transition-colors hover:bg-gray-50"
        >
          {autoPayment.buttonText}
        </button>
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="rounded-lg p-1 text-primary/40 hover:text-primary transition-colors"
          aria-label="Dismiss banner"
        >
          <X size={18} />
        </button>
      </div>
    </section>
  );
};

export const BillsTableCard = () => {
  const { billsList, tabs } = USER_BILLS;
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBills = billsList.filter((bill) => {
    if (activeTab === "paid") return bill.status === "Paid";
    if (activeTab === "pending") return bill.status === "Pending";
    if (activeTab === "failed") return bill.status === "Failed";
    return true;
  });

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 space-y-6">
      {/* Tabs & Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 min-w-0">
          <DashboardTabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-primary/70 transition-colors hover:bg-gray-50 self-start sm:self-auto"
        >
          <Filter size={14} className="text-primary/50" />
          <span>Filtrer</span>
          <ChevronDown size={14} className="text-primary/40" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-[10px] font-bold uppercase tracking-wider text-primary/45">
              <th className="pb-3 font-bold">PÉRIODE</th>
              <th className="pb-3 font-bold">ISSUE DATE</th>
              <th className="pb-3 font-bold">AMOUNT</th>
              <th className="pb-3 font-bold">STATUS</th>
              <th className="pb-3 font-bold text-center">DOWNLOAD</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredBills.map((bill) => {
              const isPaid = bill.status === "Paid";

              return (
                <tr key={bill.id} className="group hover:bg-gray-50/40">
                  <td className="py-4 text-xs font-bold text-primary">
                    <div>
                      <p className="text-sm font-bold text-primary">
                        {bill.periodMonth}
                      </p>
                      <p className="text-[11px] text-primary/45 font-normal">
                        {bill.periodDates}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 text-xs font-medium text-primary/70">
                    {bill.issueDate}
                  </td>
                  <td className="py-4 text-xs text-primary">
                    <p className="text-sm font-bold text-primary">
                      CHF {bill.amount}
                    </p>
                    <p className="text-[10px] text-primary/40">VAT included</p>
                  </td>
                  <td className="py-4 text-xs">
                    {isPaid ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                        <CheckCircle2 size={14} />
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600">
                        <Clock size={14} />
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-4 text-center">
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-btnPrimary transition-colors hover:bg-sky-100"
                      aria-label={`Download ${bill.periodMonth} bill`}
                    >
                      <Download size={15} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col gap-3 pt-3 border-t border-gray-100 sm:flex-row sm:items-center sm:justify-between text-xs text-primary/50">
        <p className="text-xs">1-8 of 12 bills</p>

        <div className="flex items-center gap-1.5 justify-center">
          <button
            type="button"
            className="px-2 py-1 text-primary/40 hover:text-primary transition-colors disabled:opacity-30"
            disabled={currentPage === 1}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className={`h-7 w-7 rounded-lg text-xs font-bold transition-colors ${
              currentPage === 1
                ? "bg-btnPrimary text-white shadow-sm"
                : "text-primary/70 hover:bg-gray-100"
            }`}
          >
            1
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className={`h-7 w-7 rounded-lg text-xs font-bold transition-colors ${
              currentPage === 2
                ? "bg-btnPrimary text-white shadow-sm"
                : "text-primary/70 hover:bg-gray-100"
            }`}
          >
            2
          </button>
          <button
            type="button"
            className="px-2 py-1 text-primary/40 hover:text-primary transition-colors"
          >
            ›
          </button>
        </div>

        <div className="flex items-center gap-2 justify-end">
          <span>Lignes par page</span>
          <select className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs text-primary font-semibold focus:outline-none">
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="24">24</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export const BillsSidebar = () => {
  const { summary, paymentMethod, helpLinks } = USER_BILLS;

  return (
    <div className="space-y-6">
      {/* Widget 1: Summary of your bills */}
      <section className="rounded-xl bg-[#0b1329] p-5 sm:p-6 text-white space-y-4 shadow-lg shadow-slate-900/10">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white">
            <FileText size={16} />
          </span>
          <h3 className="text-base font-bold">Summary of your bills</h3>
        </div>

        <div className="space-y-4 pt-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">
              TOTAL PAID
            </p>
            <h4 className="text-2xl font-bold text-white mt-0.5 sm:text-3xl">
              CHF {summary.totalPaid}
            </h4>
            <p className="text-xs text-white/50 mt-0.5">
              {summary.paidBillsCount} bills
            </p>
          </div>

          <div className="border-t border-white/10 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">
              PENDING PAYMENT
            </p>
            <h4 className="text-xl font-bold text-white mt-0.5 sm:text-2xl">
              CHF {summary.pendingPayment}
            </h4>
            <p className="text-xs text-white/50 mt-0.5">
              {summary.pendingBillsCount} bill
            </p>
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-btnPrimary py-3 text-xs font-bold text-white shadow-md transition-colors hover:bg-btnPrimary/90 mt-4"
          >
            <CreditCard size={16} />
            <span>Make a payment</span>
          </button>
        </div>
      </section>

      {/* Widget 2: Payment method */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 space-y-3">
        <h3 className="text-sm font-bold text-primary">Payment method</h3>
        <div className="flex items-center gap-3 pt-1">
          <span className="rounded border border-gray-200 bg-gray-50 px-2 py-1 text-[10px] font-bold text-blue-800 tracking-wider">
            {paymentMethod.provider.toUpperCase()}
          </span>
          <span className="text-xs font-bold text-primary">
            Visa **** {paymentMethod.last4}
          </span>
        </div>

        <div className="pt-2">
          <Link
            to="/dashboard/user/payments"
            className="inline-flex items-center gap-1 text-xs font-semibold text-btnPrimary hover:underline"
          >
            Manage my payments →
          </Link>
        </div>
      </section>

      {/* Widget 3: Zero paper, more impact */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 space-y-3">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <Heart size={16} />
          </span>
          <div>
            <h4 className="text-xs font-bold text-primary">
              Zero paper, more impact
            </h4>
            <p className="mt-1 text-[11px] text-primary/55 leading-relaxed">
              Choose electronic billing and help protect the environment.
            </p>
          </div>
        </div>

        <div className="pt-1">
          <Link
            to="/dashboard/user/support"
            className="inline-flex items-center gap-1 text-xs font-semibold text-btnPrimary hover:underline"
          >
            Learn more →
          </Link>
        </div>
      </section>

      {/* Widget 4: Need help */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 space-y-3">
        <h3 className="text-sm font-bold text-primary">Need help?</h3>
        <ul className="divide-y divide-gray-100">
          {helpLinks.map((item) => (
            <li key={item.id}>
              <Link
                to="/dashboard/user/support"
                className="flex items-center gap-3 py-3 transition-colors hover:opacity-80"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-primary/70 border border-gray-100">
                  {item.icon === "chat" && <MessageCircle size={16} />}
                  {item.icon === "help" && <HelpCircle size={16} />}
                  {item.icon === "phone" && <Phone size={16} />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-primary">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-primary/45 truncate mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
                <ChevronRight size={14} className="shrink-0 text-primary/30" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
