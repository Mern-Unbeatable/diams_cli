import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCollaboratorActivation } from "../api/activations.api";
import { collabActivationKeys } from "./activations.keys";

export function useUpdateCollaboratorActivation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateCollaboratorActivation(id, payload),
    onSettled: (_data, _err, vars) => {
      queryClient.invalidateQueries({ queryKey: collabActivationKeys.all });
      if (vars?.id) {
        queryClient.invalidateQueries({
          queryKey: collabActivationKeys.detail(vars.id),
        });
      }
    },
  });
}
