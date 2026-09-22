import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../api/overview.api";
import { userOverviewKeys } from "./overview.keys";

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => updateUserProfile(payload),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userOverviewKeys.profile() });
    },
  });
}
