import MyAdoptionRequests from "@/components/dashboard/MyAdoptionRequests";
import { auth } from "@/lib/auth";
import { getMyRequests } from "@/lib/data/requests";
import { AdoptionRequest } from "@/types";
import { PawPrint } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

const MyRequestsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const authApi = await auth.api.getToken({
    headers: await headers(),
  });
  const user = session?.user;
  const token = authApi?.token ?? "";
  const requests: AdoptionRequest[] =
    user?.email && token ? await getMyRequests(user.email, token) : [];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden container mx-auto px-4 md:px-6 py-10">
      {/* HEADER */}
      <div className="mb-8 space-y-3">
        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          My Requests
        </span>

        <h2
          className="text-3xl md:text-4xl font-bold tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          My Adoption
          <span className="text-primary"> Requests</span>
        </h2>

        <p className="max-w-2xl text-muted-foreground text-base leading-relaxed">
          Track the status of all your adoption requests here. We&apos;re
          helping you find the perfect companion for your home.
        </p>
      </div>

      {requests?.length > 0 ? (
        <MyAdoptionRequests requests={requests} />
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <div className="border border-primary/20 bg-primary/5 rounded-2xl p-8 container w-full shadow-sm">
            {/* ICON */}
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <PawPrint className="h-8 w-8" />
            </div>

            {/* TITLE */}
            <h3 className="text-2xl font-semibold mb-2">
              No Adoption Requests Yet
            </h3>

            {/* DESCRIPTION */}
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
              You haven’t made any adoption requests yet. Start exploring pets
              and send your first request to find your perfect companion.
            </p>

            {/* BUTTON */}
            <Link
              href="/all-pets"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-white text-sm font-medium hover:bg-primary/90 transition"
            >
              Browse Pets
            </Link>
          </div>
        </div>
      )}

      {/* BACKGROUND BLURS */}
      <div className="pointer-events-none fixed -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none fixed top-32 left-24 h-72 w-72 rounded-full bg-chart-2/10 blur-[100px]" />
    </div>
  );
};

export default MyRequestsPage;
