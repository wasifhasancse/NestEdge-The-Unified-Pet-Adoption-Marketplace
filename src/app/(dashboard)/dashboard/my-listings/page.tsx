import { Plus } from "lucide-react";
import ListingCard from "@/components/dashboard/ListingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserListing } from "@/lib/data/pets";
import Link from "next/link";
import { Pet } from "@/types";

export default async function MyListingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const authApi = await auth.api.getToken({
    headers: await headers(),
  });

  const email = session?.user?.email;
  const token = authApi?.token ?? "";
  const listing: Pet[] =
    email && token ? await getUserListing(email, token) : [];

  const availableListing = listing.filter(
    (list) => list.status === "available",
  );

  const adoptedListing = listing.filter((list) => list.status === "adopted");

  return (
    <section className="container mx-auto px-4 md:px-6 py-10 space-y-10 bg-background text-foreground">
      {/* HEADER */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            My
            <span className="text-primary"> Listings</span>
          </h2>

          <p className="text-sm md:text-base text-muted-foreground mt-2">
            Manage your pet listings and adoption requests.
          </p>
        </div>

        <Link href={"/dashboard/add-pet"}>
          <button className="bg-primary hover:opacity-90 cursor-pointer transition-all text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-md text-sm font-semibold">
            <Plus size={18} />
            Add New Pet
          </button>
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* TOTAL */}
        <div className="bg-card border border-border rounded-2xl shadow-sm p-6 text-center">
          <h2 className="text-4xl font-bold text-primary">{listing.length}</h2>
          <p className="uppercase tracking-widest text-xs mt-2 text-muted-foreground">
            Total Listings
          </p>
        </div>

        {/* AVAILABLE */}
        <div className="bg-card border border-border rounded-2xl shadow-sm p-6 text-center">
          <h2 className="text-4xl font-bold text-primary">
            {availableListing.length}
          </h2>
          <p className="uppercase tracking-widest text-xs mt-2 text-muted-foreground">
            Available
          </p>
        </div>

        {/* ADOPTED */}
        <div className="bg-card border border-border rounded-2xl shadow-sm p-6 text-center">
          <h2 className="text-4xl font-bold text-primary">
            {adoptedListing.length}
          </h2>
          <p className="uppercase tracking-widest text-xs mt-2 text-muted-foreground">
            Adopted
          </p>
        </div>
      </div>

      {listing.length === 0 ? (
        <Link
          href="/dashboard/add-pet"
          className="border-2 border-dashed border-border rounded-2xl min-h-96 flex flex-col items-center justify-center text-center p-8   transition-all cursor-pointer group"
        >
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:scale-110 transition-transform">
            <Plus size={32} className="text-primary" />
          </div>

          <h3 className="text-xl font-bold text-foreground ">Add New Pet</h3>

          <p className="text-sm text-muted-foreground mt-2">
            Grow your pet collection
          </p>
        </Link>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listing.map((pet) => (
            <div
              key={pet._id}
              className="hover:scale-[1.01] transition-transform duration-200"
            >
              <ListingCard pet={pet} />
            </div>
          ))}
        </div>
      )}

      <div className="pointer-events-none fixed -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none fixed top-32 left-24 h-72 w-72 rounded-full bg-chart-2/10 blur-[100px]" />
    </section>
  );
}
