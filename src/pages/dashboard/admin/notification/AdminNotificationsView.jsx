import { useState, useMemo } from "react";
import { Eye } from "lucide-react";
import DataTable from "@/Components/dashboard/DataTable";
import {
  NotificationHeader,
  CreateNotificationModal,
  NotificationDetailsModal,
  NOTIFICATIONS_DATA,
} from "./sections";

const getTypeBadgeStyle = (type) => {
  const norm = String(type).toLowerCase();
  switch (norm) {
    case "email":
      return "bg-[#fee2e2] text-[#ef4444]";
    case "sms":
    case "low":
      return "bg-[#f1f5f9] text-[#64748b]";
    case "push":
      return "bg-[#fef9c3] text-[#a16207]";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const AdminNotificationsView = () => {
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const [selectedType, setSelectedType] = useState("All Types");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Filter notifications based on selected type
  const filteredNotifications = useMemo(() => {
    if (selectedType === "All Types") return notifications;
    return notifications.filter(
      (n) => n.type.toLowerCase() === selectedType.toLowerCase()
    );
  }, [notifications, selectedType]);

  // Table Columns Definition matching the screenshot
  const columns = useMemo(
    () => [
      {
        key: "audience",
        label: "Audience",
        render: (row) => (
          <span className="font-medium text-slate-900 leading-snug">
            {row.audience}
          </span>
        ),
      },
      {
        key: "subject",
        label: "Subject",
        render: (row) => (
          <span className="font-medium text-slate-800 leading-snug">
            {row.subject}
          </span>
        ),
      },
      {
        key: "type",
        label: "Type",
        render: (row) => (
          <span
            className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${getTypeBadgeStyle(
              row.type
            )}`}
          >
            {row.type}
          </span>
        ),
      },
      {
        key: "status",
        label: "Status",
        render: (row) => (
          <span className="inline-block rounded-full bg-[#e6f4ea] px-3 py-0.5 text-xs font-semibold text-[#137333]">
            {row.status || "Sent"}
          </span>
        ),
      },
      {
        key: "date",
        label: "Activation Date",
        render: (row) => (
          <span className="text-slate-600">{row.date}</span>
        ),
      },
      {
        key: "action",
        label: "Action",
        align: "center",
        className: "w-20 text-center",
        render: (row) => (
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => {
                setSelectedNotification(row);
                setIsDetailsModalOpen(true);
              }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
              title="View Details"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const handleSaveNotification = (newNotification) => {
    setNotifications((prev) => [newNotification, ...prev]);
  };

  return (
    <div className="min-h-full space-y-6 text-slate-900 font-sans">
      {/* 1. Header with Create Notifications Button and Type Dropdown */}
      <NotificationHeader
        selectedType={selectedType}
        onSelectType={setSelectedType}
        onCreateNotification={() => setIsCreateModalOpen(true)}
      />

      {/* 2. Notifications Table with Common DataTable */}
      <DataTable
        columns={columns}
        data={filteredNotifications}
        pageSize={10}
        emptyMessage="No notifications found matching the selected type."
      />

      {/* 3. Create Notification Modal */}
      <CreateNotificationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveNotification}
      />

      {/* 4. Notification Details Modal */}
      <NotificationDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedNotification(null);
        }}
        notification={selectedNotification}
      />
    </div>
  );
};

export default AdminNotificationsView;
