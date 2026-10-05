import { useState } from "react";
import { InvoicePage, useInvoiceDownload } from "@/Components/invoice";
import { billRowToInvoice } from "../shared/userInvoice";
import {
  BillsAutoPaymentBanner,
  BillsHeader,
  BillsSidebar,
  BillsTableCard,
} from "./sections/BillsSections";

const BillsView = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const { downloadInvoice, downloadingKey, downloadError, invoiceRenderer } =
    useInvoiceDownload();

  if (selectedInvoice) {
    return (
      <InvoicePage
        invoice={selectedInvoice}
        backLabel="Bills"
        onBack={() => setSelectedInvoice(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <BillsHeader />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <BillsAutoPaymentBanner />
          {downloadError ? (
            <p className="rounded-md bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
              {downloadError}
            </p>
          ) : null}
          <BillsTableCard
            onViewInvoice={(bill) => setSelectedInvoice(billRowToInvoice(bill))}
            onDownloadInvoice={(bill) =>
              downloadInvoice(billRowToInvoice(bill), bill.id)
            }
            downloadingId={downloadingKey}
          />
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          <BillsSidebar />
        </div>
      </div>

      {invoiceRenderer}
    </div>
  );
};

export default BillsView;
