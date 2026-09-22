/**
 * Why this file exists:
 * Mounts QueryClientProvider and DEV-only React Query Devtools.
 */

import { lazy, Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() =>
      import("@tanstack/react-query-devtools").then((mod) => ({
        default: mod.ReactQueryDevtools,
      })),
    )
  : null;

export const AppQueryProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    {ReactQueryDevtools ? (
      <Suspense fallback={null}>
        <ReactQueryDevtools initialIsOpen={false} />
      </Suspense>
    ) : null}
  </QueryClientProvider>
);
