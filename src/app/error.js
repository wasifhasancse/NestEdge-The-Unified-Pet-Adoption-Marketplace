"use client";

import { useRouter } from "next/navigation";
import { Home, RefreshCcw } from "lucide-react";

export default function ErrorPage({
  title = "Something went wrong",
  message = "The page you're looking for doesn't exist or an unexpected error occurred.",
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-6">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="text-7xl mb-6">🐾</div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-3">
          {title}
        </h1>

        {/* Message */}
        <p className="text-[var(--muted-foreground)] mb-8">
          {message}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="bg-[var(--primary)] hover:opacity-90 text-[var(--primary-foreground)] flex items-center gap-2 rounded-xl px-5"
          >
            <Home size={18} />
            Home
          </button>

          <button
            onClick={() => window.location.reload()}
            className="border-border text-[var(--foreground)] hover:bg-[var(--muted)] flex items-center gap-2 rounded-xl px-5"
          >
            <RefreshCcw size={18} />
            Retry
          </button>
        </div>

        {/* subtle footer */}
        <p className="text-xs text-muted-foreground mt-10">
          PetAdopt — finding companions with love 🐶
        </p>
      </div>
    </div>
  );
}
