import { useState, useMemo } from "react";
import {
  CollaboratorOrderHeader,
  CollaboratorOrderTable,
  CollaboratorOrderDetailsModal,
  COLLABORATOR_ORDERS_DATA,
} from "./sections";

const CollaboratorOrdersView = () => {
  const [ordersList] = useState(COLLABORATOR_ORDERS_DATA);
  const [status, setStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filter Orders by Status
  const filteredOrders = useMemo(() => {
    return ordersList.filter((ord) => {
      if (status !== "All" && ord.status.toLowerCase() !== status.toLowerCase()) {
        return false;
      }
      return true;
    });
  }, [ordersList, status]);

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      {/* 1. Header with STATUS dropdown */}
      <CollaboratorOrderHeader
        status={status}
        setStatus={(val) => {
          setStatus(val);
          setCurrentPage(1);
        }}
      />

      {/* 2. Main White Table Card */}
        <CollaboratorOrderTable
          orders={filteredOrders}
          onViewOrder={(ord) => setSelectedOrder(ord)}
          currentPage={currentPage}
          pageSize={10}
          onPageChange={setCurrentPage}
        />
    

      {/* 3. Order Details Modal */}
      <CollaboratorOrderDetailsModal
        isOpen={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
      />
    </div>
  );
};

export default CollaboratorOrdersView;
