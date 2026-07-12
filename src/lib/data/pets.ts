import { buildApiUrl } from "@/lib/api-url";
import { Pet } from "@/types";

export const getAllPets = async (
  queryString = "",
): Promise<{
  pets: Pet[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}> => {
  const endpoint = queryString ? `/pets?${queryString}` : "/pets";
  const res = await fetch(buildApiUrl(endpoint), {
    cache: "no-store",
  });
  return await res.json();
};

export const getPetById = async (
  petId: string,
  token: string,
): Promise<Pet> => {
  const res = await fetch(buildApiUrl(`/pets/${petId}`), {
    headers: { authorization: `Bearer ${token}` },
  });
  return await res.json();
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
