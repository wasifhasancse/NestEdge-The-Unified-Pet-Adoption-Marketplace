"use client";

import { buildApiUrl } from "@/lib/api-url";
import { Pet } from "@/types";
import { PawPrint, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface UpdatePetFormProps {
  pet: Pet;
  token: string;
}

type PetFormState = {
  petName: string;
  breed: string;
  species: string;
  age: string;
  gender: string;
  adoptionFee: string;
  healthStatus: string;
  image: string;
  location: string;
  description: string;
  status: string;
};

const UpdatePetForm: React.FC<UpdatePetFormProps> = ({ pet, token }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<PetFormState>({
    petName: pet.petName || "",
    breed: pet.breed || "",
    species: pet.species || "",
    age: String(pet.age ?? ""),
    gender: pet.gender || "",
    adoptionFee: String(pet.adoptionFee ?? ""),
    healthStatus: pet.healthStatus || "",
    image: pet.image || "",
    location: pet.location || "",
    description: pet.description || "",
    status: pet.status || "available",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) {
      toast.error("Your session has expired. Please sign in again.");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Updating pet listing...");

    try {
      const payload = {
        ...formState,
        age: Number(formState.age),
        adoptionFee: Number(formState.adoptionFee),
      };

      const response = await fetch(buildApiUrl(`/pets/${pet._id}`), {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
          message?: string;
        } | null;
        throw new Error(
          data?.error || data?.message || "Failed to update the pet listing",
        );
      }

      toast.success("Pet listing updated successfully.", { id: toastId });
      router.push("/dashboard/my-listings");
      router.refresh();
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to update the pet listing right now.";
      toast.error(message, { id: toastId });
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
            value={formState.petName}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>

        <Field label="Breed">
          <input
            name="breed"
            required
            value={formState.breed}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>

        <Field label="Species">
          <input
            name="species"
            required
            value={formState.species}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>

        <Field label="Gender">
          <select
            name="gender"
            value={formState.gender}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
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
            value={formState.age}
            onChange={handleChange}
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
            value={formState.adoptionFee}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>

        <Field label="Health Status">
          <input
            name="healthStatus"
            required
            value={formState.healthStatus}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>

        <Field label="Status">
          <select
            name="status"
            value={formState.status}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="available">Available</option>
            <option value="adopted">Adopted</option>
          </select>
        </Field>

        <Field label="Location" className="md:col-span-2">
          <input
            name="location"
            required
            value={formState.location}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>

        <Field label="Image URL" className="md:col-span-2">
          <input
            type="url"
            name="image"
            required
            value={formState.image}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>

        <Field label="Description" className="md:col-span-2">
          <textarea
            rows={6}
            name="description"
            value={formState.description}
            onChange={handleChange}
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-border/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Update your listing details before new adopters view this pet.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <PawPrint className="h-4 w-4" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isSubmitting ? "Saving..." : "Save Changes"}
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

export default UpdatePetForm;
