import { useMemo, useRef, useState } from "react";
import {
  Download,
  FileText,
  Loader2,
  Printer,
  QrCode,
  Send,
} from "lucide-react";
import { downloadElementAsPdf } from "@/lib/downloadElementAsPdf";
import InvoiceDocument from "./InvoiceDocument";
import { buildInvoiceDocument, formatChf } from "./buildInvoice";

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
        ? "bg-[#0b2559] text-white hover:bg-[#0e2f70]"
        : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
    }`}
  >
    {icon}
    <span>{children}</span>
  </button>
);

const InvoicePage = ({ invoice, onBack, backLabel = "Invoices" }) => {
  const paymentRef = useRef(null);
  const documentRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");
  const doc = useMemo(() => buildInvoiceDocument(invoice), [invoice]);

  const handleDownloadPdf = async () => {
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
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Invoice ${doc.invoiceNumber}`);
    const body = encodeURIComponent(
      `Hello ${doc.customer.name},\n\nPlease find your invoice ${doc.invoiceNumber} for CHF ${formatChf(doc.total)}, due ${doc.dueDate}.\n\nNovaSky`,
    );
    window.location.href = `mailto:${doc.customer.email}?subject=${subject}&body=${body}`;
  };

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
            <span>{backLabel}</span>
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

      <InvoiceDocument
        ref={documentRef}
        paymentRef={paymentRef}
        invoice={invoice}
      />
    </div>
  );
};

export default InvoicePage;
