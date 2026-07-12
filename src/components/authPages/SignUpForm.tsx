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
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl overflow-hidden rounded-xl border border-border bg-card shadow-xl flex flex-col md:flex-row">
        {/* LEFT SIDE */}
        <div className="hidden md:flex md:w-1/2 bg-secondary p-10 flex-col items-center justify-between">
          <div className="text-center">
            <p className="text-xs tracking-[3px] uppercase text-primary font-semibold mb-3">
              Welcome To NestEdge!
            </p>

            <h2
              className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Create your <br /> account and <br />
              <span className="text-primary"> adopt happiness!</span>
            </h2>
          </div>

          <div className="mt-10 w-full max-w-87.5">
            <Image
              src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1200&auto=format&fit=crop"
              alt="Dog and Cat"
              width={500}
              height={500}
              className="w-full h-auto rounded-md object-cover"
              priority
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 bg-background px-8 md:px-14 py-10 flex flex-col justify-center">
          {/* LOGO */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shadow-md">
              <NestEdgeLogo className="w-10 h-10" />
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-wide text-foreground">
              REGISTER
            </h2>

            <p className="text-sm text-muted-foreground mt-1">
              NestEdge Adoption
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* NAME */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Name
              </label>

              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                  className="w-full h-12 rounded-lg border border-border bg-input-background pl-12 pr-4 text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-ring focus:border-primary"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                <input
                  type="email"
                  name="email"
                  placeholder="user@email.com"
                  required
                  className="w-full h-12 rounded-lg border border-border bg-input-background pl-12 pr-4 text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-ring focus:border-primary"
                />
              </div>
            </div>

            {/* PHOTO URL */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Photo URL
              </label>

              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                <input
                  type="url"
                  name="photo"
                  placeholder="Enter photo URL"
                  required
                  className="w-full h-12 rounded-lg border border-border bg-input-background pl-12 pr-4 text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-ring focus:border-primary"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  required
                  className="w-full h-12 rounded-lg border border-border bg-input-background pl-12 pr-12 text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-ring focus:border-primary"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary cursor-pointer"
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  required
                  className="w-full h-12 rounded-lg border border-border bg-input-background pl-12 pr-12 text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-ring focus:border-primary"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <p className="text-sm text-destructive font-medium">{error}</p>
            )}

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              className="w-full h-12 rounded-full cursor-pointer bg-primary hover:opacity-90 text-primary-foreground font-bold tracking-wide shadow-md transition-all duration-200 flex items-center justify-center gap-2 mt-2"
            >
              REGISTER NOW
              <PawPrint className="w-4 h-4" fill="currentColor" />
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-border" />

            <span className="text-xs text-muted-foreground whitespace-nowrap">
              OR REGISTER WITH
            </span>

            <div className="flex-1 h-px bg-border" />
          </div>

          {/* SOCIAL LOGIN */}
          <div className="flex justify-center gap-5">
            {/* FACEBOOK */}
            <button className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center shadow-md hover:scale-105 transition-transform">
              <FaFacebook className="w-5 h-5 fill-white" />
            </button>

            {/* GOOGLE */}
            <button className="w-12 h-12 rounded-full bg-[#ffffff] border border-border flex items-center justify-center shadow-sm hover:bg-muted transition-colors">
              <FcGoogle className="w-5 h-5" />
            </button>
          </div>

          {/* LOGIN LINK */}
          <div className="text-center mt-8">
            <p className="text-sm text-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-semibold hover:underline"
              >
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUpForm;
