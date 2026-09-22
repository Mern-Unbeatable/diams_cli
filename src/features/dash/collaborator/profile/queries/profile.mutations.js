import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCollaboratorProfile } from "../api/profile.api";
import { collabProfileKeys } from "./profile.keys";

export function useUpdateCollaboratorProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => updateCollaboratorProfile(payload),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: collabProfileKeys.current() });
    },
  });
}
