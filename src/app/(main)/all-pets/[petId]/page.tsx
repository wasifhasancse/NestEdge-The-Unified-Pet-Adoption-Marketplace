import { getPetById } from "@/lib/data/pets";
import PetDetailAdoptForm from "@/components/ui/PetDetailAdoptForm";
import PetDetailPageContent from "@/components/ui/PetDetailPageContent";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import OwnerWarningCard from "@/components/ui/OwnerWarningCard";
import React from "react";

interface PageProps {
  params: Promise<{ petId: string }>;
}

const PetDetailsPage = async ({ params }: PageProps) => {
  const { petId } = await params;

  const authApi = await auth.api.getToken({
    headers: await headers(),
  });
  const token = authApi?.token || "";

  const pet = await getPetById(petId, token);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userEmail = session?.user?.email;

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20 bg-background">
      {/* BACK BUTTON */}
      <div className="mb-6">
        <Link
          href="/all-pets"
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline"
        >
          ← Back
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT SIDE */}
        <PetDetailPageContent pet={pet} />

        {userEmail === pet.ownerEmail ? (
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <OwnerWarningCard />
          </div>
        ) : (
          <PetDetailAdoptForm pet={pet} token={token} />
        )}
      </div>
    </main>
  );
};

export default PetDetailsPage;
