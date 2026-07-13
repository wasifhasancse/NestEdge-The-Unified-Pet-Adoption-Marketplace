"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import type { UserProfile } from "@/types";
import {
  User,
  Phone,
  MapPin,
  FileText,
  Sparkles,
  Camera,
  Save,
  ShieldCheck,
  Heart,
  Lock,
} from "lucide-react";
import { Loader } from "@/components/ui/Loader";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import toast from "react-hot-toast";
import Image from "next/image";

type ProfileFormState = Required<
  Pick<
    UserProfile,
    | "name"
    | "phoneNumber"
    | "location"
    | "bio"
    | "experience"
    | "facebook"
    | "instagram"
  >
> & {
  image: string;
};

const defaultProfile: ProfileFormState = {
  name: "",
  image: "",
  phoneNumber: "",
  location: "",
  bio: "",
  experience: "Experienced Owner",
  facebook: "",
  instagram: "",
};

export default function ProfilePage() {
  const { data: session, isPending: isSessionLoading } =
    authClient.useSession();
  const [profile, setProfile] = useState<ProfileFormState>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!session?.user) {
      return;
    }

    let isActive = true;

    fetch("/api/profile")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load profile");
        return res.json() as Promise<Partial<UserProfile>>;
      })
      .then((data) => {
        if (!isActive) {
          return;
        }

        setProfile({
          name: data.name || session.user.name || "",
          image: data.image || session.user.image || "",
          phoneNumber: data.phoneNumber || "",
          location: data.location || "",
          bio: data.bio || "",
          experience: data.experience || "Experienced Owner",
          facebook: data.facebook || "",
          instagram: data.instagram || "",
        });
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        if (!isActive) {
          return;
        }

        console.error(err);
        setProfile((prev) => ({
          ...prev,
          name: session.user.name || "",
          image: session.user.image || "",
        }));
        setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [session]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const toastId = toast.loading("Updating your profile...");

    try {
      // 1. Update database custom profile fields
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update profile");
      }

      // 2. Synchronize standard session details (name, image) with Better Auth client
      await authClient.updateUser({
        name: profile.name,
        image: profile.image,
      });

      toast.success("Profile updated successfully! ✨", { id: toastId });
    } catch (error: unknown) {
      console.error(error);
      const message =
        error instanceof Error
          ? error.message
          : "Failed to save profile updates";
      toast.error(message, { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };

  if (isSessionLoading || (session?.user && isLoading)) {
    return <Loader size="section" />;
  }

  if (!session) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center p-6 space-y-4">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
          <Lock className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Access Denied</h3>
        <p className="text-muted-foreground max-w-sm">
          Please log in to view and manage your profile settings.
        </p>
      </div>
    );
  }

  const role =
    typeof (session.user as { role?: unknown }).role === "string"
      ? (session.user as { role?: string }).role
      : "User";

  return (
    <div className="space-y-8 bg-background text-foreground pb-12">
      {/* Background ambient blurs */}
      <div className="pointer-events-none fixed top-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-[120px] -z-10" />
      <div className="pointer-events-none fixed bottom-10 left-10 h-72 w-72 rounded-full bg-secondary/15 blur-[100px] -z-10" />

      {/* HEADER SECTION */}
      <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/65 backdrop-blur-xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 hover:shadow-md hover:border-primary/20">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/15 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 z-10 min-w-0">
          <div className="relative group cursor-pointer shrink-0">
            <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl scale-110 opacity-70 group-hover:opacity-100 transition duration-300" />
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30 shadow-md">
              {profile.image ? (
                <Image
                  src={profile.image}
                  alt={profile.name || "Avatar"}
                  fill
                  className="object-cover"
                  sizes="80px"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary">
                  <User className="h-9 w-9" />
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground p-1.5 rounded-full border-2 border-card shadow-sm hover:scale-110 transition duration-200">
              <Camera size={14} />
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs uppercase tracking-widest font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                Verified Account
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <ShieldCheck size={12} /> Active Member
              </span>
            </div>
            <h1
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-3"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {profile.name || "Pawly Member"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Configure your personal details, adopter profile, and socials.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 z-10 shrink-0">
          <div className="text-center bg-muted/40 border border-border/80 px-4 py-2.5 rounded-2xl">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Role
            </p>
            <p className="text-sm font-bold text-primary mt-1 capitalize">
              {role}
            </p>
          </div>
        </div>
      </div>

      {/* TWO COLUMN FORM & INFO CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* LEFT COLUMN: Profile Status Cards */}
        <div className="space-y-6 lg:col-span-1">
          {/* Card: Member Stats */}
          <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-6 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 h-28 w-28 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border pb-3">
              <Heart className="text-primary h-4.5 w-4.5" /> Adopter Profile
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">Email Address</p>
                <p className="text-sm font-semibold text-foreground truncate mt-1">
                  {session.user.email}
                </p>
              </div>

              {profile.phoneNumber && (
                <div>
                  <p className="text-xs text-muted-foreground">Contact Phone</p>
                  <p className="text-sm font-semibold text-foreground mt-1">
                    {profile.phoneNumber}
                  </p>
                </div>
              )}

              {profile.location && (
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-semibold text-foreground mt-1 flex items-center gap-1">
                    <MapPin size={14} className="text-primary" />{" "}
                    {profile.location}
                  </p>
                </div>
              )}

              <div>
                <p className="text-xs text-muted-foreground">
                  Experience Level
                </p>
                <p className="text-sm font-semibold text-primary mt-1">
                  {profile.experience}
                </p>
              </div>
            </div>

            {profile.bio && (
              <div className="pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-1.5">Bio</p>
                <p className="text-xs text-foreground/80 italic leading-relaxed bg-muted/30 p-3 rounded-xl border border-border/40">
                  &ldquo;{profile.bio}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Social Badges Box */}
          <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-foreground">Social Links</h3>
            <div className="flex flex-col gap-3 text-xs">
              {profile.facebook ? (
                <a
                  href={profile.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-primary/10 transition border border-border/50 text-foreground"
                >
                  <FaFacebook
                    size={16}
                    className="text-blue-600 fill-blue-600/10"
                  />
                  <span className="truncate font-medium">Facebook Profile</span>
                </a>
              ) : (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 text-muted-foreground border border-dashed border-border">
                  <FaFacebook size={16} className="opacity-40" />
                  <span>No Facebook linked</span>
                </div>
              )}

              {profile.instagram ? (
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-primary/10 transition border border-border/50 text-foreground"
                >
                  <FaInstagram size={16} className="text-pink-600" />
                  <span className="truncate font-medium">
                    Instagram Profile
                  </span>
                </a>
              ) : (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 text-muted-foreground border border-dashed border-border">
                  <FaInstagram size={16} className="opacity-40" />
                  <span>No Instagram linked</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Settings Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
            {/* Form Header */}
            <div className="bg-muted/40 px-6 py-5 border-b border-border flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-primary fill-primary/10 animate-pulse" />
              <h3 className="text-xl font-bold text-foreground">
                Edit Profile Details
              </h3>
            </div>

            {/* Form Body */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-foreground">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={profile.name}
                      onChange={handleChange}
                      placeholder="e.g. Ayesha Rahman"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Email (Read Only) */}
                <div className="flex flex-col gap-2 opacity-80">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                    Email Address{" "}
                    <Lock size={12} className="text-muted-foreground" />
                  </label>
                  <input
                    type="email"
                    value={session.user.email}
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted text-muted-foreground cursor-not-allowed outline-none"
                  />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-foreground">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={profile.phoneNumber}
                      onChange={handleChange}
                      placeholder="e.g. +880 1712-345678"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-foreground">
                    Location / City
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      placeholder="e.g. Dhaka, Bangladesh"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Profile Picture URL */}
                <div className="flex flex-col md:col-span-2 gap-2">
                  <label className="text-sm font-semibold text-foreground">
                    Profile Picture URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={profile.image}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Provide a direct link to an image. Supported: Unsplash,
                    Imgur, or direct hosting links.
                  </p>
                </div>

                {/* Adopter Experience */}
                <div className="flex flex-col md:col-span-2 gap-2">
                  <label className="text-sm font-semibold text-foreground">
                    Pet Ownership Experience
                  </label>
                  <select
                    name="experience"
                    value={profile.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  >
                    <option value="First-time Owner">
                      First-time Adopter (Never owned a pet)
                    </option>
                    <option value="Experienced Owner">
                      Experienced Owner (Owned pets before)
                    </option>
                    <option value="Animal Rescuer">
                      Animal Rescuer / Volunteer
                    </option>
                    <option value="Professional Caretaker">
                      Professional Trainer / Caretaker / Vet
                    </option>
                  </select>
                </div>

                {/* Bio / About */}
                <div className="flex flex-col md:col-span-2 gap-2">
                  <label className="text-sm font-semibold text-foreground">
                    Adopter Bio
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 absolute left-3.5 top-4.5 text-muted-foreground" />
                    <textarea
                      rows={4}
                      name="bio"
                      value={profile.bio}
                      onChange={handleChange}
                      placeholder="Tell shelters/listings a bit about yourself, your home environment, and why you love animals..."
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground resize-none outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* SOCIAL PROFILES SECTION */}
                <div className="md:col-span-2 border-t border-border/60 pt-6 mt-2 space-y-4">
                  <h4 className="text-sm font-bold text-foreground">
                    Social Links
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-muted-foreground">
                        Facebook URL
                      </label>
                      <div className="relative">
                        <FaFacebook className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="url"
                          name="facebook"
                          value={profile.facebook}
                          onChange={handleChange}
                          placeholder="https://facebook.com/username"
                          className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-muted-foreground">
                        Instagram URL
                      </label>
                      <div className="relative">
                        <FaInstagram className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="url"
                          name="instagram"
                          value={profile.instagram}
                          onChange={handleChange}
                          placeholder="https://instagram.com/username"
                          className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons Footer */}
            <div className="px-6 py-5 bg-muted/20 border-t border-border flex justify-end gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold shadow-md hover:scale-[1.02] active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSaving ? (
                  <>
                    <Loader size="inline" />
                    Saving Changes
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Settings
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
