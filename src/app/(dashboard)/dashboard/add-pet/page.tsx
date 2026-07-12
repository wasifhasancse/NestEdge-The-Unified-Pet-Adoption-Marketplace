import AddPetForm from "@/components/dashboard/AddPetForm";
import React from "react";

export const metadata = {
  title: "Add Pet | NestEdge",
  description:
    "Add a new pet for adoption on NestEdge. Share pet details, images, and adoption information to help pets find a loving home.",
};

const AddPetPage: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="mb-8 space-y-3">
        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          Pet Adoption Dashboard
        </span>

        <h2
          className="text-3xl md:text-4xl font-bold tracking-tight leading-tight"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Add a New Pet
          <span className="text-primary"> Listing</span>
        </h2>

        <p className="max-w-2xl text-muted-foreground text-base leading-relaxed">
          Fill in your pet&apos;s information including breed, health, vaccination
          status, adoption fee, and location to help potential adopters learn
          more before sending a request.
        </p>
      </div>

      <AddPetForm />
      <div className="pointer-events-none fixed -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none fixed top-32 left-24 h-72 w-72 rounded-full bg-chart-2/10 blur-[100px]" />
    </section>
  );
};

export default AddPetPage;
