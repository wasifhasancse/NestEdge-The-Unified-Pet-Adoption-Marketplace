import React from "react";

export const OwnerWarningCard: React.FC = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card text-card-foreground p-6 text-center shadow-sm">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v4m0 4h.01M10.29 3.86l-8.3 14.29A1.5 1.5 0 003.3 20h17.4a1.5 1.5 0 001.3-2.25l-8.3-14.29a1.5 1.5 0 00-2.6 0z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-card-foreground">
          This is your listing
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-muted-foreground mt-2">
          You cannot request adoption for your own pet.
        </p>

        {/* Optional accent line */}
        <div className="mt-4 flex justify-center">
          <div className="h-1 w-16 rounded-full bg-primary/30"></div>
        </div>
      </div>
    </div>
  );
};

export default OwnerWarningCard;
