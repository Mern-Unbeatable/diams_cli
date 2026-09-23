import React, { useEffect } from "react";
import { RouterProvider } from "react-router/dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AppQueryProvider } from "@/lib/provider/AppQueryProvider";
import { AppErrorBoundary } from "@/Components/common/AppErrorBoundary";
import { ToastProvider } from "@/Components/common/ToastProvider";
import { CrispChat } from "@/Components/integrations/CrispChat";
import { setUnauthorizedHandler } from "@/lib/auth/unauthorized";
import { toastInfo } from "@/lib/feedback/toast-bus";
import { router } from "@/routes";

/**
 * Registers 401 → logout once AuthProvider is mounted.
 */
function UnauthorizedBridge({ children }) {
  const { logout, isAuthenticated } = useAuth();

  useEffect(() => {
    return setUnauthorizedHandler(() => {
      if (!isAuthenticated) return;
      logout();
      toastInfo("Please sign in again.", "Session ended");
      if (window.location.pathname !== "/login") {
        window.location.assign("/login");
      }
    });
  }, [logout, isAuthenticated]);

  return children;
}

function App() {
  return (
    <AppErrorBoundary>
      <AppQueryProvider>
        <ToastProvider>
          <AuthProvider>
            <CrispChat />
            <UnauthorizedBridge>
              <RouterProvider router={router} />
            </UnauthorizedBridge>
          </AuthProvider>
        </ToastProvider>
      </AppQueryProvider>
    </AppErrorBoundary>
  );
}

export default App;
