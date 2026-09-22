/**
 * Mounts QueryClientProvider and DEV-only React Query Devtools.
 */

import { lazy, Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { env } from "@/lib/config/env";
import { queryClient } from "./query-client";

const ReactQueryDevtools = env.isDev
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
