import { useQuery } from "@tanstack/react-query";
import { fetchUserFaq, fetchUserSupportTickets } from "../api/support.api";
import { userSupportKeys } from "./support.keys";

export function useUserSupportTickets() {
  return useQuery({
    queryKey: userSupportKeys.tickets(),
    queryFn: ({ signal }) => fetchUserSupportTickets({ signal }),
  });
}

export function useUserFaq() {
  return useQuery({
    queryKey: userSupportKeys.faq(),
    queryFn: ({ signal }) => fetchUserFaq({ signal }),
  });
}
