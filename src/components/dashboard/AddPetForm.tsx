"use client";

import { buildApiUrl } from "@/lib/api-url";
import { AlertCircle, PawPrint } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface AddPetFormProps {
  ownerEmail: string;
  ownerName: string;
  token: string;
}

const AddPetForm: React.FC<AddPetFormProps> = ({
  ownerEmail,
  ownerName,
  token,
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!ownerEmail || !token) {
    return (
      <div className="rounded-[28px] border border-amber-500/20 bg-amber-500/8 p-6 text-left shadow-sm">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-amber-500/15 p-2 text-amber-600">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Sign in to add a listing
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Your account session is required before a new pet can be listed.
              Once you&apos;re signed in, this form will submit directly to the
              adoption API.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading("Creating pet listing...");

    const formData = new FormData(event.currentTarget);
    const petData = {
      petName: String(formData.get("petName") || "").trim(),
      breed: String(formData.get("breed") || "").trim(),
      species: String(formData.get("species") || "").trim(),
      age: Number(formData.get("age") || 0),
      gender: String(formData.get("gender") || "").trim(),
      adoptionFee: Number(formData.get("adoptionFee") || 0),
      healthStatus: String(formData.get("healthStatus") || "").trim(),
      image: String(formData.get("image") || "").trim(),
      location: String(formData.get("location") || "").trim(),
      description: String(formData.get("description") || "").trim(),
      status: "available",
      ownerEmail,
      ownerName,
    };

    try {
      const response = await fetch(buildApiUrl("/pets"), {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(petData),
      });

      if (!response.ok) {
        throw new Error("Failed to create pet listing");
      }

      event.currentTarget.reset();
      toast.success("Pet listing created successfully.", { id: toastId });
      router.refresh();
      router.push("/dashboard/my-listings");
    } catch {
      toast.error("Unable to create the pet listing right now.", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[28px] border border-border/70 bg-card/95 p-6 md:p-8 shadow-sm backdrop-blur"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Pet Name">
          <input
            name="petName"
            required
            placeholder="Milo"
            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>

        <Field label="Breed">
          <input
            name="breed"
            required
            placeholder="Golden Retriever"
            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>

        <Field label="Species">
          <select
            name="species"
            required
            defaultValue=""
            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="" disabled>
              Select species
            </option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Other">Other</option>
          </select>
        </Field>

        <Field label="Gender">
          <select
            name="gender"
            required
            defaultValue=""
            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </Field>

        <Field label="Age (years)">
          <input
            type="number"
            min="0"
            step="1"
            name="age"
            required
            placeholder="2"
            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>

        <Field label="Adoption Fee">
          <input
            type="number"
            min="0"
            step="1"
            name="adoptionFee"
            required
            placeholder="150"
            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>

        <Field label="Health Status">
          <input
            name="healthStatus"
            required
            placeholder="Vaccinated and dewormed"
            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>

        <Field label="Location">
          <input
            name="location"
            required
            placeholder="Dhaka, Bangladesh"
            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>

        <Field label="Image URL" className="md:col-span-2">
          <input
            type="url"
            name="image"
            required
            placeholder="https://example.com/pet.jpg"
            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>

        <Field label="Description" className="md:col-span-2">
          <textarea
            name="description"
            rows={6}
            placeholder="Share temperament, habits, diet, and anything adopters should know."
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-border/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Listing as{" "}
          <span className="font-medium text-foreground">{ownerName}</span>
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <PawPrint className="h-4 w-4" />
          {isSubmitting ? "Publishing..." : "Publish Listing"}
        </button>
      </div>
    </form>
  );
};

interface FieldProps {
  label: string;
  className?: string;
  children: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ label, className = "", children }) => {
  return (
    <label className={`block space-y-2 ${className}`.trim()}>
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
};

export default AddPetForm;
