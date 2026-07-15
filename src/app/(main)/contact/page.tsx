import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact NestEdge",
  description:
    "Contact the NestEdge team for support, collaboration, or adoption-related questions.",
};

const contactPoints = [
  {
    label: "Email",
    value: "hello@nestedge.app",
  },
  {
    label: "Support",
    value: "Available 7 days a week",
  },
  {
    label: "Response time",
    value: "Usually within 24 hours",
  },
];

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <section className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            Contact NestEdge
          </span>

          <h1
            className="max-w-xl text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Questions, feedback, or adoption help. We are here.
          </h1>

          <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Reach out if you need help with an adoption request, want to report
            a listing issue, or just need guidance using the platform.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/blogs" className="btn-secondary">
              Read Blogs
            </Link>
            <Link href="/about" className="btn-primary">
              About Us
            </Link>
          </div>
        </div>

        <div className="rounded-[32px] border border-border bg-card p-6 shadow-xl shadow-black/5 sm:p-8">
          <div className="space-y-4">
            {contactPoints.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-1 rounded-2xl border border-border bg-muted/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {item.label}
                </span>
                <span className="text-base font-medium text-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl bg-primary/10 p-5">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Need urgent help?
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/80">
              Use the support form or email us and we will point you to the
              right team.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
