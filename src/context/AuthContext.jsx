import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  AUTH_STORAGE_KEY,
  DUMMY_USERS,
  ROLE_LABELS,
  ROLES,
} from "@/config/dummyAuth";
import { clearAuthSession } from "@/lib/auth/session";
import { getJSON, setJSON } from "@/lib/storage";
import { queryClient } from "@/lib/query/query-client";

const AuthContext = createContext(null);

const readStoredUser = () => {
  const parsed = getJSON(AUTH_STORAGE_KEY, null);
  if (!parsed) return null;

  const isValidRole = Object.values(ROLES).includes(parsed?.role);
  if (!parsed?.email || !parsed?.name || !isValidRole) return null;

  return {
    email: parsed.email,
    name: parsed.name,
    role: parsed.role,
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);

  const login = useCallback((email, password) => {
    const matched = DUMMY_USERS.find(
      (account) =>
        account.email.toLowerCase() === email.trim().toLowerCase() &&
        account.password === password,
    );

    if (!matched) {
      return { ok: false, message: "Invalid email or password." };
    }

    const session = {
      email: matched.email,
      name: matched.name,
      role: matched.role,
    };

    setUser(session);
    setJSON(AUTH_STORAGE_KEY, session);

    return { ok: true, user: session };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    clearAuthSession();
    // Drop cached server state so the next session cannot see the previous user's data.
    queryClient.clear();
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      roleLabel: user ? ROLE_LABELS[user.role] : "",
      login,
      logout,
    }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
