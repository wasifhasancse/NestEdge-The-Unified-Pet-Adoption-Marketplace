"use client";

import { buildApiUrl } from "@/lib/api-url";
import { authClient } from "@/lib/auth-client";
import { AdoptionRequest } from "@/types";
import { Calendar, PawPrint, UserCircle2 } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

interface IncomingAdoptionRequestsManagerProps {
  initialRequests: AdoptionRequest[];
}

const statusStyles: Record<AdoptionRequest["status"], string> = {
  approved: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  rejected: "bg-rose-500/10 text-rose-600 border-rose-500/20",
};

export default function IncomingAdoptionRequestsManager({
  initialRequests,
}: IncomingAdoptionRequestsManagerProps) {
  const [requests, setRequests] = useState<AdoptionRequest[]>(initialRequests);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const sortedRequests = useMemo(() => {
    return [...requests].sort((a, b) => {
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (a.status !== "pending" && b.status === "pending") return 1;

      const aDate = a.createdAt ? Date.parse(a.createdAt) : 0;
      const bDate = b.createdAt ? Date.parse(b.createdAt) : 0;
      return bDate - aDate;
    });
  }, [requests]);

  const updateStatus = async (
    requestId: string,
    petId: string,
    status: AdoptionRequest["status"],
  ) => {
    if (status === "pending") return;

    const actionLabel = status === "approved" ? "Accepting" : "Rejecting";
    const toastId = toast.loading(`${actionLabel} request...`);

    try {
      setActionLoading(requestId);
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      if (!token) {
        throw new Error("Your session has expired. Please sign in again.");
      }

      const response = await fetch(buildApiUrl(`/requests/${requestId}`), {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = (await response.json().catch(() => null)) as {
        message?: string;
        error?: string;
      } | null;

      if (!response.ok) {
        throw new Error(
          data?.error || data?.message || "Failed to update request",
        );
      }

      setRequests((previous) => {
        if (status === "approved") {
          return previous.map((item) => {
            if (item.petId !== petId) return item;
            return {
              ...item,
              status: item._id === requestId ? "approved" : "rejected",
            };
          });
        }

        return previous.map((item) =>
          item._id === requestId ? { ...item, status } : item,
        );
      });

      toast.success(
        status === "approved"
          ? "Request approved successfully."
          : "Request rejected successfully.",
        { id: toastId },
      );
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      toast.error(message, { id: toastId });
    } finally {
      setActionLoading(null);
    }
  };

  if (sortedRequests.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <PawPrint className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-bold text-foreground">
          No incoming requests yet
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          When people apply to adopt your listed pets, their requests will show
          up here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedRequests.map((request) => {
        const isPending = request.status === "pending";
        const isThisCardLoading = actionLoading === request._id;

        return (
          <article
            key={request._id}
            className="rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:border-primary/25"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border bg-muted shrink-0">
                  {request.userImage ? (
                    <Image
                      src={request.userImage}
                      alt={request.userName || "Requester"}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-primary">
                      <UserCircle2 className="h-7 w-7" />
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-xl font-bold text-foreground">
                    {request.userName}
                  </h3>
                  <p className="truncate text-sm text-muted-foreground">
                    {request.userEmail}
                  </p>
                </div>
              </div>

              <span
                className={`shrink-0 rounded-full border px-3 py-1 text-sm font-semibold capitalize ${statusStyles[request.status]}`}
              >
                {request.status}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="font-semibold text-primary">
                  🐾 {request.petName}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />{" "}
                  {request.pickupDate || "No date"}
                </span>
              </div>

              {isPending ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateStatus(request._id, request.petId, "approved")
                    }
                    disabled={isThisCardLoading}
                    className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isThisCardLoading ? "Saving..." : "Accept"}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateStatus(request._id, request.petId, "rejected")
                    }
                    disabled={isThisCardLoading}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <span className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                  No action needed
                </span>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
