"use client";

import { authClient } from "@/lib/auth-client";
import {
    CirclePlus,
    ClipboardList,
    HeartHandshake,
    Home,
    LogOut,
    PawPrint,
    User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navLinks: SidebarLink[] = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: Home,
    },
    {
      href: "/dashboard/my-requests",
      label: "My Requests",
      icon: ClipboardList,
    },
    {
      href: "/dashboard/adoption-requests",
      label: "Adoption Requests",
      icon: HeartHandshake,
    },
    {
      href: "/dashboard/add-pet",
      label: "Add Pet",
      icon: CirclePlus,
    },
    {
      href: "/dashboard/my-listings",
      label: "My Listings",
      icon: PawPrint,
    },
    {
      href: "/dashboard/profile",
      label: "Profile Settings",
      icon: User,
    },
  ];

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
        },
      },
    });
  };

  return (
    <aside className="hidden lg:flex lg:fixed lg:left-0 lg:top-16 lg:z-30 lg:h-[calc(100vh-64px)] lg:w-65 lg:flex-col lg:justify-between border-r border-border bg-card">
      {/* TOP SECTION */}
      <div>
        {/* NAVIGATION */}
        <nav className="space-y-2 p-4">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM SECTION */}
      <div className="border-t border-border p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-destructive transition-all duration-200 hover:bg-destructive/10"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
