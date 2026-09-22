import { useQuery } from "@tanstack/react-query";
import { fetchUserBill, fetchUserBills } from "../api/bills.api";
import { userBillKeys } from "./bills.keys";

export function useUserBills() {
  return useQuery({
    queryKey: userBillKeys.list(),
    queryFn: ({ signal }) => fetchUserBills({ signal }),
  });
}

export function useUserBill(id) {
  return useQuery({
    queryKey: userBillKeys.detail(id),
    queryFn: ({ signal }) => fetchUserBill(id, { signal }),
    enabled: !!id,
  });
}
