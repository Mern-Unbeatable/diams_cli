import { useMemo, useState } from "react";
import {
  useCollaboratorInvoices,
} from "@/features/dash/collaborator/invoices";
import { unwrapList } from "@/lib/query/unwrap";
import { InvoicePage, useInvoiceDownload } from "@/Components/invoice";
import {
  CollaboratorInvoiceHeader,
  CollaboratorInvoiceTable,
} from "./sections";

const CollaboratorInvoicesView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const { downloadInvoice, downloadingKey, downloadError, invoiceRenderer } =
    useInvoiceDownload();

  const invoicesQuery = useCollaboratorInvoices();
  const invoicesList = useMemo(
    () => unwrapList(invoicesQuery.data),
    [invoicesQuery.data],
  );

  if (selectedInvoice) {
    return (
      <InvoicePage
        invoice={selectedInvoice}
        onBack={() => setSelectedInvoice(null)}
      />
    );
  }

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      <CollaboratorInvoiceHeader />

      {downloadError ? (
        <p className="rounded-md bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
          {downloadError}
        </p>
      ) : null}

      <CollaboratorInvoiceTable
        invoices={invoicesList}
        onViewInvoice={(inv) => setSelectedInvoice(inv)}
        onDownloadInvoice={(inv) => downloadInvoice(inv, inv.id)}
        downloadingId={downloadingKey}
        currentPage={currentPage}
        pageSize={10}
        onPageChange={setCurrentPage}
        isLoading={invoicesQuery.isLoading}
        isFetching={invoicesQuery.isFetching && !invoicesQuery.isLoading}
        error={invoicesQuery.isError ? invoicesQuery.error : null}
        onRetry={() => invoicesQuery.refetch()}
      />

      {invoiceRenderer}
    </div>
  );
};

export default CollaboratorInvoicesView;
