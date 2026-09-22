import { useQuery } from "@tanstack/react-query";
import { fetchUserUsage } from "../api/usage.api";
import { userUsageKeys } from "./usage.keys";

export function useUserUsage() {
  return useQuery({
    queryKey: userUsageKeys.current(),
    queryFn: ({ signal }) => fetchUserUsage({ signal }),
  });
}
