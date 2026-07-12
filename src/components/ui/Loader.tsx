import React from "react";

interface PawIconProps {
  className?: string;
}

const PawIcon: React.FC<PawIconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Main paw pad */}
    <ellipse cx="12" cy="15" rx="4.5" ry="3.5" />
    {/* Toes */}
    <ellipse cx="7.5" cy="11" rx="1.8" ry="2.2" />
    <ellipse cx="10.5" cy="9" rx="1.8" ry="2.2" />
    <ellipse cx="13.5" cy="9" rx="1.8" ry="2.2" />
    <ellipse cx="16.5" cy="11" rx="1.8" ry="2.2" />
  </svg>
);

interface LoaderProps {
  size?: "inline" | "section" | "page";
  label?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = "section", label = "Loading..." }) => {
  if (size === "inline") {
    return (
      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
        <span className="relative inline-flex h-5 w-5">
          {/* Spinning ring */}
          <span className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
          {/* Paw in center */}
          <PawIcon className="absolute inset-0.5 text-primary" />
        </span>
        {label && <span>{label}</span>}
      </span>
    );
  }

  if (size === "page") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
        <LoaderCore />
      </div>
    );
  }

  // "section" (default)
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] w-full">
      <LoaderCore />
    </div>
  );
};

const LoaderCore: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      {/* Outer ring + paw */}
      <div className="relative flex items-center justify-center w-20 h-20">
        {/* Animated gradient ring */}
        <span
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            background: "conic-gradient(from 0deg, transparent 70%, var(--primary) 100%)",
            borderRadius: "9999px",
            padding: "3px",
          }}
        >
          <span className="block w-full h-full rounded-full bg-background" />
        </span>

        {/* Static outer track */}
        <span className="absolute inset-0 rounded-full border-4 border-primary/10" />

        {/* Paw icon in center */}
        <PawIcon className="relative z-10 w-9 h-9 text-primary drop-shadow-sm" />
      </div>

      {/* Bouncing dots */}
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>

      <p className="text-sm font-medium text-muted-foreground tracking-wide">
        Loading<span className="animate-pulse">...</span>
      </p>
    </div>
  );
};

export default Loader;
