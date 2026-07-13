import { AdoptionRequest } from "@/types";
import { CalendarDays, PawPrint } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MyAdoptionRequestsProps {
  requests: AdoptionRequest[];
}

const MyAdoptionRequests: React.FC<MyAdoptionRequestsProps> = ({
  requests,
}) => {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
      {requests.map((request) => (
        <article
          key={request._id}
          className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
        >
          <div className="flex items-start gap-4 p-5">
            <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted">
              {request.petImage ? (
                <Image
                  src={request.petImage}
                  alt={request.petName}
                  fill
                  className="object-cover"
                  sizes="72px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
                  <PawPrint className="h-7 w-7" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-bold text-foreground">
                    {request.petName}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {request.userName || request.userEmail}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
                    request.status === "approved"
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
                      : request.status === "rejected"
                        ? "border-rose-500/20 bg-rose-500/10 text-rose-600"
                        : "border-amber-500/20 bg-amber-500/10 text-amber-600"
                  }`}
                >
                  {request.status}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p className="truncate">Requester: {request.userEmail}</p>
                <p className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  Pickup: {request.pickupDate || "Pending"}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-border bg-muted/25 px-5 py-4">
            {request.message ? (
              <p className="line-clamp-3 text-sm leading-relaxed text-foreground/85">
                {request.message}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                No message was included with this adoption request.
              </p>
            )}

            <Link
              href={`/all-pets/${request.petId}`}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              View Pet Details
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default MyAdoptionRequests;
