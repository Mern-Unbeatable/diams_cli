import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

/**
 * Status Badge Style Resolver
 * Matches the soft-pill badges seen in the design (borderless, soft tints)
 */
export const getStatusBadgeStyle = (status) => {
  if (!status) return "bg-slate-100 text-slate-600";
  const normalized = String(status).toLowerCase().trim();

  switch (normalized) {
    case "pending":
      return "bg-[#e0f7fa] text-[#0097a7]"; // Light cyan/teal
    case "identity verification":
    case "verification":
      return "bg-[#f1f3f5] text-[#6c757d]"; // Subtle grey
    case "approved":
      return "bg-[#e8f0fe] text-[#3b82f6]"; // Soft light blue
    case "activated":
    case "active":
      return "bg-[#fef3c7] text-[#d97706]"; // Warm yellow/amber
    case "rejected":
    case "suspended":
      return "bg-[#fee2e2] text-[#ef4444]"; // Soft red/pink matching image
    default:
      return "bg-slate-100 text-slate-600";
  }
};

export const DEFAULT_ACTIONS = [
  { label: "See Details", isPrimary: true, action: "details" },
  { label: "Pending", action: "status_pending" },
  { label: "Identity Verification", action: "status_verification" },
  { label: "Approved", action: "status_approved" },
  { label: "Activated", action: "status_activated" },
  { label: "Rejected", action: "status_rejected" },
];

const ActionMenu = ({
  row,
  actions = DEFAULT_ACTIONS,
  onActionClick,
  isOpen,
  onClose,
  triggerRef,
}) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute right-4 top-10 z-30 min-w-[150px] overflow-hidden rounded-lg border border-slate-100 bg-white py-1 shadow-xl ring-1 ring-black/5"
    >
      {actions.map((act, index) => {
        if (act.isPrimary) {
          return (
            <button
              key={index}
              type="button"
              onClick={() => {
                if (act.onClick) act.onClick(row);
                if (onActionClick) onActionClick(act.action || act.label, row);
                onClose();
              }}
              className="block w-full bg-[#38bdf8] px-4 py-2 text-left text-xs font-semibold text-white transition-colors hover:bg-sky-500"
            >
              {act.label}
            </button>
          );
        }

        return (
          <button
            key={index}
            type="button"
            onClick={() => {
              if (act.onClick) act.onClick(row);
              if (onActionClick) onActionClick(act.action || act.label, row);
              onClose();
            }}
            className="block w-full px-4 py-2 text-left text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            {act.label}
          </button>
        );
      })}
    </div>
  );
};

const DataTable = ({
  columns = [],
  data = [],
  rows = [],
  actions = DEFAULT_ACTIONS,
  onActionClick,
  pageSize = 10,
  currentPage: controlledPage,
  totalItems: controlledTotal,
  onPageChange,
  showPagination = true,
  emptyMessage = "No records found.",
  isLoading = false,
  className = "",
}) => {
  const [internalPage, setInternalPage] = useState(1);
  const [activeRowMenuId, setActiveRowMenuId] = useState(null);
  const triggerRefs = useRef({});

  const tableData = data.length > 0 ? data : rows;

  const normalizedColumns = columns.map((col, index) => {
    if (typeof col === "string") {
      const isAction = col.toLowerCase().includes("action");
      const isStatus = col.toLowerCase().includes("status");
      return {
        key: `col_${index}`,
        label: col,
        isAction,
        isStatus,
        align: isAction ? "center" : "left",
      };
    }
    return {
      key: col.key || `col_${index}`,
      label: col.label || "",
      render: col.render,
      align:
        col.align ||
        (col.isAction || col.key === "action"
          ? "center"
          : col.isStatus || col.key === "status"
          ? "left"
          : "left"),
      className: col.className || "",
      isAction: col.isAction || col.key === "action",
      isStatus: col.isStatus || col.key === "status",
    };
  });

  const isControlledPagination =
    controlledPage !== undefined && onPageChange !== undefined;
  const activePage = isControlledPagination ? controlledPage : internalPage;
  const totalCount =
    controlledTotal !== undefined ? controlledTotal : tableData.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const paginatedData = isControlledPagination
    ? tableData
    : tableData.slice((activePage - 1) * pageSize, activePage * pageSize);

  const startIndex = totalCount === 0 ? 0 : (activePage - 1) * pageSize + 1;
  const endIndex = Math.min(activePage * pageSize, totalCount);

  const handlePrevPage = () => {
    if (activePage > 1) {
      if (isControlledPagination) onPageChange(activePage - 1);
      else setInternalPage((p) => p - 1);
    }
  };

  const handleNextPage = () => {
    if (activePage < totalPages) {
      if (isControlledPagination) onPageChange(activePage + 1);
      else setInternalPage((p) => p + 1);
    }
  };

  const getCellValue = (row, col, colIndex) => {
    if (Array.isArray(row)) return row[colIndex];
    return row[col.key];
  };

  return (
    <div
      className={`w-full overflow-hidden rounded-lg border border-slate-100 bg-white font-sans shadow-[0_2px_10px_rgba(0,0,0,0.02)] ${className}`}
    >
      {/* Table Area */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead className="bg-[#F6FBFF]">
            <tr className="border-b border-slate-100 text-[13px] font-semibold text-slate-800">
              {normalizedColumns.map((col, idx) => (
                <th
                  key={col.key}
                  className={`py-4 px-4 ${idx === 0 ? "pl-6" : ""} ${
                    idx === normalizedColumns.length - 1 ? "pr-6" : ""
                  } ${
                    col.align === "center"
                      ? "text-center"
                      : col.align === "right"
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-[13px] text-slate-600">
            {isLoading ? (
              <tr>
                <td
                  colSpan={normalizedColumns.length || 1}
                  className="py-16 text-center text-slate-400"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <div className="h-2 w-2 animate-ping rounded-full bg-sky-500" />
                    <span>Loading records...</span>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={normalizedColumns.length || 1}
                  className="py-16 text-center text-slate-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const rowKey =
                  row.id || row.orderId || row.key || rowIndex;

                return (
                  <tr
                    key={rowKey}
                    className="transition-colors hover:bg-slate-50/50"
                  >
                    {normalizedColumns.map((col, colIndex) => {
                      const value = getCellValue(row, col, colIndex);
                      const isFirst = colIndex === 0;
                      const isLast =
                        colIndex === normalizedColumns.length - 1;

                      if (col.render) {
                        return (
                          <td
                            key={col.key}
                            className={`py-3.5 px-4 ${
                              isFirst ? "pl-6 font-medium text-slate-900" : ""
                            } ${isLast ? "pr-6" : ""} ${col.className || ""}`}
                          >
                            {col.render(row, value, rowIndex)}
                          </td>
                        );
                      }

                      // Action Dropdown Column
                      if (col.isAction || col.key === "action") {
                        return (
                          <td
                            key={col.key}
                            className={`relative py-3.5 px-4 text-center ${
                              isLast ? "pr-6" : ""
                            }`}
                          >
                            <button
                              ref={(el) =>
                                (triggerRefs.current[rowKey] = el)
                              }
                              type="button"
                              onClick={() =>
                                setActiveRowMenuId(
                                  activeRowMenuId === rowKey ? null : rowKey
                                )
                              }
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </button>

                            <ActionMenu
                              row={row}
                              actions={actions}
                              onActionClick={onActionClick}
                              isOpen={activeRowMenuId === rowKey}
                              onClose={() => setActiveRowMenuId(null)}
                              triggerRef={{
                                current: triggerRefs.current[rowKey],
                              }}
                            />
                          </td>
                        );
                      }

                      // Soft Badge Column
                      if (col.isStatus || col.key === "status") {
                        const badgeStyle = getStatusBadgeStyle(value);
                        return (
                          <td key={col.key} className="py-3.5 px-4">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-tight ${badgeStyle}`}
                            >
                              {value}
                            </span>
                          </td>
                        );
                      }

                      // Default Row
                      return (
                        <td
                          key={col.key}
                          className={`py-3.5 px-4 ${
                            isFirst ? "pl-6 font-medium text-slate-800" : ""
                          } ${isLast ? "pr-6" : ""} ${col.className || ""}`}
                        >
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {showPagination && totalCount > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 bg-white px-6 py-4">
          <p className="text-[13px] font-medium text-[#f97316]">
            Showing {startIndex} to {endIndex} of {totalCount} results
          </p>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={activePage <= 1}
              className="rounded-lg border border-[#f97316] bg-white px-3.5 py-1 text-xs font-medium text-[#f97316] transition hover:bg-orange-50 disabled:cursor-not-allowed disabled:border-orange-200 disabled:text-orange-200"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNextPage}
              disabled={activePage >= totalPages}
              className="rounded-lg border border-[#f97316] bg-white px-3.5 py-1 text-xs font-medium text-[#f97316] transition hover:bg-orange-50 disabled:cursor-not-allowed disabled:border-orange-200 disabled:text-orange-200"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;