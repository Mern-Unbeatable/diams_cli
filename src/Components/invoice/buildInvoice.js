export const INVOICE_COMPANY = {
  name: "NovaSky Sàrl",
  addressLines: ["Route de la Maison-Neuve 14", "1753 Matran • Switzerland"],
  uid: "CHE-109.342.128 TVA",
  email: "support@novasky.ch",
  website: "www.novasky.ch",
  phone: "+41 58 123 45 67",
  iban: "CH12 3000 0001 2345 6789 0",
  slogan: "Stay Connected. Go Further.",
  copyright: "© 2026 NovaSky Sàrl. Registered in Fribourg, Switzerland.",
};

export const SUPPORTED_BANK_APPS = [
  "UBS",
  "PostFinance",
  "Raiffeisen",
  "Credit Suisse",
  "TWINT",
  "Neon",
];

export const QR_BILL_FEATURES = [
  "Instant automatic reconciliation",
  "0% transaction & handling fees",
  "Compliant with ISO 20022 Swiss Standards",
];

export const parseChf = (value) =>
  Number(String(value ?? "").replace(/[^\d.]/g, "")) || 0;

const DAY_MS = 1000 * 60 * 60 * 24;

export const formatChf = (value) => value.toFixed(2);

const toDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatLongDate = (date) =>
  date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const formatServicePeriod = (date) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const month = start.toLocaleDateString("en-US", { month: "short" });
  return `${month} ${String(start.getDate()).padStart(2, "0")} – ${month} ${end.getDate()}, ${end.getFullYear()}`;
};

/**
 * Normalizes any invoice-like record into the shape rendered by InvoiceDocument.
 * Optional overrides: items, customerDetails, subscription, servicePeriod,
 * customerNumber, vatRate. Missing values fall back to demo defaults.
 */
export const buildInvoiceDocument = (invoice) => {
  const issueDate = toDate(invoice.issueDate);
  const dueDate =
    toDate(invoice.dueDate) ||
    (issueDate ? new Date(issueDate.getTime() + 14 * DAY_MS) : null);
  const dueInDays =
    issueDate && dueDate ? Math.round((dueDate - issueDate) / DAY_MS) : 14;

  const digits = String(invoice.invoiceId ?? "").replace(/\D/g, "");
  const sequence = digits.slice(-3).padStart(3, "0");
  const planName = invoice.plan || "NovaSky Plus";

  const items = invoice.items || [
    {
      title: `${planName} 5G (Switzerland + Europe)`,
      description:
        "Monthly subscription • 100 GB high-speed 5G data, unlimited Swiss calls & SMS",
      quantity: 1,
      unitPrice: parseChf(invoice.amountExVat),
    },
  ];

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );
  const vatRate = invoice.vatRate || "7.7%";
  const vat = invoice.vat
    ? parseChf(invoice.vat)
    : (subtotal * parseChf(vatRate)) / 100;
  const total = invoice.totalAmount
    ? parseChf(invoice.totalAmount)
    : subtotal + vat;

  const customerName = invoice.customer || "John Smith";
  const emailHandle = customerName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .trim()
    .replace(/\s+/g, ".");

  return {
    invoiceNumber: invoice.invoiceId,
    status: invoice.status,
    isPaid: invoice.status?.toLowerCase() === "paid",
    invoiceDate: issueDate ? formatLongDate(issueDate) : invoice.issueDate,
    dueDate: dueDate ? formatLongDate(dueDate) : invoice.dueDate,
    servicePeriod:
      invoice.servicePeriod ||
      (issueDate ? formatServicePeriod(issueDate) : "—"),
    dueInDays,
    customerNumber: invoice.customerNumber || `NS-1004${sequence}`,
    customer: {
      name: customerName,
      addressLines: ["Rue du Lac 25", "1003 Lausanne", "Switzerland"],
      email: `${emailHandle}@email.com`,
      phone: "+41 79 123 45 67",
      ...invoice.customerDetails,
    },
    subscription: {
      primaryPlan: `${planName} 5G`,
      phoneLine: "+41 79 123 45 67",
      serviceType: "eSIM • High-Speed 5G",
      networkRegion: "Switzerland + Europe",
      iccid: "8941 2345 6789 0123 4567",
      ...invoice.subscription,
    },
    items,
    subtotal,
    vat,
    vatRate,
    total,
    reference: `00 00000 00000 00000 00${sequence} 34567`,
  };
};
