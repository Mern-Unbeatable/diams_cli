import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { AuthProvider } from "@/context/AuthContext";
import { AppQueryProvider } from "@/api/AppQueryProvider";
import { router } from "@/router/routes.jsx";
import "@/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppQueryProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AppQueryProvider>
  </StrictMode>,
);
