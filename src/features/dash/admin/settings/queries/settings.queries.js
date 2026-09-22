import { useQuery } from "@tanstack/react-query";
import { fetchSettings } from "../api/settings.api";
import { settingsKeys } from "./settings.keys";

export function useSettings() {
  return useQuery({
    queryKey: settingsKeys.current(),
    queryFn: ({ signal }) => fetchSettings({ signal }),
  });
}
