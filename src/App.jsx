import React from "react";
import { RouterProvider } from "react-router/dom";
import { AuthProvider } from "@/context/AuthContext";
import { AppQueryProvider } from "@/lib/AppQueryProvider";
import { router } from "@/routes";

function App() {
  return (
    <AppQueryProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AppQueryProvider>
  );
}

export default App;
