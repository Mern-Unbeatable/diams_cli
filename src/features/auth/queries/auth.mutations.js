import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginRequest, logoutRequest } from "../api/auth.api";
import { authKeys } from "./auth.keys";

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => loginRequest(payload),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => logoutRequest(),
    onSettled: () => {
      queryClient.removeQueries({ queryKey: authKeys.all });
    },
  });
}
