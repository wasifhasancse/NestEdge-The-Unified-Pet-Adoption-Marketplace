"use client";

import { buildApiUrl } from "@/lib/api-url";
import { authClient } from "@/lib/auth-client";
import { AdoptionRequest } from "@/types";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";

interface DeleteRequestProps {
  request: AdoptionRequest;
}

export function DeleteRequest({ request }: DeleteRequestProps) {
  const router = useRouter();
  const id = request?._id;
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCancel = async () => {
    const toastId = toast.loading("Cancelling request...");
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      if (!token) {
        throw new Error("Your session has expired. Please sign in again.");
      }

      const res = await fetch(buildApiUrl(`/requests/${id}`), {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const data = (await res.json().catch(() => null)) as {
        deletedCount?: number;
        message?: string;
        error?: string;
      } | null;

      if (res.ok && data?.deletedCount) {
        toast.success("Request Cancelled successfully 🐾", { id: toastId });
        setOpen(false);

        router.refresh();
      } else {
        toast.error(
          data?.error || data?.message || "Failed to cancel request",
          {
            id: toastId,
          },
        );
      }
    } catch (error: unknown) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <>
      {/* Trigger Button - Clean & Consistent design */}
      <button
        onClick={() => setOpen(true)}
        className="w-fit inline-flex items-center justify-center gap-2 rounded-xl border border-destructive/30 px-4 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/10 transition-all cursor-pointer"
      >
        <Trash2 size={16} />
        Cancel Request
      </button>

      {/* Modal Portal */}
      {open &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <div
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
            />

            {/* Dialog Container */}
            <div className="relative w-full max-w-md bg-card text-card-foreground rounded-3xl shadow-2xl p-6 md:p-8 border border-border/80 z-10 scale-95 animate-in fade-in zoom-in-95 duration-200">
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-all duration-200"
              >
                <X size={18} />
              </button>

              {/* Icon & Heading */}
              <div className="flex flex-col items-center text-center space-y-4 mt-2">
                <div className="p-3.5 rounded-full bg-destructive/10 text-destructive animate-bounce-short">
                  <AlertTriangle size={28} />
                </div>
                <h3
                  className="text-xl font-bold text-foreground tracking-tight"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  Cancel adoption request?
                </h3>
              </div>

              {/* Message Details */}
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-center">
                Are you sure you want to cancel your adoption request for{" "}
                <span className="font-bold text-primary">
                  {request?.petName}
                </span>
                ? This action cannot be undone and will remove your application
                data.
              </p>

              {/* Modal Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={() => setOpen(false)}
                  className="w-full sm:w-auto order-2 sm:order-1 px-5 py-2.5 rounded-xl border border-border text-sm font-semibold hover:bg-muted text-foreground transition-all cursor-pointer"
                >
                  No, keep request
                </button>

                <button
                  onClick={handleCancel}
                  className="w-full sm:w-auto order-1 sm:order-2 px-6 py-2.5 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Trash2 size={15} />
                  Yes, cancel request
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
