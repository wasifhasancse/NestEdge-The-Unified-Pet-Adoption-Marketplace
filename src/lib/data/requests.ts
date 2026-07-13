import { buildApiUrl } from "@/lib/api-url";
import { AdoptionRequest } from "@/types";

const isAdoptionRequest = (value: unknown): value is AdoptionRequest => {
  return typeof value === "object" && value !== null && "_id" in value;
};

const normalizeRequests = (value: unknown): AdoptionRequest[] => {
  return Array.isArray(value) ? value.filter(isAdoptionRequest) : [];
};

export const getMyRequests = async (
  email: string,
  token: string,
): Promise<AdoptionRequest[]> => {
  try {
    const res = await fetch(
      buildApiUrl(`/requests?userEmail=${encodeURIComponent(email)}`),
      {
        cache: "no-store",
        headers: { authorization: `Bearer ${token}` },
      },
    );

    if (!res.ok) {
      return [];
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return [];
    }

    return normalizeRequests(await res.json());
  } catch {
    return [];
  }
};

export const getRequestByPetId = async (
  petId: string,
  token: string,
): Promise<AdoptionRequest[]> => {
  try {
    const res = await fetch(
      buildApiUrl(`/requests?petId=${encodeURIComponent(petId)}`),
      {
        cache: "no-store",
        headers: { authorization: `Bearer ${token}` },
      },
    );

    if (!res.ok) {
      return [];
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return [];
    }

    return normalizeRequests(await res.json());
  } catch {
    return [];
  }
};

export const getPetRequestsByPetId = async (
  id: string,
  token: string,
): Promise<AdoptionRequest[]> => {
  try {
    const res = await fetch(
      buildApiUrl(`/requests?petId=${encodeURIComponent(id)}`),
      {
        cache: "no-store",
        headers: { authorization: `Bearer ${token}` },
      },
    );

    if (!res.ok) {
      return [];
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return [];
    }

    return normalizeRequests(await res.json());
  } catch {
    return [];
  }
};
