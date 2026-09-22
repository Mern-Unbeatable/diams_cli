import { useState, useMemo } from "react";
import { SquarePen } from "lucide-react";
import DataTable from "@/Components/dashboard/DataTable";
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
} from "@/features/dash/admin/users";
import { unwrapList } from "@/lib/query/unwrap";
import { useMutationFeedback } from "@/hooks/useMutationFeedback";
import {
  UsersHeader,
  InviteTeamCard,
  EditUserModal,
} from "./sections";

const getRoleBadgeStyle = (role) => {
  const norm = String(role).toLowerCase();
  switch (norm) {
    case "super admin":
      return "bg-[#fee2e2] text-[#ef4444]";
    case "marketing":
      return "bg-[#f1f5f9] text-[#64748b]";
    case "manager":
      return "bg-[#fef9c3] text-[#a16207]";
    case "support agent":
      return "bg-[#e6f4ea] text-[#137333]";
    case "finance":
      return "bg-[#e0f2fe] text-[#0284c7]";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const getStatusBadgeStyle = (status) => {
  const norm = String(status).toLowerCase();
  switch (norm) {
    case "active":
      return "bg-[#e6f4ea] text-[#137333]";
    case "disabled":
      return "bg-[#f1f5f9] text-[#64748b]";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const AdminUsersView = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const usersQuery = useUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  useMutationFeedback(createUser, {
    successMessage: "User invited.",
    errorTitle: "Invite failed",
  });
  useMutationFeedback(updateUser, {
    successMessage: "User updated.",
    errorTitle: "Update failed",
  });

  const users = useMemo(
    () => unwrapList(usersQuery.data),
    [usersQuery.data],
  );

  const columns = useMemo(
    () => [
      {
        key: "name",
        label: "Name",
        render: (row) => (
          <span className="font-semibold text-slate-900">{row.name}</span>
        ),
      },
      {
        key: "email",
        label: "Email",
        render: (row) => (
          <span className="text-slate-600 font-normal">{row.email}</span>
        ),
      },
      {
        key: "access",
        label: "Access",
        render: (row) => (
          <span className="font-medium text-slate-800">{row.access}</span>
        ),
      },
      {
        key: "role",
        label: "Role",
        render: (row) => (
          <span
            className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${getRoleBadgeStyle(
              row.role,
            )}`}
          >
            {row.role}
          </span>
        ),
      },
      {
        key: "status",
        label: "Status",
        render: (row) => (
          <span
            className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${getStatusBadgeStyle(
              row.status,
            )}`}
          >
            {row.status}
          </span>
        ),
      },
      {
        key: "loginDate",
        label: "Log in Date",
        render: (row) => (
          <span className="text-slate-600">{row.loginDate}</span>
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
                setSelectedUser(row);
                setIsEditModalOpen(true);
              }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
              title="Edit User"
            >
              <SquarePen className="h-4 w-4" />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const handleInvite = ({ email, role }) => {
    if (createUser.isPending) return;
    createUser.mutate({
      name: email.split("@")[0].replace(".", " "),
      email,
      access: "Overview",
      role,
      status: "Active",
      loginDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    });
  };

  const handleSaveUser = (userId, updatedData) => {
    if (updateUser.isPending) return;
    updateUser.mutate({ id: userId, payload: updatedData });
  };

  return (
    <div className="min-h-full space-y-6 text-slate-900 font-sans pb-10">
      <UsersHeader />

      <InviteTeamCard onInvite={handleInvite} />

      <DataTable
        columns={columns}
        data={users}
        pageSize={10}
        emptyMessage="No users found."
        isLoading={usersQuery.isLoading}
        isFetching={usersQuery.isFetching && !usersQuery.isLoading}
        error={usersQuery.isError ? usersQuery.error : null}
        onRetry={() => usersQuery.refetch()}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onSave={handleSaveUser}
      />
    </div>
  );
};

export default AdminUsersView;
