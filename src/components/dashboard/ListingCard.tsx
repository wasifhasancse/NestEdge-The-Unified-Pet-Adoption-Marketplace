import { Pet } from "@/types";
import { MapPin, Pencil, PawPrint, HeartHandshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ListingCardProps {
  pet: Pet;
}

const ListingCard: React.FC<ListingCardProps> = ({ pet }) => {
  const isAvailable = pet.status === "available";

  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <div className="relative aspect-[4/3] bg-muted">
        {pet.image ? (
          <Image
            src={pet.image}
            alt={pet.petName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
            <PawPrint className="h-10 w-10" />
          </div>
        )}

        <span
          className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-xs font-semibold capitalize backdrop-blur ${
            isAvailable
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
              : "border-amber-500/20 bg-amber-500/10 text-amber-600"
          }`}
        >
          {pet.status}
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-lg font-bold text-foreground">{pet.petName}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {pet.breed} • {pet.species}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="truncate">{pet.location}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-2xl bg-muted/35 p-3 text-sm">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Age
            </p>
            <p className="mt-1 font-semibold text-foreground">{pet.age}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Fee
            </p>
            <p className="mt-1 font-semibold text-foreground">
              ${pet.adoptionFee}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/dashboard/my-listings/edit/${pet._id}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
          <Link
            href="/dashboard/my-listings"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            <HeartHandshake className="h-4 w-4 text-primary" />
            Requests
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ListingCard;
