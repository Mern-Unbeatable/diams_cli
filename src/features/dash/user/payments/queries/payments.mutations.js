import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserPayment } from "../api/payments.api";
import { userPaymentKeys } from "./payments.keys";

export function useCreateUserPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createUserPayment(payload),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userPaymentKeys.list() });
    },
  });
}
