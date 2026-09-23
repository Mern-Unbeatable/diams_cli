import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { COLLAB_PROFILE_MOCK } from "../mocks/profile.mock";

let profileState = { ...COLLAB_PROFILE_MOCK };

export async function fetchCollaboratorProfile({ signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(120, signal);
    return { ...profileState };
  }
  const { data } = await apiClient.get(ENDPOINTS.collaborator.profile.get, {
    signal,
  });
  return data;
}

export async function updateCollaboratorProfile(payload) {
  if (USE_API_MOCKS) {
    await mockDelay(180);
    profileState = {
      ...profileState,
      ...payload,
      name:
        [payload.firstName ?? profileState.firstName, payload.lastName ?? profileState.lastName]
          .filter(Boolean)
          .join(" ") || profileState.name,
    };
    return { ...profileState };
  }
  const { data } = await apiClient.patch(
    ENDPOINTS.collaborator.profile.update,
    payload,
  );
  return data;
}
