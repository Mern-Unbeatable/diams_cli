/**
 * Why this file exists:
 * Keeps the Crisp chat vendor integration in one place — loading the widget and
 * keeping its visitor session in sync with our auth state. Nothing else in the
 * app should import `crisp-sdk-web`.
 *
 * Usage:
 *   Mount once at the app root, inside AuthProvider. Renders nothing.
 */

import { useEffect, useRef } from "react";
import { Crisp } from "crisp-sdk-web";
import { useAuth } from "@/context/AuthContext";
import { env } from "@/lib/config";

/**
 * Module scope rather than a ref, so the widget script is injected exactly once
 * per page load even across the remount StrictMode performs in development.
 */
let isConfigured = false;

export function CrispChat() {
  const { user } = useAuth();
  const hasIdentifiedUser = useRef(false);

  useEffect(() => {
    if (!env.crispWebsiteId) {
      if (env.isDev) {
        console.warn(
          "[CrispChat] VITE_CRISP_WEBSITE_ID is not set — chat widget disabled.",
        );
      }
      return;
    }

    if (isConfigured) return;

    Crisp.configure(env.crispWebsiteId);
    isConfigured = true;
  }, []);

  useEffect(() => {
    if (!env.crispWebsiteId) return;

    if (user) {
      Crisp.user.setNickname(user.name);
      Crisp.user.setEmail(user.email);
      Crisp.session.setData({ role: user.role });
      hasIdentifiedUser.current = true;
      return;
    }

    // Reset only when leaving an identified session. Resetting on any anonymous
    // render would discard a visitor's in-progress conversation on every reload.
    if (hasIdentifiedUser.current) {
      Crisp.session.reset();
      hasIdentifiedUser.current = false;
    }
  }, [user]);

  return null;
}

export default CrispChat;
