import { useQuery } from "@tanstack/react-query";
import { fetchCollaboratorProfile } from "../api/profile.api";
import { collabProfileKeys } from "./profile.keys";

export function useCollaboratorProfile() {
  return useQuery({
    queryKey: collabProfileKeys.current(),
    queryFn: ({ signal }) => fetchCollaboratorProfile({ signal }),
  });
}
