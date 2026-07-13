"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Trash2, X, AlertTriangle } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { buildApiUrl } from "@/lib/api-url";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface DeleteListingModalProps {
  petId: string;
  petName?: string;
}

export default function DeleteListingModal({
  petId,
  petName,
}: DeleteListingModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting listing...");
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch(buildApiUrl(`/pets/${petId}`), {
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        toast.error("Failed to delete listing", { id: toastId });
        return;
      }
      toast.success("Listing deleted successfully 🐾", { id: toastId });
      setOpen(false);

      router.refresh();
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="w-full border border-destructive/30 text-destructive hover:bg-destructive/10 transition-all rounded-xl py-2.5 flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer"
      >
        <Trash2 size={18} />
        Delete Listing
      </button>

      {/* Modal */}
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
              {/* Close button */}
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
                  Delete listing permanently?
                </h3>
              </div>

              {/* Body */}
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-center">
                This action will permanently delete{" "}
                <span className="font-bold text-foreground text-primary">
                  {petName || "this pet listing"}
                </span>{" "}
                and all its data. You can’t undo this action.
              </p>

              {/* Footer Buttons */}
              <div className="mt-8  flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setOpen(false)}
                  className="w-full sm:w-auto order-2 sm:order-1 px-5 py-2.5 rounded-xl border border-border text-sm font-semibold hover:bg-muted text-foreground transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="w-full sm:w-auto order-1 sm:order-2 px-6 py-2.5 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Trash2 size={15} />
                  Delete Listing
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
