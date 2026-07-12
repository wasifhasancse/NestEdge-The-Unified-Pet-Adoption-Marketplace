import React from "react";

interface NestEdgeLogoProps {
  className?: string;
}

export const NestEdgeLogo: React.FC<NestEdgeLogoProps> = ({ className = "w-12 h-12" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      
      {/* Outer geometric hexagon representing 'Edge' */}
      <path
        d="M50 6 L88 28 L88 72 L50 94 L12 72 L12 28 Z"
        stroke="url(#logo-grad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.05"
      />
      
      {/* Inner house silhouette representing 'Nest' */}
      <path
        d="M32 55 L50 37 L68 55 L68 75 C68 77 66 79 64 79 L36 79 C34 79 32 77 32 75 Z"
        stroke="url(#logo-grad)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Pet paw footprint detail inside the home */}
      <circle cx="50" cy="54" r="6" fill="url(#logo-grad)" />
      <circle cx="41" cy="44" r="3.5" fill="url(#logo-grad)" />
      <circle cx="59" cy="44" r="3.5" fill="url(#logo-grad)" />
      <circle cx="36" cy="53" r="3" fill="url(#logo-grad)" />
      <circle cx="64" cy="53" r="3" fill="url(#logo-grad)" />
    </svg>
  );
};

export default NestEdgeLogo;
