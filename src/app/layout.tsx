import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Provider } from "./providers/Provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NestEdge | Premium Pet Adoption",
    template: "%s | NestEdge",
  },
  description:
    "Discover adoptable pets, connect with trusted shelters, and complete a safe, guided adoption journey.",
  keywords: [
    "pet adoption",
    "rescue pets",
    "adopt dogs",
    "adopt cats",
    "NestEdge",
  ],
  openGraph: {
    title: "NestEdge | Premium Pet Adoption",
    description:
      "Find your ideal companion with verified pet profiles and a guided adoption process.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-foreground`}
      >
        <div className="relative isolate min-h-screen overflow-x-hidden">
          <div
            aria-hidden
            className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-95 bg-[radial-gradient(ellipse_at_top,rgba(13,148,136,0.14),transparent_65%)]"
          />
          <Provider>{children}</Provider>
        </div>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "var(--card)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
              borderRadius: "1rem",
              padding: "12px 20px",
              fontSize: "0.9rem",
              fontWeight: "500",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              maxWidth: "420px",
            },
            success: {
              iconTheme: {
                primary: "var(--primary)",
                secondary: "var(--primary-foreground)",
              },
            },
            error: {
              iconTheme: {
                primary: "var(--destructive)",
                secondary: "var(--destructive-foreground)",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
