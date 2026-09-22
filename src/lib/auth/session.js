/**
 * Auth session/token helpers for HTTP + shared infra.
 * Login/logout workflows stay in AuthContext / features/auth.
 */

import { AUTH_STORAGE_KEY } from "@/config/dummyAuth";
import { getJSON, removeItem } from "@/lib/storage";

/**
 * Raw session object from storage (may include token when backend auth lands).
 * @returns {Record<string, unknown> | null}
 */
export function getAuthSession() {
  const session = getJSON(AUTH_STORAGE_KEY, null);
  if (!session || typeof session !== "object") return null;
  return session;
}

/**
 * Bearer token when present on the session.
 * @returns {string | null}
 */
export function getAccessToken() {
  const session = getAuthSession();
  if (!session) return null;
  const token = session.token || session.accessToken;
  return typeof token === "string" && token ? token : null;
}

export function clearAuthSession() {
  removeItem(AUTH_STORAGE_KEY);
}
