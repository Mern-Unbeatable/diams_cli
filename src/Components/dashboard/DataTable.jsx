import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

/**
 * Status Badge Style Resolver
 * Maps status names to design-accurate pill badges
 */
export const getStatusBadgeStyle = (status) => {
  if (!status) return "bg-slate-50 text-slate-600 border-slate-200";
  const normalized = String(status).toLowerCase().trim();

  switch (normalized) {
    case "pending":
      return "bg-sky-50 text-sky-600 border-sky-100";
    case "identity verification":
    case "verification":
      return "bg-slate-100 text-slate-600 border-slate-200/80";
    case "approved":
      return "bg-blue-50 text-blue-600 border-blue-100";
    case "activated":
      return "bg-amber-50 text-amber-600 border-amber-100";
    case "rejected":
      return "bg-purple-50 text-purple-600 border-purple-100";
    case "active":
    case "live":
    case "provisioned":
    case "paid":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "suspended":
    case "cancelled":
    case "failed":
      return "bg-rose-50 text-rose-600 border-rose-100";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
};

/**
 * Default Action Items matching the mockup
 */
export const DEFAULT_ACTIONS = [
  { label: "See Details", isPrimary: true, action: "details" },
  { label: "Pending", action: "status_pending" },
  { label: "Identity Verification", action: "status_verification" },
  { label: "Approved", action: "status_approved" },
  { label: "Activated", action: "status_activated" },
  { label: "Rejected", action: "status_rejected" },
];

/**
 * Reusable Action Popover Component
 */
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
      className="absolute right-3 top-10 z-30 min-w-[160px] overflow-hidden rounded-xl border border-slate-100 bg-white py-1 shadow-2xl ring-1 ring-black/5"
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

/**
 * Reusable DataTable Component
 *
 * Props:
 * @param {Array} columns - Column definition objects [{ key, label, render, align, className }] or strings ['Col1', 'Col2']
 * @param {Array} data - Array of row objects [{ id, ... }] or 2D array of values [['val1', 'val2']]
 * @param {Array} rows - Alias for data (backwards compatibility)
 * @param {Array} actions - Custom action menu items [{ label, isPrimary, action, onClick }]
 * @param {Function} onActionClick - Handler callback (actionName, row) => void
 * @param {number} pageSize - Number of rows per page (default 10)
 * @param {number} currentPage - Controlled current page (optional)
 * @param {number} totalItems - Controlled total items count (optional)
 * @param {Function} onPageChange - Controlled page change handler (newPage) => void
 * @param {boolean} showPagination - Whether to display the pagination footer (default true)
 * @param {string} title - Optional title to show above table
 * @param {string} emptyMessage - Message to show when data is empty
 * @param {boolean} isLoading - Shows loading state
 * @param {string} className - Additional CSS wrapper classes
 */
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
  title,
  emptyMessage = "No records found.",
  isLoading = false,
  className = "",
}) => {
  const [internalPage, setInternalPage] = useState(1);
  const [activeRowMenuId, setActiveRowMenuId] = useState(null);
  const triggerRefs = useRef({});

  // Support both `data` and legacy `rows`
  const tableData = data.length > 0 ? data : rows;

  // Normalized columns
  const normalizedColumns = columns.map((col, index) => {
    if (typeof col === "string") {
      const isActionCol = col.toLowerCase().includes("action");
      const isStatusCol = col.toLowerCase().includes("status");
      return {
        key: `col_${index}`,
        label: col,
        isAction: isActionCol,
        isStatus: isStatusCol,
      };
    }
    return {
      key: col.key || `col_${index}`,
      label: col.label || "",
      render: col.render,
      align: col.align || (col.isAction || col.key === "action" ? "right" : "left"),
      className: col.className || "",
      isAction: col.isAction || col.key === "action",
      isStatus: col.isStatus || col.key === "status",
    };
  });

  // Pagination logic (client-side if not controlled externally)
  const isControlledPagination = controlledPage !== undefined && onPageChange !== undefined;
  const activePage = isControlledPagination ? controlledPage : internalPage;
  const totalCount = controlledTotal !== undefined ? controlledTotal : tableData.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const paginatedData = isControlledPagination
    ? tableData
    : tableData.slice((activePage - 1) * pageSize, activePage * pageSize);

  const startIndex = totalCount === 0 ? 0 : (activePage - 1) * pageSize + 1;
  const endIndex = Math.min(activePage * pageSize, totalCount);

  const handlePrevPage = () => {
    if (activePage > 1) {
      if (isControlledPagination) {
        onPageChange(activePage - 1);
      } else {
        setInternalPage((p) => p - 1);
      }
    }
  };

  const handleNextPage = () => {
    if (activePage < totalPages) {
      if (isControlledPagination) {
        onPageChange(activePage + 1);
      } else {
        setInternalPage((p) => p + 1);
      }
    }
  };

  // Helper to extract cell value
  const getCellValue = (row, col, colIndex) => {
    if (Array.isArray(row)) {
      return row[colIndex];
    }
    return row[col.key];
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Optional Table Header Title */}
      {title && (
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900">{title}</h3>
        </div>
      )}

      {/* Main Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-slate-100/90 bg-white">
        <table className="w-full min-w-[700px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-white text-xs font-semibold text-slate-700 sm:text-[13px]">
              {normalizedColumns.map((col, idx) => (
                <th
                  key={col.key}
                  className={`py-4 px-4 ${
                    idx === 0 ? "pl-6" : ""
                  } ${idx === normalizedColumns.length - 1 ? "pr-6" : ""} ${
                    col.align === "right" ? "text-right" : "text-left"
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs sm:text-[13px]">
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
                  className="py-16 text-center font-medium text-slate-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const rowKey = row.id || row.orderId || row.key || rowIndex;

                return (
                  <tr
                    key={rowKey}
                    className="transition-colors hover:bg-slate-50/60"
                  >
                    {normalizedColumns.map((col, colIndex) => {
                      const value = getCellValue(row, col, colIndex);
                      const isFirst = colIndex === 0;
                      const isLast = colIndex === normalizedColumns.length - 1;

                      // Custom column renderer
                      if (col.render) {
                        return (
                          <td
                            key={col.key}
                            className={`py-4 px-4 ${isFirst ? "pl-6" : ""} ${
                              isLast ? "pr-6" : ""
                            } ${col.className || ""}`}
                          >
                            {col.render(row, value, rowIndex)}
                          </td>
                        );
                      }

                      // Action Column with 3-dot Popover
                      if (col.isAction || col.key === "action") {
                        return (
                          <td
                            key={col.key}
                            className={`relative py-4 px-4 text-right ${
                              isLast ? "pr-6" : ""
                            }`}
                          >
                            <button
                              ref={(el) => (triggerRefs.current[rowKey] = el)}
                              type="button"
                              onClick={() =>
                                setActiveRowMenuId(
                                  activeRowMenuId === rowKey ? null : rowKey
                                )
                              }
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-800"
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

                      // Status Column with Pill Badge
                      if (col.isStatus || col.key === "status") {
                        const badgeStyle = getStatusBadgeStyle(value);
                        return (
                          <td key={col.key} className="py-4 px-4">
                            <span
                              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${badgeStyle}`}
                            >
                              {value}
                            </span>
                          </td>
                        );
                      }

                      // Default Cell Render
                      return (
                        <td
                          key={col.key}
                          className={`py-4 px-4 text-slate-600 ${
                            isFirst ? "pl-6 font-medium text-slate-900" : ""
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

      {/* Pagination Bar */}
      {showPagination && totalCount > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Results summary in Orange */}
          <span className="text-xs font-medium text-[#f97316] sm:text-sm">
            Showing {startIndex} to {endIndex} of {totalCount} results
          </span>

          {/* Previous & Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={activePage <= 1}
              className="rounded-xl border border-orange-400/60 bg-white px-4 py-1.5 text-xs font-medium text-[#f97316] shadow-sm transition-all hover:bg-orange-50/60 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNextPage}
              disabled={activePage >= totalPages}
              className="rounded-xl border border-orange-400/60 bg-white px-4 py-1.5 text-xs font-medium text-[#f97316] shadow-sm transition-all hover:bg-orange-50/60 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
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
