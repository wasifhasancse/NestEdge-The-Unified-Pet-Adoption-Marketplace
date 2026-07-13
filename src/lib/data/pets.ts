import { buildApiUrl } from "@/lib/api-url";
import { Pet } from "@/types";

const emptyPetsResponse = {
  pets: [] as Pet[],
  totalPages: 1,
  currentPage: 1,
  totalItems: 0,
};

const isPet = (value: unknown): value is Pet => {
  return typeof value === "object" && value !== null && "_id" in value;
};

const normalizePetsResponse = (value: unknown) => {
  if (!value || typeof value !== "object") {
    return emptyPetsResponse;
  }

  const response = value as Partial<{
    pets: unknown;
    totalPages: number;
    currentPage: number;
    totalItems: number;
  }>;

  const pets = Array.isArray(response.pets)
    ? response.pets.filter(isPet)
    : emptyPetsResponse.pets;

  return {
    pets,
    totalPages:
      typeof response.totalPages === "number" && response.totalPages > 0
        ? response.totalPages
        : 1,
    currentPage:
      typeof response.currentPage === "number" && response.currentPage > 0
        ? response.currentPage
        : 1,
    totalItems:
      typeof response.totalItems === "number" && response.totalItems >= 0
        ? response.totalItems
        : pets.length,
  };
};

export const getAllPets = async (
  queryString = "",
): Promise<{
  pets: Pet[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}> => {
  const endpoint = queryString ? `/pets?${queryString}` : "/pets";
  try {
    const res = await fetch(buildApiUrl(endpoint), {
      cache: "no-store",
    });

    if (!res.ok) {
      return emptyPetsResponse;
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return emptyPetsResponse;
    }

    return normalizePetsResponse(await res.json());
  } catch {
    return emptyPetsResponse;
  }
};

export const getPetById = async (
  petId: string,
  token: string,
): Promise<Pet | null> => {
  try {
    const res = await fetch(buildApiUrl(`/pets/${petId}`), {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return null;
    }

    const pet = await res.json();
    return isPet(pet) ? pet : null;
  } catch {
    return null;
  }
};

export const getFeaturedPets = async (): Promise<Pet[]> => {
  try {
    const res = await fetch(buildApiUrl("/featured-pets"), {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return [];
    }

    return await res.json();
  } catch {
    return [];
  }
};

export const getUserListing = async (
  email: string,
  token: string,
): Promise<Pet[]> => {
  const res = await fetch(
    buildApiUrl(`/listings?email=${encodeURIComponent(email)}`),
    {
      cache: "no-store",
      headers: { authorization: `Bearer ${token}` },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch listings");
  }

  return await res.json();
};
