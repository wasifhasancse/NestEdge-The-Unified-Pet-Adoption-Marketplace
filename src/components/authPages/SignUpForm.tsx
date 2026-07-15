"use client";

import NestEdgeLogo from "@/components/ui/NestEdgeLogo";
import { authClient } from "@/lib/auth-client";
import {
    Eye,
    EyeOff,
    ImageIcon,
    Lock,
    Mail,
    PawPrint,
    User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignUpForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/";

  const handleSocialSignUp = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: redirect,
    });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    const name = userData.name as string;
    const email = userData.email as string;
    const photo = userData.photo as string;
    const password = userData.password as string;
    const confirmPassword = userData.confirmPassword as string;

    setError("");

    // PASSWORD VALIDATION
    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    if (!/[A-Z]/.test(password)) {
      return setError("Password must contain at least one uppercase letter.");
    }

    if (!/[a-z]/.test(password)) {
      return setError("Password must contain at least one lowercase letter.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    const { error: signUpError } = await authClient.signUp.email({
      email,
      password,
      name,
      image: photo, // Better Auth uses 'image' instead of 'photo'
    });
    if (signUpError) {
      setError(signUpError.message || "Register failed");
      toast.error(signUpError.message || "Register failed");
    } else {
      setError("");
      router.push(redirect);
      toast.success("Register successful");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-4 py-10 sm:py-14 lg:py-16">
      <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-2 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-border/80 bg-card/90 shadow-xl backdrop-blur xl:grid-cols-[1.05fr_1fr]">
        <aside className="hidden border-r border-border/70 bg-secondary/40 p-10 xl:flex xl:flex-col xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              Join NestEdge
            </p>
            <h2
              className="mt-4 text-4xl font-bold leading-tight text-foreground"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Create your account and start changing lives today.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Build your profile, list pets for adoption, and discover caring
              families with a smooth and secure experience.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-card p-2 shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1580144971870-8eca5944f022"
              alt="Dog and Cat"
              width={720}
              height={520}
              className="h-72 w-full rounded-xl object-cover"
              priority
            />
          </div>
        </aside>

        <section className="w-full px-5 py-8 sm:px-8 md:px-10 md:py-10">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-7 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
                <NestEdgeLogo className="h-9 w-9" />
              </div>

              <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
                Create Your Account
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Join NestEdge and start your adoption journey.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                    className="h-11.5 w-full rounded-xl border border-border bg-input-background pl-12 pr-4 text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    placeholder="user@email.com"
                    required
                    className="h-11.5 w-full rounded-xl border border-border bg-input-background pl-12 pr-4 text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Photo URL
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="url"
                    name="photo"
                    placeholder="Enter photo URL"
                    required
                    className="h-11.5 w-full rounded-xl border border-border bg-input-background pl-12 pr-4 text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    required
                    className="h-11.5 w-full rounded-xl border border-border bg-input-background pl-12 pr-12 text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-ring"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-primary"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeOff className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    required
                    className="h-11.5 w-full rounded-xl border border-border bg-input-background pl-12 pr-12 text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-ring"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-primary"
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPassword ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeOff className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && <p className="text-sm font-medium text-destructive">{error}</p>}

              <button
                type="submit"
                className="mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-md transition hover:opacity-90"
              >
                REGISTER NOW
                <PawPrint className="h-4 w-4" fill="currentColor" />
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Or register with
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="flex justify-center gap-4">
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-transparent bg-[#1877F2] text-white shadow-sm transition hover:scale-105"
                aria-label="Continue with Facebook"
                title="Continue with Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={handleSocialSignUp}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card shadow-sm transition hover:bg-muted"
                aria-label="Continue with Google"
                title="Continue with Google"
              >
                <FcGoogle className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-7 text-center">
              <p className="text-sm text-foreground">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-semibold text-primary transition hover:underline"
                >
                  Login Here
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SignUpForm;
