import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About NestEdge",
  description:
    "Learn about NestEdge, our mission, and how we help pets find safe, loving homes.",
};

const highlights = [
  {
    title: "Trusted listings",
    description:
      "Every pet profile is designed to make adoption decisions easier and more transparent.",
  },
  {
    title: "Human-centered adoption",
    description:
      "We focus on the matching experience so families and pets can start with clarity and confidence.",
  },
  {
    title: "Guided support",
    description:
      "From discovery to request submission, NestEdge keeps the process simple on every screen.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            About NestEdge
          </span>

          <h1
            className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            A calmer way to discover your next best friend.
          </h1>

          <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            NestEdge brings together pet discovery, adoption requests, and owner
            communication in one focused experience. The goal is simple: help
            more pets move into safe homes with less friction.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/all-pets" className="btn-primary">
              Browse Pets
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="rounded-[32px] border border-border bg-card p-6 shadow-xl shadow-black/5 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-border bg-muted/40 p-5"
              >
                <h2 className="text-lg font-bold text-foreground">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
