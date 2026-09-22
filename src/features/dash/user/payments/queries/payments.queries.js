import { useQuery } from "@tanstack/react-query";
import { fetchUserPayments } from "../api/payments.api";
import { userPaymentKeys } from "./payments.keys";

export function useUserPayments() {
  return useQuery({
    queryKey: userPaymentKeys.list(),
    queryFn: ({ signal }) => fetchUserPayments({ signal }),
  });
}
