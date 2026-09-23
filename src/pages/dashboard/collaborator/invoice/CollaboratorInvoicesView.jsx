import { useMemo, useState } from "react";
import {
  useCollaboratorInvoices,
} from "@/features/dash/collaborator/invoices";
import { unwrapList } from "@/lib/query/unwrap";
import {
  CollaboratorInvoiceHeader,
  CollaboratorInvoiceTable,
  CollaboratorInvoiceModal,
} from "./sections";

const CollaboratorInvoicesView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const invoicesQuery = useCollaboratorInvoices();
  const invoicesList = useMemo(
    () => unwrapList(invoicesQuery.data),
    [invoicesQuery.data],
  );

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      <CollaboratorInvoiceHeader />

      <CollaboratorInvoiceTable
        invoices={invoicesList}
        onViewInvoice={(inv) => setSelectedInvoice(inv)}
        currentPage={currentPage}
        pageSize={10}
        onPageChange={setCurrentPage}
        isLoading={invoicesQuery.isLoading}
        isFetching={invoicesQuery.isFetching && !invoicesQuery.isLoading}
        error={invoicesQuery.isError ? invoicesQuery.error : null}
        onRetry={() => invoicesQuery.refetch()}
      />

      <CollaboratorInvoiceModal
        isOpen={Boolean(selectedInvoice)}
        onClose={() => setSelectedInvoice(null)}
        invoice={selectedInvoice}
      />
    </div>
  );
};

export default CollaboratorInvoicesView;
