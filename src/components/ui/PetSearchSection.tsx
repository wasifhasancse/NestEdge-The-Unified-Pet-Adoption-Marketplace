"use client";

import {
  Search,
  FilterX,
  PawPrint,
  Calendar,
  VenusAndMars,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PetSearchSection: React.FC = () => {
  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const [species, setSpecies] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  // SINGLE SOURCE OF TRUTH FOR QUERY
  const buildAndPush = (next: { search?: string; species?: string; age?: string; gender?: string } = {}) => {
    const params = new URLSearchParams();

    const finalSearch = next.search ?? search;
    const finalSpecies = next.species ?? species;
    const finalAge = next.age ?? age;
    const finalGender = next.gender ?? gender;

    if (finalSearch) params.set("search", finalSearch);
    if (finalSpecies) params.set("species", finalSpecies);
    if (finalAge) params.set("age", finalAge);
    if (finalGender) params.set("gender", finalGender);

    router.push(`/all-pets?${params.toString()}`);
  };

  const handleSearch = () => {
    buildAndPush();
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-background to-muted/30 py-15 md:py-20">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]" />
      <div className="absolute -top-40 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-[128px]" />

      <div className="max-w-5xl mx-auto px-4">
        {/* HEADING */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground bg-clip-text">
            Find Your New{" "}
            <span className="block bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Companion
            </span>
          </h1>
          <p className="max-w-md mx-auto text-base md:text-lg text-muted-foreground font-medium">
            Browse through hundreds of adorable pets waiting for a cozy NestEdge home.
          </p>
        </div>

        {/* MAIN CONTAINER */}
        <div className="bg-card/70 backdrop-blur-md border border-border/80 shadow-xl shadow-foreground/5 rounded-3xl p-5 md:p-8 space-y-6">
          {/* SEARCH BAR ROW */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                placeholder="Search pets by name or breed..."
                className="w-full h-14 pl-12 pr-4 rounded-2xl border border-border bg-background shadow-inner transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-muted-foreground/70"
              />
            </div>

            <button
              onClick={handleSearch}
              className="h-14 px-8 font-semibold rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/95 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>

          {/* FILTER ROW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* SPECIES OPTION */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/90 pl-1">
                Species
              </label>
              <div className="relative">
                <PawPrint className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/80 pointer-events-none" />
                <select
                  value={species}
                  onChange={(e) => {
                    setSpecies(e.target.value);
                    buildAndPush({ species: e.target.value });
                  }}
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-background shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium text-sm text-foreground transition-all cursor-pointer"
                >
                  <option value="">All Species</option>
                  <option value="Dog">Dog 🐕</option>
                  <option value="Cat">Cat 🐈</option>
                  <option value="Rabbit">Rabbit 🐇</option>
                  <option value="Bird">Bird 🦜</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-muted-foreground" />
              </div>
            </div>

            {/* AGE OPTION */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/90 pl-1">
                Age
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/80 pointer-events-none" />
                <select
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                    buildAndPush({ age: e.target.value });
                  }}
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-background shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium text-sm text-foreground transition-all cursor-pointer"
                >
                  <option value="">Any Age</option>
                  <option value="baby">Baby (0-1 year)</option>
                  <option value="young">Young (2-5 years)</option>
                  <option value="adult">Adult (6-15 years)</option>
                  <option value="senior">Senior (16+ years)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-muted-foreground" />
              </div>
            </div>

            {/* GENDER OPTION */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/90 pl-1">
                Gender
              </label>
              <div className="relative">
                <VenusAndMars className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/80 pointer-events-none" />
                <select
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                    buildAndPush({ gender: e.target.value });
                  }}
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-background shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium text-sm text-foreground transition-all cursor-pointer"
                >
                  <option value="">Any Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-muted-foreground" />
              </div>
            </div>
          </div>

          {/* ACTION ACTIONS BOTTOM */}
          <div className="flex items-center justify-between border-t border-border/60 pt-4 mt-2">
            <span className="text-xs font-medium text-muted-foreground hidden sm:inline-block">
              *Filters apply immediately on change
            </span>
            <button
              onClick={() => {
                setSearch("");
                setSpecies("");
                setAge("");
                setGender("");
                router.push("/all-pets");
              }}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-destructive hover:text-destructive/80 transition-colors ml-auto sm:ml-0 group py-1 cursor-pointer bg-transparent border-none outline-none"
            >
              <FilterX className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetSearchSection;
