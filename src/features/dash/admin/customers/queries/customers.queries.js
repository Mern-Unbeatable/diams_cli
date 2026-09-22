import { useQuery } from "@tanstack/react-query";
import { fetchCustomers, fetchCustomer } from "../api/customers.api";
import { customerKeys } from "./customers.keys";

export function useCustomers(filters = {}) {
  return useQuery({
    queryKey: customerKeys.list(filters),
    queryFn: ({ signal }) => fetchCustomers(filters, { signal }),
  });
}

export function useCustomer(id) {
  return useQuery({
    queryKey: customerKeys.detail(id),
    queryFn: ({ signal }) => fetchCustomer(id, { signal }),
    enabled: !!id,
  });
}
