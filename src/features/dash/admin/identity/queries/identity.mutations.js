import { useMutation, useQueryClient } from "@tanstack/react-query";
import { identityKeys } from "./identity.keys";
import { updateIdentity } from "../api/identity.api";

export function useUpdateIdentity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateIdentity(id, payload),
    onSettled: (_d, _e, v) => {
      queryClient.invalidateQueries({ queryKey: identityKeys.detail(v.id) });
      queryClient.invalidateQueries({ queryKey: identityKeys.lists() });
    },
  });
}
