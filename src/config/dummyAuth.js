export const ROLES = {
  ADMIN: "admin",
  COLLABORATOR: "collaborator",
  USER: "user",
};

export const ROLE_LABELS = {
  [ROLES.ADMIN]: "Admin",
  [ROLES.COLLABORATOR]: "Collaborator",
  [ROLES.USER]: "User",
};

export const AUTH_STORAGE_KEY = "novasky_auth";
export const DASHBOARD_PATH = "/dashboard";

export const ROLE_DASHBOARD_PATHS = {
  [ROLES.ADMIN]: "/dashboard/admin",
  [ROLES.COLLABORATOR]: "/dashboard/collaborator",
  [ROLES.USER]: "/dashboard/user",
};

export const getRoleDashboardPath = (role) =>
  ROLE_DASHBOARD_PATHS[role] ?? DASHBOARD_PATH;

export const DUMMY_USERS = [
  {
    email: "admin@novasky.com",
    password: "admin123",
    name: "Alex Morgan",
    role: ROLES.ADMIN,
  },
  {
    email: "collaborator@novasky.com",
    password: "collab123",
    name: "Jordan Lee",
    role: ROLES.COLLABORATOR,
  },
  {
    email: "user@novasky.com",
    password: "user123",
    name: "Sam Rivera",
    role: ROLES.USER,
  },
];
