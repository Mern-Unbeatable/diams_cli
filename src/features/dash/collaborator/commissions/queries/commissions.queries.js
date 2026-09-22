import { useQuery } from "@tanstack/react-query";
import {
  fetchCollaboratorCommissionSummary,
  fetchCollaboratorCommissions,
} from "../api/commissions.api";
import { collabCommissionKeys } from "./commissions.keys";

export function useCollaboratorCommissions() {
  return useQuery({
    queryKey: collabCommissionKeys.list(),
    queryFn: ({ signal }) => fetchCollaboratorCommissions({ signal }),
  });
}

export function useCollaboratorCommissionSummary() {
  return useQuery({
    queryKey: collabCommissionKeys.summary(),
    queryFn: ({ signal }) => fetchCollaboratorCommissionSummary({ signal }),
  });
}
