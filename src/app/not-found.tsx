import { Home, PawPrint } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  const puppyImage =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDI8589hOsDqZiZNEC8bl8L2WUAfrD_6_B2K9fqsfp2wyX_tfbezP1JBugBHA_9cYR9rwgLT317GM39xZesmcnYjNrmE7G49Wr0KplkVA1Ti-GVrT-Pi2eADxuD_5ikr_ZMpvRRpnhPbmt_WIa6h8ZYp5FubCt-TyERTqpZzuf32y7ZWPQ4pUqEYibedXEyRoBkADuqJlEQ6a3bwbRETJzsrWAiVp_qpUi0D8QVoYDGMgFcuZgfqhFn_S7b7DbwzHBAaVmwPMCe52E";

  return (
    <main className="relative min-h-screen overflow-hidden bg-background flex items-center justify-center px-4 md:px-10 py-20">
      {/* Soft Background Glow */}
      <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-primary/5 pointer-events-none" />

      {/* Floating Polaroids */}
      <div className="absolute inset-0 z-10">
        {/* Left Card */}
        <div className="absolute top-[10%] left-[2%] sm:left-[5%] w-32 sm:w-44 md:w-56 bg-card p-3 shadow-[0_20px_50px_rgba(0,0,0,0.08)] -rotate-12 transition-all duration-500 hover:-rotate-6 hover:scale-105">
          <div className="relative w-full aspect-3/4 overflow-hidden rounded-sm">
            <Image
              src={puppyImage}
              alt="Lost Puppy"
              fill
              priority
              className="object-cover"
            />
          </div>

          <p className="text-[10px] sm:text-xs text-center text-muted-foreground mt-3 tracking-wide">
            lost_puppy_01.jpg
          </p>
        </div>

        {/* Right Bottom Card */}
        <div className="absolute bottom-[12%] right-[3%] sm:right-[8%] w-36 sm:w-48 md:w-64 bg-card p-3 shadow-[0_20px_60px_rgba(0,0,0,0.12)] rotate-[8deg] transition-all duration-500 hover:rotate-[4deg] hover:scale-105">
          <div className="relative w-full aspect-3/4 overflow-hidden rounded-sm">
            <Image
              src={puppyImage}
              alt="Lost Puppy"
              fill
              className="object-cover blur-[1px] hover:blur-0 transition-all duration-500"
            />
          </div>

          <p className="text-[10px] sm:text-xs text-center text-muted-foreground mt-3 tracking-wide">
            where_am_i.png
          </p>
        </div>

        {/* Background Blurred Card */}
        <div className="absolute top-[18%] right-[12%] hidden md:block w-44 bg-card p-3 shadow-xl -rotate-6 opacity-40 blur-[2px]">
          <div className="relative w-full aspect-3/4 overflow-hidden rounded-sm">
            <Image
              src={puppyImage}
              alt="Background Puppy"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Glass Card */}
      <div className="relative z-20 w-full max-w-xl">
        <div className="rounded-[40px] border border-border bg-white/40 dark:bg-black/20 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.08)] px-6 sm:px-10 py-10 sm:py-14 text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-primary/10 border border-primary/10 px-4 py-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              Error 404
            </span>
          </div>

          {/* Heading */}
          <h1
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-foreground"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Oh Paw-no!
            <br />
            We&apos;re a Little Lost.
          </h1>

          {/* Description */}
          <p className="mt-5 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-md mx-auto">
            The page you&apos;re looking for has wandered off the path.
            Don&apos;t worry, we&apos;ll help you find your way back to our
            furry friends.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Home
                size={18}
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />
              Return Home
            </Link>

            <Link
              href="/all-pets"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/80 backdrop-blur-md px-6 py-3 text-sm font-semibold text-foreground hover:bg-primary/5 transition-all duration-300"
            >
              <PawPrint
                size={18}
                className="transition-transform duration-300 group-hover:rotate-12"
              />
              Browse Pets
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Floating Dock */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <div className="flex items-center gap-3 rounded-full border border-border bg-card/70 backdrop-blur-2xl px-4 py-3 shadow-[0_15px_40px_rgba(0,0,0,0.12)]">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <PawPrint size={16} className="text-primary" />
            Lost in the shelter?
          </div>

          <div className="w-px h-6 bg-border" />

          <Link
            href="/"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
