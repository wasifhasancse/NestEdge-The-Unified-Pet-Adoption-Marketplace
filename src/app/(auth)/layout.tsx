import Link from "next/link";
import NestEdgeLogo from "@/components/ui/NestEdgeLogo";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold hover:text-primary transition-colors text-foreground"
        >
          <NestEdgeLogo className="w-10 h-10" />
          <span style={{ fontFamily: "var(--font-poppins)" }}>NestEdge</span>
        </Link>
      </div>
      {children}
    </div>
  );
}
