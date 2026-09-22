import { useState, useMemo } from "react";
import { Eye } from "lucide-react";
import DataTable from "@/Components/dashboard/DataTable";
import {
  useNotifications,
  useCreateNotification,
} from "@/features/dash/admin/notifications";
import { unwrapList } from "@/lib/query/unwrap";
import { useMutationFeedback } from "@/hooks/useMutationFeedback";
import {
  NotificationHeader,
  CreateNotificationModal,
  NotificationDetailsModal,
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
  const [selectedType, setSelectedType] = useState("All Types");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const listFilters =
    selectedType === "All Types" ? {} : { type: selectedType };

  const notificationsQuery = useNotifications(listFilters);
  const createNotification = useCreateNotification();

  useMutationFeedback(createNotification, {
    successMessage: "Notification created.",
    errorTitle: "Create failed",
  });

  const notifications = useMemo(
    () => unwrapList(notificationsQuery.data),
    [notificationsQuery.data],
  );

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
              row.type,
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
    [],
  );

  const handleSaveNotification = (newNotification) => {
    if (createNotification.isPending) return;
    createNotification.mutate(newNotification);
  };

  return (
    <div className="min-h-full space-y-6 text-slate-900 font-sans">
      <NotificationHeader
        selectedType={selectedType}
        onSelectType={setSelectedType}
        onCreateNotification={() => setIsCreateModalOpen(true)}
      />

      <DataTable
        columns={columns}
        data={notifications}
        pageSize={10}
        emptyMessage="No notifications found matching the selected type."
        isLoading={notificationsQuery.isLoading}
        isFetching={
          notificationsQuery.isFetching && !notificationsQuery.isLoading
        }
        error={notificationsQuery.isError ? notificationsQuery.error : null}
        onRetry={() => notificationsQuery.refetch()}
      />

      <CreateNotificationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveNotification}
      />

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
