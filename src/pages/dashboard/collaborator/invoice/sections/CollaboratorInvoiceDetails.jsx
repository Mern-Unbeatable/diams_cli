import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CheckCircle2,
  Cpu,
  Download,
  FileText,
  Info,
  Loader2,
  Mail,
  Phone,
  Printer,
  QrCode,
  Scissors,
  Send,
  ShieldCheck,
  User,
} from "lucide-react";
import { BRAND } from "@/config/navigation";
import { downloadElementAsPdf } from "@/lib/downloadElementAsPdf";
import {
  INVOICE_COMPANY,
  QR_BILL_FEATURES,
  SUPPORTED_BANK_APPS,
  buildInvoiceDocument,
  formatChf,
} from "./invoiceDocument";

const NAVY = "bg-[#0b2559]";
const QR_MODULES = 29;

const hashString = (value) =>
  [...String(value)].reduce(
    (hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0,
    7,
  );

const isFinderZone = (row, col) => {
  const inBox = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;
  return (
    inBox(row, col) ||
    inBox(row, col - (QR_MODULES - 8)) ||
    inBox(row - (QR_MODULES - 8), col)
  );
};

const SwissQrCode = ({ seed }) => {
  const modules = useMemo(() => {
    const base = hashString(seed);
    const cells = [];
    const center = Math.floor(QR_MODULES / 2);

    for (let row = 0; row < QR_MODULES; row += 1) {
      for (let col = 0; col < QR_MODULES; col += 1) {
        if (isFinderZone(row, col)) continue;
        if (Math.abs(row - center) <= 3 && Math.abs(col - center) <= 3)
          continue;
        let value = Math.imul(row, 73856093) ^ Math.imul(col, 19349663) ^ base;
        value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
        value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
        value ^= value >>> 16;
        if ((value >>> 0) % 2 === 0) cells.push([row, col]);
      }
    }
    return cells;
  }, [seed]);

  const finder = (x, y) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" fill="#000" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill="#000" />
    </g>
  );

  const center = Math.floor(QR_MODULES / 2);

  return (
    <svg
      viewBox={`0 0 ${QR_MODULES} ${QR_MODULES}`}
      className="h-32 w-32 sm:h-36 sm:w-36"
      shapeRendering="crispEdges"
      role="img"
      aria-label="Swiss QR-bill payment code"
    >
      <rect width={QR_MODULES} height={QR_MODULES} fill="#fff" />
      {modules.map(([row, col]) => (
        <rect key={`${row}-${col}`} x={col} y={row} width="1" height="1" />
      ))}
      {finder(0, 0)}
      {finder(QR_MODULES - 7, 0)}
      {finder(0, QR_MODULES - 7)}
      <rect x={center - 3} y={center - 3} width="7" height="7" fill="#fff" />
      <rect x={center - 2} y={center - 2} width="5" height="5" fill="#000" />
      <rect x={center - 0.4} y={center - 1.4} width="0.8" height="2.8" fill="#fff" />
      <rect x={center - 1.4} y={center - 0.4} width="2.8" height="0.8" fill="#fff" />
    </svg>
  );
};

const Label = ({ children, className = "" }) => (
  <p
    className={`text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500 ${className}`}
  >
    {children}
  </p>
);

const ToolbarButton = ({
  icon,
  children,
  onClick,
  primary = false,
  disabled = false,
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold transition-colors disabled:cursor-wait disabled:opacity-60 ${
      primary
        ? `${NAVY} text-white hover:bg-[#0e2f70]`
        : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
    }`}
  >
    {icon}
    <span>{children}</span>
  </button>
);

const CollaboratorInvoiceDetails = ({ invoice, onBack, autoDownload = false }) => {
  const paymentRef = useRef(null);
  const documentRef = useRef(null);
  const autoDownloadStarted = useRef(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");
  const doc = useMemo(() => buildInvoiceDocument(invoice), [invoice]);

  const handleDownloadPdf = useCallback(async () => {
    setIsDownloading(true);
    setDownloadError("");
    try {
      await downloadElementAsPdf(
        documentRef.current,
        `NovaSky-${doc.invoiceNumber}.pdf`,
      );
    } catch {
      setDownloadError("Could not generate the PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }, [doc.invoiceNumber]);

  useEffect(() => {
    if (!autoDownload || autoDownloadStarted.current) return;
    autoDownloadStarted.current = true;
    handleDownloadPdf();
  }, [autoDownload, handleDownloadPdf]);

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Invoice ${doc.invoiceNumber}`);
    const body = encodeURIComponent(
      `Hello ${doc.customer.name},\n\nPlease find your invoice ${doc.invoiceNumber} for CHF ${formatChf(doc.total)}, due ${doc.dueDate}.\n\nNovaSky`,
    );
    window.location.href = `mailto:${doc.customer.email}?subject=${subject}&body=${body}`;
  };

  const metaItems = [
    { label: "Invoice Number", value: doc.invoiceNumber, large: true },
    { label: "Invoice Date", value: doc.invoiceDate },
    { label: "Service Period", value: doc.servicePeriod },
    { label: "Due Date", value: doc.dueDate },
    { label: "Customer Number", value: doc.customerNumber, accent: true },
  ];

  const subscriptionItems = [
    { label: "Primary Plan", value: doc.subscription.primaryPlan },
    { label: "Phone Line", value: doc.subscription.phoneLine },
    { label: "Service Type", value: doc.subscription.serviceType },
    { label: "Network Region", value: doc.subscription.networkRegion },
  ];

  return (
    <div className="min-w-0 space-y-4 text-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <nav className="flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-slate-500 transition-colors hover:text-slate-900"
          >
            <FileText className="h-4 w-4" />
            <span>Invoices</span>
          </button>
          <span className="text-slate-300">/</span>
          <span className="font-bold text-[#0b2559]">{doc.invoiceNumber}</span>
        </nav>

        <div className="flex flex-wrap items-center gap-2">
          <ToolbarButton
            icon={<Printer className="h-3.5 w-3.5" />}
            onClick={() => window.print()}
          >
            Print
          </ToolbarButton>
          <ToolbarButton
            icon={<Send className="h-3.5 w-3.5" />}
            onClick={handleSendEmail}
          >
            Send by Email
          </ToolbarButton>
          <ToolbarButton
            icon={
              isDownloading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Download className="h-3.5 w-3.5" />
              )
            }
            onClick={handleDownloadPdf}
            disabled={isDownloading}
          >
            {isDownloading ? "Generating…" : "Download PDF"}
          </ToolbarButton>
          <ToolbarButton
            icon={<QrCode className="h-3.5 w-3.5" />}
            primary
            onClick={() =>
              paymentRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
          >
            Pay with QR
          </ToolbarButton>
        </div>
      </div>

      {downloadError ? (
        <p className="rounded-md bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600 print:hidden">
          {downloadError}
        </p>
      ) : null}

      <article
        ref={documentRef}
        className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        <div className={`h-1.5 ${NAVY}`} />

        <div className="space-y-7 p-5 sm:p-8 lg:p-10">
          {/* Company + title */}
          <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <div
                role="img"
                aria-label={BRAND.name}
                className="h-11 w-36 bg-[#0b2559]"
                style={{
                  maskImage: `url(${BRAND.logo})`,
                  WebkitMaskImage: `url(${BRAND.logo})`,
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "left center",
                  WebkitMaskPosition: "left center",
                }}
              />
              <div className="space-y-0.5 text-xs text-slate-600">
                <p className="font-bold text-slate-900">
                  {INVOICE_COMPANY.name}
                </p>
                {INVOICE_COMPANY.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <p className="pt-1">
                  UID:{" "}
                  <span className="font-semibold text-slate-800">
                    {INVOICE_COMPANY.uid}
                  </span>
                </p>
                <p>
                  {INVOICE_COMPANY.email} • {INVOICE_COMPANY.website}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 sm:items-end">
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#1d4ed8]">
                Invoice / Billing
              </span>
              <h1 className="text-4xl font-black tracking-tight text-[#0b2559] sm:text-5xl">
                INVOICE
              </h1>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${
                  doc.isPaid
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-blue-50 text-[#0b2559]"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    doc.isPaid ? "bg-emerald-500" : "bg-[#0b2559]"
                  }`}
                />
                {doc.isPaid ? "Paid" : `Payment due in ${doc.dueInDays} days`}
              </span>
            </div>
          </header>

          {/* Meta strip */}
          <div className="grid grid-cols-2 gap-4 rounded-lg bg-[#f1f5fb] p-4 sm:grid-cols-3 sm:p-5 lg:grid-cols-[1.3fr_1fr_1.2fr_1fr_1fr]">
            {metaItems.map((item) => (
              <div key={item.label} className="min-w-0">
                <Label>{item.label}</Label>
                <p
                  className={`mt-1 break-words font-bold ${
                    item.large
                      ? "text-base text-[#0b2559]"
                      : "text-[13px] text-slate-900"
                  } ${item.accent ? "text-[#1d4ed8]" : ""}`}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Bill to + subscription */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-5">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[#0b2559]" />
                <Label className="text-slate-800">Bill To</Label>
              </div>
              <p className="mt-3 text-lg font-bold text-[#0b2559]">
                {doc.customer.name}
              </p>
              <div className="mt-1 space-y-0.5 text-sm text-slate-600">
                {doc.customer.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                <p className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  {doc.customer.email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  {doc.customer.phone}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 p-5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-[#0b2559]" />
                  <Label className="text-slate-800">Subscription Details</Label>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  Active
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
                {subscriptionItems.map((item) => (
                  <div key={item.label} className="min-w-0">
                    <Label>{item.label}</Label>
                    <p className="mt-0.5 truncate text-xs font-bold text-slate-900">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-md bg-[#f1f5fb] px-3 py-2.5">
                <Label>ICCID Identifier (eSIM)</Label>
                <p className="mt-0.5 font-mono text-xs font-bold text-slate-900">
                  {doc.subscription.iccid}
                </p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead
                className={`${NAVY} text-[10px] font-bold uppercase tracking-[0.08em] text-white`}
              >
                <tr>
                  <th className="px-5 py-3">Description</th>
                  <th className="px-5 py-3 text-center">Quantity</th>
                  <th className="px-5 py-3 text-right">Unit Price (CHF)</th>
                  <th className="px-5 py-3 text-right">Total (CHF)</th>
                </tr>
              </thead>
              <tbody>
                {doc.items.map((item, index) => (
                  <tr
                    key={item.title}
                    className={index % 2 ? "bg-[#f7f9fc]" : "bg-white"}
                  >
                    <td className="px-5 py-4">
                      <p className="font-bold text-[#0b2559]">{item.title}</p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {item.description}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-center">{item.quantity}</td>
                    <td className="px-5 py-4 text-right">
                      {formatChf(item.unitPrice)}
                    </td>
                    <td className="px-5 py-4 text-right font-bold">
                      {formatChf(item.quantity * item.unitPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex flex-col items-end gap-3">
            <div className="w-full max-w-xs space-y-2 text-sm">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-bold">CHF {formatChf(doc.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="inline-flex items-center gap-1 text-slate-500">
                  VAT ({doc.vatRate})
                  <Info className="h-3 w-3" />
                </span>
                <span className="font-bold">CHF {formatChf(doc.vat)}</span>
              </div>
            </div>

            <div className="flex w-full max-w-sm items-center justify-between gap-4 rounded-lg bg-[#f1f5fb] px-5 py-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#0b2559]">
                  Grand Total
                </p>
                <p className="text-xs text-slate-500">Total Amount Due</p>
              </div>
              <p className="shrink-0 whitespace-nowrap text-3xl font-black tracking-tight text-[#0b2559] sm:text-4xl">
                CHF {formatChf(doc.total)}
              </p>
            </div>

            <p className="text-right text-[11px] italic text-slate-500">
              Telecommunication services are subject to the standard Swiss VAT
              rate of {doc.vatRate}.
            </p>
          </div>

          {/* Cut line */}
          <div className="flex items-center gap-3 text-[10px] text-slate-400">
            <div className="h-px flex-1 border-t border-dashed border-slate-300" />
            <span className="inline-flex items-center gap-1.5">
              <Scissors className="h-3.5 w-3.5" />
              Separate before paying / Swiss QR-Bill standard
            </span>
            <div className="h-px flex-1 border-t border-dashed border-slate-300" />
          </div>

          {/* Payment */}
          <section
            ref={paymentRef}
            className="grid scroll-mt-24 overflow-hidden rounded-lg border border-slate-200 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
          >
            <div className={`${NAVY} space-y-4 p-6 text-white`}>
              <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-blue-200">
                <ShieldCheck className="h-3.5 w-3.5" />
                Payment
              </p>
              <h3 className="text-xl font-bold leading-snug">
                Pay easily with Swiss QR-bill
              </h3>
              <p className="text-xs leading-relaxed text-blue-100/80">
                Scan the QR code with your Swiss banking application to
                automatically fill in payment details with 100% precision.
              </p>
              <ul className="space-y-2 text-xs text-blue-50">
                {QR_BILL_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-blue-200">
                  Supported Financial Apps
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {SUPPORTED_BANK_APPS.map((app) => (
                    <span
                      key={app}
                      className="rounded bg-white/10 px-2 py-1 text-[10px] font-semibold text-white"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-white p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="inline-flex items-center gap-2 text-base font-bold text-[#0b2559]">
                  <span className="relative flex h-4 w-4 items-center justify-center bg-red-600">
                    <span className="absolute h-2.5 w-0.5 bg-white" />
                    <span className="absolute h-0.5 w-2.5 bg-white" />
                  </span>
                  Payment Part (Swiss QR-Bill)
                </h3>
                <span className="text-[10px] font-semibold text-slate-500">
                  Standard SPS 2.2
                </span>
              </div>

              <div className="grid gap-5 sm:grid-cols-[auto_minmax(0,1fr)]">
                <div className="flex flex-col items-center gap-2">
                  <div className="rounded-md border border-slate-200 p-2">
                    <SwissQrCode seed={doc.invoiceNumber} />
                  </div>
                  <p className="text-[10px] font-semibold text-slate-600">
                    Scan &amp; Pay via Banking App
                  </p>
                </div>

                <div className="min-w-0 space-y-3 text-xs">
                  <div>
                    <Label>Account / Payable to</Label>
                    <p className="mt-0.5 font-bold text-slate-900">
                      {INVOICE_COMPANY.name}
                    </p>
                    {INVOICE_COMPANY.addressLines.map((line) => (
                      <p key={line} className="text-slate-600">
                        {line.replace(" • ", ", ")}
                      </p>
                    ))}
                  </div>
                  <div>
                    <Label>IBAN</Label>
                    <p className="mt-0.5 text-sm font-black text-[#0b2559]">
                      {INVOICE_COMPANY.iban}
                    </p>
                  </div>
                  <div>
                    <Label>Structured Reference</Label>
                    <p className="mt-0.5 break-all font-mono font-bold text-slate-900">
                      {doc.reference}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="min-w-0">
                      <Label>Payable by</Label>
                      <p className="mt-0.5 font-bold text-slate-900">
                        {doc.customer.name}
                      </p>
                      {doc.customer.addressLines.slice(0, 2).map((line) => (
                        <p key={line} className="text-slate-600">
                          {line}
                        </p>
                      ))}
                    </div>
                    <div className="min-w-0">
                      <Label>Amount &amp; Currency</Label>
                      <p className="mt-0.5 whitespace-nowrap text-lg font-black text-[#0b2559]">
                        CHF {formatChf(doc.total)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="border-t border-slate-100 pt-3 text-[10px] font-medium text-slate-500">
                Reserved space for dynamic Swiss EPC/QR generation compliant
                with ISO 20022 and Swiss Payment Standards.
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="flex flex-col gap-2 border-t border-slate-100 px-5 py-4 text-[11px] text-slate-500 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <p>
            <span className="font-bold text-[#0b2559]">
              {INVOICE_COMPANY.website}
            </span>{" "}
            • {INVOICE_COMPANY.email} • {INVOICE_COMPANY.phone}
          </p>
          <p className="italic text-[#1d4ed8]">“{INVOICE_COMPANY.slogan}”</p>
          <p>{INVOICE_COMPANY.copyright}</p>
        </footer>
      </article>
    </div>
  );
};

export default CollaboratorInvoiceDetails;
