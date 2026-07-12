import { BadgeCheck, MapPin, MoveRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Pet } from "@/types";

interface PetDetailPageContentProps {
  pet: Pet;
}

const PetDetailPageContent: React.FC<PetDetailPageContentProps> = ({ pet }) => {
  const {
    petName,
    species,
    breed,
    age,
    gender,
    adoptionFee,
    healthStatus,
    status,
    image,
    location,
    description,
    ownerName,
    ownerEmail,
  } = pet;

  return (
    <div className="lg:col-span-8 space-y-6">
      {/* HERO IMAGE */}
      <div className="relative overflow-hidden rounded-[28px] bg-secondary/35 h-80 md:h-130 border border-border">
        <div className="absolute top-4 left-4 z-10">
          <span className="flex items-center gap-1 bg-primary/15 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/20">
            <BadgeCheck className="w-3 h-3 fill-current" />
            {status}
          </span>
        </div>

        <div className="w-full h-full flex items-center justify-center">
          <Image
            src={image}
            alt={petName}
            fill
            className="opacity-90 object-cover"
          />
        </div>
      </div>

      {/* PET INFO CARD */}
      <div className="bg-card rounded-[28px] border border-border p-7 shadow-md hover:shadow-lg transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* LEFT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              {petName}
            </h1>

            <div className="flex flex-wrap gap-2 mt-5">
              <span className="px-3 py-1 rounded-full bg-muted/70 text-xs text-muted-foreground border border-border">
                {species}
              </span>

              <span className="px-3 py-1 rounded-full bg-muted/70 text-xs text-muted-foreground border border-border">
                {breed}
              </span>

              <span className="px-3 py-1 rounded-full bg-muted/70 text-xs text-muted-foreground border border-border">
                {age} Years Old
              </span>

              <span className="px-3 py-1 rounded-full bg-muted/70 text-xs text-muted-foreground border border-border">
                {gender}
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="md:text-right bg-primary/5 px-5 py-4 rounded-2xl border border-primary/10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
              ${adoptionFee}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Adoption Fee</p>
          </div>
        </div>

        {/* BOTTOM INFO */}
        <div className="mt-7 pt-6 border-t border-border flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-secondary/10">
              <MapPin className="w-4 h-4 text-secondary" />
            </div>
            <span className="text-sm text-foreground font-medium">
              {location}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-green-500/10">
              <BadgeCheck className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm text-foreground">
              {healthStatus === "Healthy"
                ? "Healthy & fully vaccinated"
                : healthStatus}
            </span>
          </div>
        </div>
      </div>

      {/* ABOUT + OWNER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ABOUT */}
        <div className="bg-card rounded-[24px] border border-border p-6 shadow-sm">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            About {petName}
          </h3>

          <p className="text-muted-foreground leading-7 text-sm">
            {description}
          </p>
        </div>

        {/* OWNER */}
        <div className="bg-card rounded-[24px] border border-border p-6 shadow-sm">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Owner Info
          </h3>

          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted flex items-center justify-center border border-border">
              <span className="text-xl font-bold text-foreground">
                {ownerName?.charAt(0)}
              </span>
            </div>

            <div>
              <h4 className="font-bold text-foreground">{ownerName}</h4>

              <p className="text-sm text-muted-foreground">{ownerEmail}</p>

              <button className="mt-2 flex items-center gap-1 text-sm text-primary font-semibold hover:underline cursor-pointer bg-transparent border-none">
                View Profile
                <MoveRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* READY SECTION */}
      <div className="bg-card rounded-[24px] border border-border p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <h2 className="text-4xl font-extrabold text-foreground leading-tight">
            Ready to start a new chapter?
          </h2>

          <p className="mt-4 text-muted-foreground leading-7 text-sm">
            Adopting {petName} means more than just bringing home a pet; it&apos;s a
            lifetime commitment of love and companionship. Our team ensures a
            smooth transition for both of you.
          </p>
        </div>

        <div className="relative w-full md:w-55 h-55 rounded-[24px] overflow-hidden">
          <Image
            src={image}
            alt={petName}
            fill
            className="opacity-90 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PetDetailPageContent;
