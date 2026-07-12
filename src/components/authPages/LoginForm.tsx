"use client";

import Image from "next/image";
import { PawPrint, Mail, Lock, EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import NestEdgeLogo from "@/components/ui/NestEdgeLogo";

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/";

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    const email = userData.email as string;
    const password = userData.password as string;

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
      callbackURL: redirect,
      rememberMe: false,
    });
    
    if (signInError) {
      setError(signInError.message || "Login failed");
      toast.error(signInError.message || "Login failed");
    } else {
      setError("");
      toast.success("Login successful");
    }
  };

  const handleSocialSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: redirect,
    });
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-xl border border-border bg-card shadow-xl flex flex-col md:flex-row">
        {/* LEFT SIDE */}
        <div className="hidden md:flex md:w-1/2 bg-secondary p-10 flex-col items-center justify-between">
          <div className="text-center">
            <p className="text-xs tracking-[3px] uppercase text-primary font-semibold mb-3">
              Welcome Back To NestEdge!
            </p>

            <h2
              className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Login to <br /> meet your new <br />
              <span className="text-primary"> best friend!</span>
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
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shadow-md">
              <NestEdgeLogo className="w-10 h-10" />
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-wide text-foreground">
              LOG IN
            </h2>

            <p className="text-sm text-muted-foreground mt-1">NestEdge Adoption</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="user@email.com"
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
                  placeholder="••••••••••••"
                  name="password"
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
            {/* ERROR MESSAGE */}
            {error && (
              <p className="text-sm text-destructive font-medium">{error}</p>
            )}

            {/* FORGOT PASSWORD */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-primary hover:underline cursor-pointer bg-transparent border-none outline-none"
              >
                Forgot Password?
              </button>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full h-12 rounded-full cursor-pointer bg-primary hover:opacity-90 text-primary-foreground font-bold tracking-wide shadow-md transition-all duration-200 flex items-center justify-center gap-2"
            >
              LOG IN NOW
              <PawPrint className="w-4 h-4" fill="currentColor" />
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-border" />

            <span className="text-xs text-muted-foreground whitespace-nowrap">
              OR LOG IN WITH
            </span>

            <div className="flex-1 h-px bg-border" />
          </div>

          {/* SOCIAL LOGIN */}
          <div className="flex justify-center gap-5">
            {/* FACEBOOK */}
            <button className="w-12 h-12 rounded-full cursor-pointer bg-[#1877F2] flex items-center justify-center shadow-md hover:scale-105 transition-transform">
              <FaFacebook className="w-5 h-5 fill-white" />
            </button>

            {/* GOOGLE */}
            <button
              type="button"
              onClick={handleSocialSignIn}
              className="w-12 h-12 rounded-full cursor-pointer bg-[#ffffff] border border-border flex items-center justify-center shadow-sm hover:bg-muted transition-colors"
            >
              <FcGoogle className="w-5 h-5" />
            </button>
          </div>

          {/* SIGNUP */}
          <div className="text-center mt-10">
            <p className="text-sm text-foreground">
              New to NestEdge?{" "}
              <Link
                href="/register"
                className="text-primary font-semibold hover:underline cursor-pointer"
              >
                Register Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
