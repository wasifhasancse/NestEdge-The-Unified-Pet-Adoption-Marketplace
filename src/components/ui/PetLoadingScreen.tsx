"use client";

import { useEffect, useState } from "react";
import { PawPrint } from "lucide-react";
import Image from "next/image";
import React from "react";

export const PetLoadingScreen: React.FC = () => {
  const statuses = [
    "Checking local shelters...",
    "Matching your personality...",
    "Preparing the welcome mat...",
    "Waking up the puppies...",
    "Finalizing your matches...",
  ];

  const [progress, setProgress] = useState<number>(0);
  const [statusIndex, setStatusIndex] = useState<number>(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const updateLoading = () => {
      setProgress((prev) => {
        const next = Math.min(prev + Math.random() * 15, 100);

        if (Math.random() > 0.7) {
          setStatusIndex((current) => (current + 1) % statuses.length);
        }

        if (next < 100) {
          timeout = setTimeout(updateLoading, 400 + Math.random() * 800);
        }

        return next;
      });
    };

    timeout = setTimeout(updateLoading, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-10 text-center text-foreground transition-colors duration-300">
      {/* Background Grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02] bg-[url('/noise.png')] dark:opacity-[0.04]" />

      {/* Content Container */}
      <div className="relative z-10 flex w-full max-w-xl flex-col items-center">
        {/* Paw Icon Section */}
        <div className="mb-8 relative flex items-center justify-center">
          {/* Animated Glow */}
          <div className="absolute h-28 w-28 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20" />

          {/* Icon Wrapper */}
          <div className="relative animate-pulse">
            <PawPrint
              className="h-14 w-14 md:h-16 md:w-16 text-primary fill-primary"
              strokeWidth={1.8}
            />
          </div>
        </div>

        {/* Heading & Subtext */}
        <div className="space-y-3">
          <h1 className="text-[2rem] md:text-[3rem] font-bold tracking-tight text-foreground leading-tight">
            Just a Moment...
          </h1>

          <p className="mx-auto max-w-sm text-sm md:text-base text-muted-foreground">
            We&apos;re finding your perfect companion.
          </p>
        </div>

        {/* Progress Tracker Section */}
        <div className="mt-12 flex w-full flex-col items-center">
          {/* Progress Track */}
          <div className="relative h-[4px] w-[220px] overflow-hidden rounded-full bg-secondary md:w-[260px]">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all duration-500 ease-out shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Status Label & Bouncing Indicators */}
          <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:gap-2">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium min-h-[16px]">
              {progress >= 100 ? "Ready to meet your match" : statuses[statusIndex]}
            </span>

            {/* Loading Dots */}
            <div className="flex gap-1.5 items-center h-3">
              <span
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"
                style={{ animationDelay: "0s" }}
              />
              <span
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"
                style={{ animationDelay: "0.2s" }}
              />
              <span
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
          </div>
        </div>

        {/* Themed Accent Bottom Image */}
        <div className="mt-16 opacity-15 transition-all duration-700 hover:opacity-40">
          <div className="relative h-40 w-40 overflow-hidden rounded-full border border-border grayscale md:h-52 md:w-52 shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1200&auto=format&fit=crop"
              alt="Dog"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PetLoadingScreen;
