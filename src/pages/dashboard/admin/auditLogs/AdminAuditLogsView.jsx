import { useState, useMemo } from "react";
import { Eye } from "lucide-react";
import DataTable from "@/Components/dashboard/DataTable";
import {
  AuditHeader,
  AuditFilterBox,
  ActivityDetailsModal,
  AUDIT_LOGS_DATA,
} from "./sections";

const AdminAuditLogsView = () => {
  const [logs, setLogs] = useState(AUDIT_LOGS_DATA);
  const [selectedAdmin, setSelectedAdmin] = useState("All");
  const [selectedModule, setSelectedModule] = useState("All");
  const [selectedAction, setSelectedAction] = useState("All");
  const [dateRange, setDateRange] = useState("");

  const [selectedLog, setSelectedLog] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Filter logs based on Admin, Module, Action, and Date
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchAdmin =
        selectedAdmin === "All" ||
        log.admin.toLowerCase() === selectedAdmin.toLowerCase();
      const matchModule =
        selectedModule === "All" ||
        log.module.toLowerCase() === selectedModule.toLowerCase();
      const matchAction =
        selectedAction === "All" ||
        log.action.toLowerCase() === selectedAction.toLowerCase();
      const matchDate =
        !dateRange.trim() || log.dateTime.includes(dateRange.trim());

      return matchAdmin && matchModule && matchAction && matchDate;
    });
  }, [logs, selectedAdmin, selectedModule, selectedAction, dateRange]);

  // Table Columns Definition matching screenshot
  const columns = useMemo(
    () => [
      {
        key: "dateTime",
        label: "Date & Time",
        render: (row) => (
          <span className="font-semibold text-slate-800">{row.dateTime}</span>
        ),
      },
      {
        key: "admin",
        label: "Admin",
        render: (row) => (
          <span className="font-medium text-slate-900">{row.admin}</span>
        ),
      },
      {
        key: "action",
        label: "Action",
        render: (row) => (
          <span className="text-slate-800 font-normal">{row.action}</span>
        ),
      },
      {
        key: "module",
        label: "Module",
        render: (row) => (
          <span className="text-slate-600 font-normal">{row.module}</span>
        ),
      },
      {
        key: "target",
        label: "Target",
        render: (row) => (
          <span className="text-slate-700 font-medium">{row.target}</span>
        ),
      },
      {
        key: "ipActivity",
        label: "IP/Activity information",
        render: (row) => (
          <span className="text-slate-600 font-mono text-xs">{row.ipActivity}</span>
        ),
      },
      {
        key: "status",
        label: "Status",
        render: (row) => (
          <span
            className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${
              row.status === "Success"
                ? "bg-[#e6f4ea] text-[#137333]"
                : "bg-[#fee2e2] text-[#ef4444]"
            }`}
          >
            {row.status}
          </span>
        ),
      },
      {
        key: "actions",
        label: "Action",
        align: "center",
        className: "w-20 text-center",
        render: (row) => (
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => {
                setSelectedLog(row);
                setIsDetailsModalOpen(true);
              }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
              title="View Activity Details"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const handleRefresh = () => {
    setSelectedAdmin("All");
    setSelectedModule("All");
    setSelectedAction("All");
    setDateRange("");
  };

  return (
    <div className="min-h-full space-y-6 text-slate-900 font-sans pb-10">
      {/* 1. Page Header */}
      <AuditHeader />

      {/* 2. Administrator Activity Filter Card */}
      <AuditFilterBox
        selectedAdmin={selectedAdmin}
        onSelectAdmin={setSelectedAdmin}
        selectedModule={selectedModule}
        onSelectModule={setSelectedModule}
        selectedAction={selectedAction}
        onSelectAction={setSelectedAction}
        dateRange={dateRange}
        onDateChange={setDateRange}
        onRefresh={handleRefresh}
      />

      {/* 3. Audit Logs Table with Common DataTable */}
      <DataTable
        columns={columns}
        data={filteredLogs}
        pageSize={5}
        emptyMessage="No audit logs found matching the selected filters."
      />

      {/* 4. Activity Details Modal */}
      <ActivityDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedLog(null);
        }}
        log={selectedLog}
      />
    </div>
  );
};

export default AdminAuditLogsView;
