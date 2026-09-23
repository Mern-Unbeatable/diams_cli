import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserSupportTicket } from "../api/support.api";
import { userSupportKeys } from "./support.keys";

export function useCreateUserSupportTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createUserSupportTicket(payload),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userSupportKeys.tickets() });
    },
  });
}
