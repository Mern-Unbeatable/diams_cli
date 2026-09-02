import { useState, useMemo } from "react";
import { SquarePen } from "lucide-react";
import DataTable from "@/Components/dashboard/DataTable";
import {
  UsersHeader,
  InviteTeamCard,
  EditUserModal,
  USERS_DATA,
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
  const [users, setUsers] = useState(USERS_DATA);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Table Columns Definition matching the screenshot
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
              row.role
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
              row.status
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
    []
  );

  const handleInvite = ({ email, role }) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name: email.split("@")[0].replace(".", " "),
      email: email,
      access: "Overview",
      role: role,
      status: "Active",
      loginDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };
    setUsers((prev) => [newUser, ...prev]);
  };

  const handleSaveUser = (userId, updatedData) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...updatedData } : u))
    );
  };

  return (
    <div className="min-h-full space-y-6 text-slate-900 font-sans pb-10">
      {/* 1. Header */}
      <UsersHeader />

      {/* 2. Invite Team Card */}
      <InviteTeamCard onInvite={handleInvite} />

      {/* 3. Users Table with Common DataTable */}
      <DataTable
        columns={columns}
        data={users}
        pageSize={10}
        emptyMessage="No users found."
      />

      {/* 4. Edit User Modal */}
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
