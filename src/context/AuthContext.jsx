import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  AUTH_STORAGE_KEY,
  DUMMY_USERS,
  ROLE_LABELS,
  ROLES,
} from "@/config/dummyAuth";

const AuthContext = createContext(null);

const readStoredUser = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    const isValidRole = Object.values(ROLES).includes(parsed?.role);

    if (!parsed?.email || !parsed?.name || !isValidRole) return null;

    return {
      email: parsed.email,
      name: parsed.name,
      role: parsed.role,
    };
  } catch {
    return null;
  }
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
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));

    return { ok: true, user: session };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
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
