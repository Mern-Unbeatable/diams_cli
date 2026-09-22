import { useQuery } from "@tanstack/react-query";
import { fetchCollaboratorInvoices, fetchCollaboratorInvoice } from "../api/invoices.api";
import { collabInvoiceKeys } from "./invoices.keys";

export function useCollaboratorInvoices(filters = {}) {
  return useQuery({
    queryKey: collabInvoiceKeys.list(filters),
    queryFn: ({ signal }) => fetchCollaboratorInvoices(filters, { signal }),
  });
}

export function useCollaboratorInvoice(id) {
  return useQuery({
    queryKey: collabInvoiceKeys.detail(id),
    queryFn: ({ signal }) => fetchCollaboratorInvoice(id, { signal }),
    enabled: !!id,
  });
}
