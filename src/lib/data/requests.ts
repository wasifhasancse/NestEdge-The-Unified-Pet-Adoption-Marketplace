import { buildApiUrl } from "@/lib/api-url";
import { AdoptionRequest } from "@/types";

export const getMyRequests = async (
  email: string,
  token: string,
): Promise<AdoptionRequest[]> => {
  const res = await fetch(
    buildApiUrl(`/requests?userEmail=${encodeURIComponent(email)}`),
    {
      headers: { authorization: `Bearer ${token}` },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to load requests");
  }

  return await res.json();
};

export const getRequestByPetId = async (
  petId: string,
  token: string,
): Promise<AdoptionRequest[]> => {
  const res = await fetch(
    buildApiUrl(`/requests?petId=${encodeURIComponent(petId)}`),
    {
      headers: { authorization: `Bearer ${token}` },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to load requests");
  }

  return await res.json();
};

export const getPetRequestsByPetId = async (
  id: string,
  token: string,
): Promise<AdoptionRequest[]> => {
  const res = await fetch(
    buildApiUrl(`/requests?petId=${encodeURIComponent(id)}`),
    {
      headers: { authorization: `Bearer ${token}` },
    },
  );
  return await res.json();
};
