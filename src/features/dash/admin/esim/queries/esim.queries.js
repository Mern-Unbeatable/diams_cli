import { useQuery } from "@tanstack/react-query";
import { fetchEsims, fetchEsim } from "../api/esim.api";
import { esimKeys } from "./esim.keys";

export function useEsims(filters = {}) {
  return useQuery({
    queryKey: esimKeys.list(filters),
    queryFn: ({ signal }) => fetchEsims(filters, { signal }),
  });
}

export function useEsim(id) {
  return useQuery({
    queryKey: esimKeys.detail(id),
    queryFn: ({ signal }) => fetchEsim(id, { signal }),
    enabled: !!id,
  });
}
