import { useState, useRef } from "react";
import { flushSync } from "react-dom";
import { downloadElementAsPdf } from "@/lib/downloadElementAsPdf";
import InvoiceDocument from "./InvoiceDocument";

/**
 * Downloads an invoice PDF without showing it on screen.
 * Render `invoiceRenderer` somewhere in the component so the hidden document can mount.
 */
export const useInvoiceDownload = () => {
  const documentRef = useRef(null);
  const [pending, setPending] = useState(null);
  const [error, setError] = useState("");

  const downloadInvoice = async (invoice, key = invoice.invoiceId) => {
    if (pending) return;
    setError("");
    flushSync(() => setPending({ invoice, key }));

    try {
      await downloadElementAsPdf(
        documentRef.current,
        `NovaSky-${invoice.invoiceId}.pdf`,
      );
    } catch {
      setError("Could not generate the PDF. Please try again.");
    } finally {
      setPending(null);
    }
  };

  const invoiceRenderer = pending ? (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 -left-[100000px] w-[1000px]"
    >
      <InvoiceDocument ref={documentRef} invoice={pending.invoice} />
    </div>
  ) : null;

  return {
    downloadInvoice,
    downloadingKey: pending?.key ?? null,
    downloadError: error,
    invoiceRenderer,
  };
};
