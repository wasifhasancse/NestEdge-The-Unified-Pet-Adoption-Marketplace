import OwnerWarningCard from "@/components/ui/OwnerWarningCard";
import PetDetailAdoptForm from "@/components/ui/PetDetailAdoptForm";
import PetDetailPageContent from "@/components/ui/PetDetailPageContent";
import { auth } from "@/lib/auth";
import { getPetById } from "@/lib/data/pets";
import { Search } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

interface PageProps {
  params: Promise<{ petId: string }>;
}

const PetDetailsPage = async ({ params }: PageProps) => {
  const { petId } = await params;

  const requestHeaders = await headers();

  const session = await auth.api
    .getSession({
      headers: requestHeaders,
    })
    .catch(() => null);

  const token = session
    ? await auth.api
        .getToken({
          headers: requestHeaders,
        })
        .then((value) => value?.token || "")
        .catch(() => "")
    : "";

  const pet = await getPetById(petId);

  const userEmail = session?.user?.email;

  if (!pet) {
    return (
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20 bg-background">
        <div className="mb-6">
          <Link
            href="/all-pets"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline"
          >
            ← Back
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center rounded-3xl border border-border/60 bg-card px-6 py-16 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Search className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground">
            Pet Not Found
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
            This pet is unavailable right now. It may have been removed, or the
            server response could not be loaded.
          </p>
        </div>
      </main>
    );
  }

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
        ) : !session ? (
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="rounded-[24px] border border-border bg-card p-6 md:p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Adopt this pet
              </p>
              <h2 className="mt-3 text-3xl font-bold text-foreground">
                Sign in to send an adoption request
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                You can view pet details without logging in. To submit an
                adoption request, please sign in first.
              </p>
              <Link
                href={`/signin?redirect=/all-pets/${petId}`}
                className="btn-primary mt-6 w-full"
              >
                Sign In to Adopt
              </Link>
            </div>
          </div>
        ) : (
          <PetDetailAdoptForm pet={pet} token={token} />
        )}
      </div>
    </main>
  );
};

export default PetDetailsPage;
