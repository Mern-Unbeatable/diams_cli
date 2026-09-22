import { useQuery } from "@tanstack/react-query";
import { fetchAddOns, fetchAddOn } from "../api/addOns.api";
import { addOnKeys } from "./addOns.keys";

export function useAddOns(filters = {}) {
  return useQuery({
    queryKey: addOnKeys.list(filters),
    queryFn: ({ signal }) => fetchAddOns(filters, { signal }),
  });
}

export function useAddOn(id) {
  return useQuery({
    queryKey: addOnKeys.detail(id),
    queryFn: ({ signal }) => fetchAddOn(id, { signal }),
    enabled: !!id,
  });
}
