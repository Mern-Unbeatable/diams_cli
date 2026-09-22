import { useQuery } from "@tanstack/react-query";
import { fetchCollaboratorCustomers, fetchCollaboratorCustomer } from "../api/customers.api";
import { collabCustomerKeys } from "./customers.keys";

export function useCollaboratorCustomers(filters = {}) {
  return useQuery({
    queryKey: collabCustomerKeys.list(filters),
    queryFn: ({ signal }) => fetchCollaboratorCustomers(filters, { signal }),
  });
}

export function useCollaboratorCustomer(id) {
  return useQuery({
    queryKey: collabCustomerKeys.detail(id),
    queryFn: ({ signal }) => fetchCollaboratorCustomer(id, { signal }),
    enabled: !!id,
  });
}
