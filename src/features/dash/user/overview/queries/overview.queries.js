import { useQuery } from "@tanstack/react-query";
import {
  fetchUserMyLine,
  fetchUserOverview,
  fetchUserProfile,
} from "../api/overview.api";
import { userOverviewKeys } from "./overview.keys";

export function useUserOverview() {
  return useQuery({
    queryKey: userOverviewKeys.overview(),
    queryFn: ({ signal }) => fetchUserOverview({ signal }),
  });
}

export function useUserMyLine() {
  return useQuery({
    queryKey: userOverviewKeys.myLine(),
    queryFn: ({ signal }) => fetchUserMyLine({ signal }),
  });
}

export function useUserProfile() {
  return useQuery({
    queryKey: userOverviewKeys.profile(),
    queryFn: ({ signal }) => fetchUserProfile({ signal }),
  });
}
