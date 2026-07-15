import IncomingAdoptionRequestsManager from "@/components/dashboard/IncomingAdoptionRequestsManager";
import { auth } from "@/lib/auth";
import { getUserListing } from "@/lib/data/pets";
import { getPetRequestsByPetId } from "@/lib/data/requests";
import { AdoptionRequest, Pet } from "@/types";
import { HeartHandshake } from "lucide-react";
import { headers } from "next/headers";

const AdoptionRequestsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const authApi = await auth.api.getToken({
    headers: await headers(),
  });

  const email = session?.user?.email;
  const token = authApi?.token || "";

  let listings: Pet[] = [];
  let incomingRequests: AdoptionRequest[] = [];

  if (email && token) {
    listings = (await getUserListing(email, token)) || [];

    if (listings.length > 0) {
      const requestGroups = await Promise.all(
        listings.map((pet) => getPetRequestsByPetId(pet._id, token)),
      );

      incomingRequests = requestGroups
        .flat()
        .filter((request): request is AdoptionRequest => Boolean(request));
    }
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="mb-8 space-y-3">
        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          Pet Owner Dashboard
        </span>

        <h2
          className="text-3xl md:text-4xl font-bold tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Incoming
          <span className="text-primary"> Adoption Requests</span>
        </h2>

        <p className="max-w-2xl text-muted-foreground text-base leading-relaxed">
          Review incoming adoption requests for your listings and take action by
          approving or rejecting each request.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm">
        <div className="mb-4 flex items-start justify-between border-b border-border pb-4 gap-3">
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
              <HeartHandshake className="text-primary h-4 w-4 shrink-0" />
              <span className="truncate">Incoming Adoption Requests</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Requests for your listed pets
            </p>
          </div>
        </div>

        <IncomingAdoptionRequestsManager initialRequests={incomingRequests} />
      </div>

      <div className="pointer-events-none fixed -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none fixed top-32 left-24 h-72 w-72 rounded-full bg-chart-2/10 blur-[100px]" />
    </section>
  );
};

export default AdoptionRequestsPage;
