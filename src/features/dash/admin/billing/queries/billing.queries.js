import { useQuery } from "@tanstack/react-query";
import { fetchBillingList, fetchBilling } from "../api/billing.api";
import { billingKeys } from "./billing.keys";

export function useBillingList(filters = {}) {
  return useQuery({
    queryKey: billingKeys.list(filters),
    queryFn: ({ signal }) => fetchBillingList(filters, { signal }),
  });
}

export function useBilling(id) {
  return useQuery({
    queryKey: billingKeys.detail(id),
    queryFn: ({ signal }) => fetchBilling(id, { signal }),
    enabled: !!id,
  });
}
