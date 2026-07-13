"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Home,
  ClipboardList,
  CirclePlus,
  PawPrint,
  LogOut,
  User,
} from "lucide-react";
import React from "react";
import { authClient } from "@/lib/auth-client";
import NestEdgeLogo from "../ui/NestEdgeLogo";

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
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
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  return (
    <>
      {/* MENU BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl p-2 transition-colors hover:bg-muted cursor-pointer"
      >
        <Menu size={24} />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-70 border-r border-border bg-card transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-border p-5">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 text-xl font-bold"
          >
            <NestEdgeLogo className="w-8 h-8 text-primary" />
            <span style={{ fontFamily: "var(--font-poppins)" }}>NestEdge</span>
          </Link>

          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 hover:bg-muted cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

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
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
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

        {/* FOOTER */}
        <div className="absolute bottom-0 w-full border-t border-border p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-destructive transition-all duration-200 hover:bg-destructive/10 cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
