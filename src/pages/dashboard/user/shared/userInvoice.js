import { USER_MY_INFORMATION } from "@/config/userMyInformation";
import { USER_ESIM } from "@/config/userEsim";
import { USER_PAYMENTS } from "@/config/userPayments";
import { parseChf } from "@/Components/invoice";

const VAT_RATE = 8.1;
const { personalInfo, accountInfo } = USER_MY_INFORMATION;
const { activeEsim } = USER_ESIM;
const PLAN_TITLE = `${activeEsim.planName} 5G (Switzerland + Europe)`;

const toPeriod = (value) => value?.replace(" - ", " – ");

const excludeVat = (amount) =>
  Math.round((amount / (1 + VAT_RATE / 100)) * 100) / 100;

const toItems = (breakdown, total, title, description) => {
  if (!breakdown?.planName) {
    return [
      {
        title: title || PLAN_TITLE,
        description:
          description ||
          "Monthly subscription • 5G data, unlimited Swiss calls & SMS",
        quantity: 1,
        unitPrice: excludeVat(total),
      },
    ];
  }

  return [
    {
      title: breakdown.planName,
      description: "Monthly subscription fee",
      amount: breakdown.baseAmount,
    },
    ...(breakdown.options || []).map((option) => ({
      title: option.name,
      description: "Add-on service",
      amount: option.amount,
    })),
  ].map((line) => ({
    title: line.title,
    description: line.description,
    quantity: 1,
    unitPrice: excludeVat(parseChf(line.amount)),
  }));
};

/** Amounts on user bills are VAT-inclusive; VAT is derived from the total. */
export const toUserInvoice = ({
  invoiceId,
  issueDate,
  dueDate,
  servicePeriod,
  amount,
  status,
  breakdown,
  title,
  description,
}) => {
  const total = parseChf(amount);
  const items = toItems(breakdown, total, title, description);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice, 0);

  return {
    invoiceId,
    status,
    issueDate,
    dueDate,
    servicePeriod: toPeriod(servicePeriod),
    customer: personalInfo.fullName,
    customerNumber: accountInfo.accountNumber,
    customerDetails: {
      addressLines: personalInfo.address.split(",").map((part) => part.trim()),
      email: personalInfo.email,
      phone: personalInfo.phone,
    },
    subscription: {
      primaryPlan: `${activeEsim.planName} 5G`,
      phoneLine: activeEsim.number,
      iccid: activeEsim.iccid,
    },
    items,
    vatRate: `${VAT_RATE}%`,
    vat: Math.max(total - subtotal, 0).toFixed(2),
    totalAmount: total.toFixed(2),
  };
};

const findPaymentBill = (month) =>
  USER_PAYMENTS.bills.find((bill) => bill.month === month);

/** Bill objects from USER_PAYMENTS.bills (have invoiceNumber + breakdown). */
export const paymentBillToInvoice = (bill, overrides = {}) =>
  toUserInvoice({
    invoiceId: bill.invoiceNumber,
    issueDate: bill.issueDate,
    servicePeriod: bill.period,
    amount: bill.amount,
    status: bill.status,
    breakdown: bill.breakdown,
    ...overrides,
  });

/** Rows from USER_BILLS.billsList. */
export const billRowToInvoice = (bill) => {
  const match = findPaymentBill(bill.periodMonth);
  const date = new Date(bill.issueDate);
  const sequence = String(bill.id).replace(/\D/g, "").padStart(4, "0");
  const fallbackId = Number.isNaN(date.getTime())
    ? `INV-${sequence}`
    : `INV-${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${sequence}`;

  return toUserInvoice({
    invoiceId: match?.invoiceNumber || fallbackId,
    issueDate: bill.issueDate,
    servicePeriod: bill.periodDates,
    amount: bill.amount,
    status: bill.status,
    breakdown: match?.breakdown,
  });
};

/** Rows from the payment history table. */
export const paymentHistoryToInvoice = (row) =>
  toUserInvoice({
    invoiceId: row.invoice || row.id,
    issueDate: row.date,
    amount: row.amount,
    status: row.status,
    title: row.type ? `${row.type} • ${PLAN_TITLE}` : undefined,
  });

/** Latest bill card on the overview (matched by month). */
export const latestBillToInvoice = (latestBill) => {
  const match = findPaymentBill(latestBill.month);
  return match
    ? paymentBillToInvoice(match, { status: latestBill.status })
    : toUserInvoice({
        invoiceId: `INV-${latestBill.month.replace(/\s+/g, "-")}`,
        amount: latestBill.amount,
        status: latestBill.status,
      });
};
