import { useQuery } from "@tanstack/react-query";
import { fetchUserEsim } from "../api/esim.api";
import { userEsimKeys } from "./esim.keys";

export function useUserEsim() {
  return useQuery({
    queryKey: userEsimKeys.current(),
    queryFn: ({ signal }) => fetchUserEsim({ signal }),
  });
}
