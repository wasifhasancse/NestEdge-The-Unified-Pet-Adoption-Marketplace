"use client";

import { buildApiUrl } from "@/lib/api-url";
import { authClient } from "@/lib/auth-client";
import { Pet } from "@/types";
import { CalendarDays, CheckCircle } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface PetDetailAdoptFormProps {
  pet: Pet;
  token: string;
}

const PetDetailAdoptForm: React.FC<PetDetailAdoptFormProps> = ({
  pet,
  token,
}) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAdopt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please sign in to send an adoption request.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Sending adoption request...");
    const formData = new FormData(e.currentTarget);
    const adoptionFormData = Object.fromEntries(formData.entries());

    const adoptionData = {
      petId: pet?._id,
      petName: pet?.petName,
      petImage: pet?.image,
      ownerEmail: pet?.ownerEmail,

      userName: user?.name,
      userEmail: user?.email,
      userImage: user?.image,

      pickupDate: adoptionFormData.pickupDate,
      message: adoptionFormData.message,

      status: "pending",
      createdAt: new Date(),
    };

    try {
      const res = await fetch(buildApiUrl("/adoption-requests"), {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(adoptionData),
      });

      const data = (await res.json().catch(() => null)) as {
        insertedId?: string;
        error?: string;
        message?: string;
      } | null;
      setLoading(false);

      if (res.ok && data?.insertedId) {
        toast.success("Adoption request sent! 🐾", { id: toastId });
        setIsSubmitted(true); // hide form
      } else {
        toast.error(data?.error || data?.message || "Something went wrong", {
          id: toastId,
        });
      }
    } catch {
      setLoading(false);
      toast.error("Network error. Please try again.", { id: toastId });
    }
  };

  if (isSubmitted) {
    return (
      <aside className="lg:col-span-4 lg:sticky lg:top-24">
        <div className="bg-card rounded-[24px] border border-border p-8 text-center shadow-sm">
          <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Request Sent Successfully</h2>
          <p className="text-muted-foreground">
            Your adoption request has been sent to the owner. You&apos;ll get a
            response soon.
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="lg:col-span-4 lg:sticky lg:top-24">
      <div className="bg-card rounded-[24px] border border-border p-6 md:p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-foreground mb-6">
          Adopt {pet.petName}
        </h2>

        <form onSubmit={handleAdopt} className="space-y-4">
          {/* PET NAME */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Pet Name
            </label>
            <input
              type="text"
              value={pet.petName}
              name="petName"
              readOnly
              className="w-full h-12 rounded-xl border border-border bg-muted px-4 text-muted-foreground outline-none"
            />
          </div>

          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={user?.name || ""}
              name="userName"
              readOnly
              className="w-full h-12 rounded-xl border border-border bg-background px-4 text-foreground outline-none focus:ring-2 focus:ring-ring focus:border-primary"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Your Email
            </label>
            <input
              type="text"
              value={user?.email || ""}
              name="userEmail"
              readOnly
              className="w-full h-12 rounded-xl border border-border bg-background px-4 text-foreground outline-none focus:ring-2 focus:ring-ring focus:border-primary"
            />
          </div>

          {/* DATE */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Pickup Date
            </label>
            <div className="relative">
              <input
                type="date"
                name="pickupDate"
                required
                className="w-full h-12 rounded-xl border border-border bg-background px-4 text-foreground outline-none focus:ring-2 focus:ring-ring focus:border-primary"
              />
              <CalendarDays className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* MESSAGE */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Message
            </label>
            <textarea
              rows={5}
              name="message"
              required
              placeholder={`Tell ${pet.ownerName || "the owner"} about your home and why you'd like to adopt ${pet.petName}...`}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none resize-none focus:ring-2 focus:ring-ring focus:border-primary"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full h-14 rounded-2xl"
          >
            {loading ? "Sending..." : "Send Adoption Request"}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Usually responds within 24 hours
          </p>
        </form>
      </div>
    </aside>
  );
};

export default PetDetailAdoptForm;
