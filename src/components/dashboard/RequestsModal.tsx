"use client";

import { useState } from "react";
import { Rocket } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";
import { Users } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { buildApiUrl } from "@/lib/api-url";
import { AdoptionRequest } from "@/types";
import toast from "react-hot-toast";
import { getPetRequestsByPetId } from "@/lib/data/requests";
import { Loader } from "@/components/ui/Loader";

interface RequestsModalProps {
  petId: string;
}

export function RequestsModal({ petId }: RequestsModalProps) {
  const sizes = ["lg"] as const;

  const [petRequests, setPetRequests] = useState<AdoptionRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  // GET PET REQUESTS
  const getPetRequests = async (id: string) => {
    try {
      setLoading(true);

      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      if (!token) {
        throw new Error("Missing session token");
      }

      const petRequests = await getPetRequestsByPetId(id, token);

      setPetRequests(petRequests);
    } catch {
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE REQUEST STATUS
  const handleStatus = async (
    id: string,
    status: AdoptionRequest["status"],
  ) => {
    const label = status === "approved" ? "Approving" : "Rejecting";
    const toastId = toast.loading(`${label} request...`);
    try {
      setActionLoading(id);

      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      if (!token) {
        throw new Error("Missing session token");
      }

      const res = await fetch(buildApiUrl(`/requests/${id}`), {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = (await res.json()) as { message?: string };

      if (res.ok) {
        await getPetRequests(petId);

        const emoji = status === "approved" ? "✅" : "❌";
        toast.success(`Request ${status} ${emoji}`, { id: toastId });
      } else {
        toast.error(data.message || "Failed to update request", {
          id: toastId,
        });
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setActionLoading(null);
    }
  };
  return (
    <div className="flex flex-wrap gap-4  ">
      {sizes.map((size) => (
        <Modal key={size}>
          {/* REQUESTS */}
          <Button
            onPress={() => getPetRequests(petId)}
            variant="outline"
            className="border w-full border-primary/40 bg-card text-primary cursor-pointer hover:bg-primary/10 transition-all duration-300 rounded-xl py-5 flex items-center justify-center gap-2 text-sm font-semibold shadow-sm"
          >
            <Users size={18} />
            Manage Requests
          </Button>

          <Modal.Backdrop>
            <Modal.Container size={size} className="border border-border ">
              <Modal.Dialog className="bg-card text-card-foreground rounded-3xl overflow-hidden">
                <Modal.CloseTrigger className="text-muted-foreground hover:text-foreground transition" />

                <Modal.Header className="border-b border-border pb-4">
                  <Modal.Icon className="bg-primary/10 text-primary border border-primary/20">
                    <Rocket className="size-5" />
                  </Modal.Icon>

                  <div>
                    <Modal.Heading className="text-xl font-bold text-foreground">
                      Adoption Requests
                    </Modal.Heading>

                    <p className="text-sm text-muted-foreground mt-1">
                      Manage all adoption requests for this pet
                    </p>
                  </div>
                </Modal.Header>

                <Modal.Body className="py-5">
                  {loading ? (
                    <div className="py-4">
                      <Loader size="section" />
                    </div>
                  ) : petRequests.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="p-4 rounded-full bg-primary/10 mb-4">
                        <Users className="size-7 text-primary" />
                      </div>

                      <h3 className="text-lg font-semibold text-foreground">
                        No Requests Found
                      </h3>

                      <p className="text-sm text-muted-foreground mt-1">
                        Nobody has requested adoption yet.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* TITLE */}
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-foreground">
                          Adoption Requests
                        </h2>

                        <span className="text-sm text-muted-foreground">
                          {petRequests.length} Requests
                        </span>
                      </div>

                      {petRequests.map((request) => (
                        <div
                          key={request._id}
                          className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30"
                        >
                          {/* TOP SECTION */}
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h2 className="text-lg font-bold text-foreground">
                                {request.userName}
                              </h2>

                              <p className="text-sm text-muted-foreground mt-1">
                                {request.userEmail}
                              </p>
                            </div>

                            {/* STATUS BADGE */}
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize border ${
                                request.status === "approved"
                                  ? "bg-green-500/10 text-green-600 border-green-500/20"
                                  : request.status === "rejected"
                                    ? "bg-red-500/10 text-red-600 border-red-500/20"
                                    : "bg-primary/10 text-primary border-primary/20"
                              }`}
                            >
                              {request.status}
                            </div>
                          </div>

                          {/* INFO */}
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between text-sm rounded-xl bg-muted/40 px-4 py-3 border border-border">
                              <span className="text-muted-foreground">
                                Pickup Date
                              </span>

                              <span className="font-medium text-foreground">
                                {request.pickupDate || "Not set"}
                              </span>
                            </div>
                          </div>

                          {/* ACTIONS */}
                          <div className="flex gap-3 mt-5">
                            {request.status === "pending" ? (
                              <>
                                {/* APPROVE */}
                                <button
                                  disabled={actionLoading === request._id}
                                  onClick={() =>
                                    handleStatus(request._id, "approved")
                                  }
                                  className="flex-1 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold transition-all duration-300 hover:opacity-90 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {actionLoading === request._id
                                    ? "Loading..."
                                    : "Approve"}
                                </button>

                                {/* REJECT */}
                                <button
                                  disabled={actionLoading === request._id}
                                  onClick={() =>
                                    handleStatus(request._id, "rejected")
                                  }
                                  className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {actionLoading === request._id
                                    ? "Loading..."
                                    : "Reject"}
                                </button>
                              </>
                            ) : (
                              <div
                                className={`w-full rounded-xl py-2.5 text-center text-sm font-semibold border ${
                                  request.status === "approved"
                                    ? "bg-green-500/10 text-green-600 border-green-500/20"
                                    : "bg-red-500/10 text-red-600 border-red-500/20"
                                }`}
                              >
                                Request {request.status}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Modal.Body>

                <Modal.Footer className="border-t border-border pt-4">
                  <Button
                    slot="close"
                    variant="secondary"
                    className="bg-muted text-foreground hover:bg-muted/80"
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      ))}
    </div>
  );
}
