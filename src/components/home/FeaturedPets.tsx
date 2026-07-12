import { getFeaturedPets } from "@/lib/data/pets";
import { PawPrint } from "lucide-react";
import React from "react";
import PetCard from "../ui/PetCard";
import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";

const FeaturedPets = async () => {
  const featuredPets = await getFeaturedPets();
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-background">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-5">
            <PawPrint className="w-4 h-4" />
            Featured Pets
          </span>

          <h2
            className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Meet Our <span className="text-primary">Featured Pets</span>
          </h2>

          <p className="max-w-2xl mx-auto text-muted-foreground text-base md:text-lg leading-relaxed">
            Discover handpicked pets that are ready for adoption. Each featured
            pet is healthy, well-cared for, and waiting to find a loving forever
            home.
          </p>
        </div>

        {/* PET CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPets.map((pet) => (
            <PetCard key={pet?._id} pet={pet} />
          ))}
        </div>

        <div className="flex justify-center items-center">
          <Link
            href="/all-pets"
            className="inline-flex justify-center items-center gap-2 mt-10 text-sm font-medium text-primary hover:underline"
          >
            View All Pets <MdArrowRightAlt className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPets;
