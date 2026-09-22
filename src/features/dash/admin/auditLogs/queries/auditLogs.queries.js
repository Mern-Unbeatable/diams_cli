import { useQuery } from "@tanstack/react-query";
import { fetchAuditLogs } from "../api/auditLogs.api";
import { auditLogKeys } from "./auditLogs.keys";

export function useAuditLogs(filters = {}) {
  return useQuery({
    queryKey: auditLogKeys.list(filters),
    queryFn: ({ signal }) => fetchAuditLogs(filters, { signal }),
  });
}
