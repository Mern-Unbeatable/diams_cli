import { useState } from "react";
import {
  CollaboratorInvoiceHeader,
  CollaboratorInvoiceTable,
  CollaboratorInvoiceModal,
  COLLABORATOR_INVOICES_DATA,
} from "./sections";

const CollaboratorInvoicesView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      {/* 1. Header */}
      <CollaboratorInvoiceHeader />

      {/* 2. Invoices Table */}
      <CollaboratorInvoiceTable
        invoices={COLLABORATOR_INVOICES_DATA}
        onViewInvoice={(inv) => setSelectedInvoice(inv)}
        currentPage={currentPage}
        pageSize={10}
        onPageChange={setCurrentPage}
      />

      {/* 3. Invoice Preview Modal */}
      <CollaboratorInvoiceModal
        isOpen={Boolean(selectedInvoice)}
        onClose={() => setSelectedInvoice(null)}
        invoice={selectedInvoice}
      />
    </div>
  );
};

export default CollaboratorInvoicesView;
