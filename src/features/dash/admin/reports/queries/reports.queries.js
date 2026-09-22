import { useQuery } from "@tanstack/react-query";
import { fetchReports, fetchReportsOverview } from "../api/reports.api";
import { reportKeys } from "./reports.keys";

export function useReportsOverview() {
  return useQuery({
    queryKey: reportKeys.overview(),
    queryFn: ({ signal }) => fetchReportsOverview({ signal }),
  });
}

export function useReports(filters = {}) {
  return useQuery({
    queryKey: reportKeys.list(filters),
    queryFn: ({ signal }) => fetchReports(filters, { signal }),
  });
}
