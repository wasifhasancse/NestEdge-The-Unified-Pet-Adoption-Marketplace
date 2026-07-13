import UpdatePetForm from "@/components/dashboard/UpdatePetForm";
import { auth } from "@/lib/auth";
import { getPetById } from "@/lib/data/pets";
import { ArrowLeft, Pencil } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { Search } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const MyListingEditPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const authApi = await auth.api.getToken({
    headers: await headers(),
  });
  const token = authApi?.token ?? "";
  const pet = token ? await getPetById(id, token) : null;

  if (!pet) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-10 space-y-8 bg-background text-foreground">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            href="/dashboard/my-listings"
            className="flex items-center gap-1 hover:text-primary transition"
          >
            <ArrowLeft size={16} />
            Back to Listings
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card px-6 py-16 text-center shadow-sm">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Search className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Pet Not Found</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            This listing could not be loaded for editing. It may have been
            removed, or your session may have expired.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 space-y-8 bg-background text-foreground">
      {/* HEADER */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        {/* LEFT */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/dashboard/my-listings"
              className="flex items-center gap-1 hover:text-primary transition"
            >
              <ArrowLeft size={16} />
              Back to Listings
            </Link>

            <span>/</span>
            <span className="text-primary font-medium">Edit Pet</span>
          </div>

          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Edit
            <span className="text-primary"> Pet Listing</span>
          </h2>

          <p className="text-sm md:text-base text-muted-foreground max-w-xl">
            Update your pet’s details, health status, pricing, and visibility
            for adoption seekers.
          </p>
        </div>

        {/* RIGHT BADGE */}
        <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium w-fit">
          <Pencil size={16} />
          Editing Mode
        </div>
      </div>

      {/* FORM WRAPPER CARD */}
      <div className="">
        <UpdatePetForm pet={pet} token={token} />
      </div>
      <div className="pointer-events-none fixed -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none fixed top-32 left-24 h-72 w-72 rounded-full bg-chart-2/10 blur-[100px]" />
    </div>
  );
};

export default MyListingEditPage;
