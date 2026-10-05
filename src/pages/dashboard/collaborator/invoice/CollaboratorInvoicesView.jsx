import { useMemo, useState } from "react";
import {
  useCollaboratorInvoices,
} from "@/features/dash/collaborator/invoices";
import { unwrapList } from "@/lib/query/unwrap";
import {
  CollaboratorInvoiceHeader,
  CollaboratorInvoiceTable,
  CollaboratorInvoiceDetails,
} from "./sections";

const CollaboratorInvoicesView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [autoDownload, setAutoDownload] = useState(false);

  const openInvoice = (invoice, shouldDownload = false) => {
    setAutoDownload(shouldDownload);
    setSelectedInvoice(invoice);
  };

  const invoicesQuery = useCollaboratorInvoices();
  const invoicesList = useMemo(
    () => unwrapList(invoicesQuery.data),
    [invoicesQuery.data],
  );

  if (selectedInvoice) {
    return (
      <CollaboratorInvoiceDetails
        invoice={selectedInvoice}
        autoDownload={autoDownload}
        onBack={() => setSelectedInvoice(null)}
      />
    );
  }

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      <CollaboratorInvoiceHeader />

      <CollaboratorInvoiceTable
        invoices={invoicesList}
        onViewInvoice={(inv) => openInvoice(inv)}
        onDownloadInvoice={(inv) => openInvoice(inv, true)}
        currentPage={currentPage}
        pageSize={10}
        onPageChange={setCurrentPage}
        isLoading={invoicesQuery.isLoading}
        isFetching={invoicesQuery.isFetching && !invoicesQuery.isLoading}
        error={invoicesQuery.isError ? invoicesQuery.error : null}
        onRetry={() => invoicesQuery.refetch()}
      />
    </div>
  );
};

export default CollaboratorInvoicesView;
