import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings } from "../api/settings.api";
import { settingsKeys } from "./settings.keys";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => updateSettings(payload),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.current() });
    },
  });
}
