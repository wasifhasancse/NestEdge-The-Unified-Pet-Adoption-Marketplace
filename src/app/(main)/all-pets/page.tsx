import PetCard from "@/components/ui/PetCard";
import PetSearchSection from "@/components/ui/PetSearchSection";
import Pagination from "@/components/ui/Pagination";
import { getAllPets } from "@/lib/data/pets";
import { Search } from "lucide-react";
import React from "react";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const AllPetsPage = async ({ searchParams }: PageProps) => {
  const sParams = await searchParams;

  // Format query parameters
  const queryObj: Record<string, string> = {};
  Object.keys(sParams).forEach((key) => {
    const value = sParams[key];
    if (typeof value === "string") {
      queryObj[key] = value;
    } else if (Array.isArray(value)) {
      queryObj[key] = value[0] || "";
    }
  });

  const queryString = new URLSearchParams(queryObj).toString();
  const { pets, totalPages } = await getAllPets(queryString);

  return (
    <section className="bg-background pt-5">
      <div className="max-w-7xl mx-auto">
        <PetSearchSection />

        {pets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-5 mb-10 px-6 text-center">
            <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Search className="w-14 h-14 text-primary" />
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              No Pets Found
            </h2>

            <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
              We couldn&apos;t find any pets matching your search or filters. Try
              adjusting your filters or searching with a different keyword.
            </p>
          </div>
        ) : (
          <>
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {pets.map((pet) => (
                <PetCard key={pet?._id} pet={pet} />
              ))}
            </div>

            <Pagination totalPages={totalPages || 1} />
          </>
        )}
      </div>
    </section>
  );
};

export default AllPetsPage;
