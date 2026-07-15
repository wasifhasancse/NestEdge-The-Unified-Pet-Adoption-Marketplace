import { Pet } from "@/types";
import { ArrowRight, Heart, MapPin, PawPrint, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const {
    _id,
    petName,
    species,
    age,
    gender,
    adoptionFee,
    healthStatus,
    image,
    location,
    status,
    breed,
  } = pet;

  return (
    <article className="group w-full overflow-hidden rounded-[30px] border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* IMAGE SECTION */}
      <div className="relative h-72 overflow-hidden">
        {/* OVERLAY */}
        <div className="absolute inset-0 z-1 bg-linear-to-t from-black/40 via-black/5 to-transparent" />

        {/* FAVORITE BUTTON
        <button className="absolute left-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/80 text-foreground/80 backdrop-blur-md transition-all duration-300 hover:scale-110 dark:bg-black/30 dark:text-primary btn-secondary p-0">
          <Heart className="h-5 w-5" />
        </button> */}

        {/* STATUS BADGE */}
        <div className="absolute right-4 top-4 z-10 rounded-full bg-primary px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-lg">
          {status}
        </div>

        {/* PET IMAGE */}
        <Image
          src={image}
          alt={petName}
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* BOTTOM INFO */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-white/15 px-4 py-2 backdrop-blur-md dark:bg-black/20">
          <PawPrint className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-white">{breed}</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="space-y-3 p-6">
        {/* TITLE + PRICE */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
              {petName}
            </h2>

            <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {species}
            </p>
          </div>

          <div className="rounded-2xl bg-primary/10 px-4 py-2 text-right border border-primary/15">
            <p className="text-[11px] font-medium text-muted-foreground">
              Adoption Fee
            </p>

            <h3 className="text-2xl font-extrabold text-primary">
              ${adoptionFee}
            </h3>
          </div>
        </div>

        {/* INFO TAGS */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-xl border border-border bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
            {age} Years Old
          </span>

          <span className="rounded-xl border border-border bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
            {gender}
          </span>

          <span className="rounded-xl border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            {healthStatus}
          </span>
        </div>

        {/* LOCATION */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{location}</span>
        </div>

        {/* HEALTH */}
        <div className="flex items-center justify-between rounded-2xl border border-border bg-muted/40 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">
                Fully Vaccinated
              </p>

              <p className="text-xs text-muted-foreground">
                Health checked & safe
              </p>
            </div>
          </div>

          <div className="h-2 w-2 rounded-full bg-green-500" />
        </div>

        {/* BUTTONS */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Link
            href={`/all-pets/${_id}`}
            className="btn-secondary h-12 rounded-2xl"
          >
            View Details
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href={`/all-pets/${_id}`}
            className="btn-primary h-12 rounded-2xl"
          >
            Adopt Now
            <Heart className="h-4 w-4 fill-current" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PetCard;
