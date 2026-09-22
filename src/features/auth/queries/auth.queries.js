import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../api/auth.api";
import { authKeys } from "./auth.keys";

export function useMe(options = {}) {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: ({ signal }) => fetchMe({ signal }),
    ...options,
  });
}
