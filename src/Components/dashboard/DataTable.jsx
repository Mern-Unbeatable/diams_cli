import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import {
  Ban,
  CalendarDays,
  CheckCircle2,
  Eye,
  MoreVertical,
  Pencil,
  ShieldAlert,
  Trash2,
  XCircle,
} from "lucide-react";

/**
 * Status Badge Style Resolver
 * Matches the soft-pill badges seen in the design (borderless, soft tints)
 */
export const getStatusBadgeStyle = (status) => {
  if (!status) return "bg-slate-100 text-slate-600";
  const normalized = String(status).toLowerCase().trim();

  switch (normalized) {
    case "pending":
      return "bg-[#e0f7fa] text-[#0097a7]";
    case "identity verification":
    case "verification":
      return "bg-[#f1f3f5] text-[#6c757d]";
    case "approved":
      return "bg-[#e8f0fe] text-[#3b82f6]";
    case "activated":
    case "active":
      return "bg-[#fef3c7] text-[#d97706]";
    case "rejected":
    case "suspended":
      return "bg-[#fee2e2] text-[#ef4444]";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

export const DEFAULT_ACTIONS = [
  { label: "See Details", action: "details" },
  { label: "Pending", action: "status_pending" },
  { label: "Identity Verification", action: "status_verification" },
  { label: "Approved", action: "status_approved" },
  { label: "Activated", action: "status_activated" },
  { label: "Rejected", action: "status_rejected" },
];

const resolveActionVisual = (act) => {
  const key = `${act.action || ""} ${act.label || ""} ${act.variant || ""}`.toLowerCase();

  if (act.variant === "danger" || /delete|reject|remove/.test(key)) {
    return { Icon: Trash2, className: "text-red-500 hover:bg-red-50" };
  }
  if (act.variant === "warning" || /deactivate|suspend|ban|forbid/.test(key)) {
    return { Icon: Ban, className: "text-orange-500 hover:bg-orange-50" };
  }
  if (
    act.variant === "success" ||
    /active(?!.*de)|approve|activate|enable/.test(key)
  ) {
    return {
      Icon: CheckCircle2,
      className: "text-emerald-600 hover:bg-emerald-50",
    };
  }
  if (/availability|calendar|schedule/.test(key)) {
    return {
      Icon: CalendarDays,
      className: "text-teal-600 hover:bg-teal-50",
    };
  }
  if (/edit|update|rename/.test(key)) {
    return { Icon: Pencil, className: "text-slate-600 hover:bg-slate-50" };
  }
  if (/pending|verification|identity/.test(key)) {
    return {
      Icon: ShieldAlert,
      className: "text-slate-600 hover:bg-slate-50",
    };
  }
  if (/detail|view|see/.test(key) || act.isPrimary) {
    return { Icon: Eye, className: "text-slate-700 hover:bg-slate-50" };
  }
  if (/close|cancel|x /.test(key)) {
    return { Icon: XCircle, className: "text-orange-500 hover:bg-orange-50" };
  }

  return { Icon: Pencil, className: "text-slate-600 hover:bg-slate-50" };
};

const ActionMenu = ({
  row,
  actions = DEFAULT_ACTIONS,
  onActionClick,
  isOpen,
  onClose,
  triggerRef,
}) => {
  const menuRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef?.current) return;

    const updatePosition = () => {
      const trigger = triggerRef.current;
      const menu = menuRef.current;
      if (!trigger) return;

      const rect = trigger.getBoundingClientRect();
      const menuHeight = menu?.offsetHeight || Math.max(actions.length, 1) * 40;
      const menuWidth = menu?.offsetWidth || 190;
      const gap = 6;

      const spaceBelow = window.innerHeight - rect.bottom - gap;
      const spaceAbove = rect.top - gap;
      const openUp = spaceBelow < menuHeight && spaceAbove > spaceBelow;

      const top = openUp
        ? Math.max(8, rect.top - menuHeight - gap)
        : rect.bottom + gap;

      const left = Math.min(
        Math.max(8, rect.right - menuWidth),
        window.innerWidth - menuWidth - 8,
      );

      setCoords({ top, left });
    };

    updatePosition();
    const raf = requestAnimationFrame(updatePosition);

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, triggerRef, actions.length]);

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

  return createPortal(
    <div
      ref={menuRef}
      style={{ top: coords.top, left: coords.left }}
      className="fixed z-[80] min-w-[190px] overflow-hidden rounded-xl border border-slate-200/80 bg-white py-1.5 shadow-lg ring-1 ring-black/5"
    >
      {actions.map((act, index) => {
        if (act.isSeparator || act.isHeader) {
          return (
            <div
              key={index}
              className="border-t border-slate-100 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 first:border-t-0"
            >
              {act.header || act.label}
            </div>
          );
        }

        if (!act.label) return null;

        const { Icon, className } = resolveActionVisual(act);
        const CustomIcon = act.icon;

        return (
          <button
            key={index}
            type="button"
            onClick={() => {
              if (act.onClick) act.onClick(row);
              if (onActionClick) onActionClick(act.action || act.label, row);
              onClose();
            }}
            className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-[13px] font-medium transition-colors ${className}`}
          >
            {CustomIcon ? (
              <CustomIcon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            ) : (
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            )}
            <span>{act.label}</span>
          </button>
        );
      })}
    </div>,
    document.body,
  );
};

const RowActions = ({
  row,
  rowKey,
  actions,
  onActionClick,
  activeRowMenuId,
  setActiveRowMenuId,
  triggerRefs,
}) => {
  if (actions === false) return null;

  return (
    <div className="relative inline-flex">
      <button
        ref={(el) => {
          triggerRefs.current[rowKey] = el;
        }}
        type="button"
        onClick={() =>
          setActiveRowMenuId(activeRowMenuId === rowKey ? null : rowKey)
        }
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100"
        aria-label="Row actions"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      <ActionMenu
        row={row}
        actions={actions}
        onActionClick={onActionClick}
        isOpen={activeRowMenuId === rowKey}
        onClose={() => setActiveRowMenuId(null)}
        triggerRef={{ current: triggerRefs.current[rowKey] }}
      />
    </div>
  );
};

const CellValue = ({ col, row, value, rowIndex }) => {
  if (col.render) {
    return col.render(row, value, rowIndex);
  }

  if (col.isStatus || col.key === "status" || /status/i.test(col.key || "")) {
    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-tight ${getStatusBadgeStyle(
          value,
        )}`}
      >
        {value ?? "—"}
      </span>
    );
  }

  if (value === null || value === undefined || value === "") {
    return <span className="text-slate-400">—</span>;
  }

  return <span className={col.className || ""}>{value}</span>;
};

const MobileCards = ({
  columns,
  data,
  actions,
  onActionClick,
  activeRowMenuId,
  setActiveRowMenuId,
  triggerRefs,
  isLoading,
  emptyMessage,
  getCellValue,
}) => {
  const dataColumns = columns.filter(
    (col) => !(col.isAction || col.key === "action"),
  );
  const hasActions =
    actions !== false &&
    columns.some((col) => col.isAction || col.key === "action");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-slate-400">
        <div className="h-2 w-2 animate-ping rounded-full bg-sky-500" />
        <span className="text-sm">Loading records...</span>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-slate-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-full space-y-3 p-3 sm:p-4">
      {data.map((row, rowIndex) => {
        const rowKey = row.id || row.orderId || row.key || `m-${rowIndex}`;
        const titleCol = dataColumns[0];
        const titleValue = titleCol
          ? getCellValue(row, titleCol, 0)
          : null;
        const restColumns = dataColumns.slice(1);

        return (
          <article
            key={rowKey}
            className="mx-auto w-full max-w-full rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                {titleCol && (
                  <>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {titleCol.label}
                    </p>
                    <div className="mt-1 text-sm font-semibold text-slate-900">
                      <CellValue
                        col={titleCol}
                        row={row}
                        value={titleValue}
                        rowIndex={rowIndex}
                      />
                    </div>
                  </>
                )}
              </div>

              {hasActions && (
                <RowActions
                  row={row}
                  rowKey={`card-${rowKey}`}
                  actions={actions}
                  onActionClick={onActionClick}
                  activeRowMenuId={activeRowMenuId}
                  setActiveRowMenuId={setActiveRowMenuId}
                  triggerRefs={triggerRefs}
                />
              )}
            </div>

            {restColumns.length > 0 && (
              <div className="divide-y divide-slate-100 border-t border-slate-100">
                {restColumns.map((col, colIndex) => {
                  const value = getCellValue(row, col, colIndex + 1);
                  return (
                    <div
                      key={col.key}
                      className="flex items-start justify-between gap-3 py-2.5"
                    >
                      <span className="shrink-0 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                        {col.label}
                      </span>
                      <div className="min-w-0 text-right text-[13px] text-slate-700">
                        <CellValue
                          col={col}
                          row={row}
                          value={value}
                          rowIndex={rowIndex}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </article>
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

  const paginationFooter =
    showPagination && totalCount > 0 ? (
      <div className="flex flex-col items-center justify-center gap-3 border-t border-slate-100 bg-white px-4 py-4 text-center sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <p className="text-[13px] font-medium text-[#f97316]">
          Showing {startIndex} to {endIndex} of {totalCount} results
        </p>

        <div className="flex items-center justify-center space-x-2">
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
    ) : null;

  return (
    <div
      className={`w-full overflow-hidden rounded-lg border border-slate-100 bg-white font-sans shadow-[0_2px_10px_rgba(0,0,0,0.02)] ${className}`}
    >
      {/* Mobile + Tablet: card layout */}
      <div className="lg:hidden">
        <MobileCards
          columns={normalizedColumns}
          data={paginatedData}
          actions={actions}
          onActionClick={onActionClick}
          activeRowMenuId={activeRowMenuId}
          setActiveRowMenuId={setActiveRowMenuId}
          triggerRefs={triggerRefs}
          isLoading={isLoading}
          emptyMessage={emptyMessage}
          getCellValue={getCellValue}
        />
      </div>

      {/* Desktop: table layout */}
      <div className="hidden overflow-x-auto overflow-y-hidden lg:block [scrollbar-width:thin]">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead className="bg-[#F6FBFF]">
            <tr className="border-b border-slate-100 text-[13px] font-semibold text-slate-800">
              {normalizedColumns.map((col, idx) => (
                <th
                  key={col.key}
                  className={`px-4 py-4 ${idx === 0 ? "pl-6" : ""} ${
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
                const rowKey = row.id || row.orderId || row.key || rowIndex;

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

                      const alignClass =
                        col.align === "center"
                          ? "text-center"
                          : col.align === "right"
                            ? "text-right"
                            : "text-left";

                      if (col.isAction || col.key === "action") {
                        return (
                          <td
                            key={col.key}
                            className={`px-4 py-3.5 text-center ${
                              isLast ? "pr-6" : ""
                            }`}
                          >
                            <RowActions
                              row={row}
                              rowKey={`table-${rowKey}`}
                              actions={actions}
                              onActionClick={onActionClick}
                              activeRowMenuId={activeRowMenuId}
                              setActiveRowMenuId={setActiveRowMenuId}
                              triggerRefs={triggerRefs}
                            />
                          </td>
                        );
                      }

                      return (
                        <td
                          key={col.key}
                          className={`px-4 py-3.5 ${alignClass} ${
                            isFirst ? "pl-6 font-medium text-slate-800" : ""
                          } ${isLast ? "pr-6" : ""} ${col.className || ""}`}
                        >
                          <CellValue
                            col={col}
                            row={row}
                            value={value}
                            rowIndex={rowIndex}
                          />
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

      {paginationFooter}
    </div>
  );
};

export default DataTable;
