/**
 * Demo auth session payloads (feature layer only — not wired to pages).
 */
export const AUTH_ME_MOCK = {
  id: "usr-1",
  email: "admin@novasky.ch",
  name: "Admin User",
  role: "admin",
};

export const AUTH_LOGIN_MOCK = {
  token: "demo-access-token",
  user: AUTH_ME_MOCK,
};
