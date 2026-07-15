"use client";

import {
    ChevronDown,
    ClipboardList,
    Grid3X3,
    Home,
    Info,
    LayoutDashboard,
    LogOut,
    Menu,
    NotebookPen,
    PhoneCall,
    PlusCircle,
    User,
    X,
} from "lucide-react";

import { Loader } from "@/components/ui/Loader";
import NestEdgeLogo from "@/components/ui/NestEdgeLogo";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, useSyncExternalStore } from "react";
import NavLinks from "../ui/NavLinks";
import { ThemeSwitch } from "../ui/ThemeSwitch";

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!profileOpen) return;
    const handleOutsideClick = () => setProfileOpen(false);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [profileOpen]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/signin");
            router.refresh();
          },
        },
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-background/85 backdrop-blur-md border-b border-border/40">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-rgb),0.03),transparent_45%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold hover:text-primary transition-colors text-foreground"
          >
            <NestEdgeLogo className="w-9 h-9" />
            <span style={{ fontFamily: "var(--font-poppins)" }}>NestEdge</span>
          </Link>

          {/* Desktop Menu with Active States */}
          <div className="hidden lg:flex items-center gap-1 bg-muted/30 p-1.5 rounded-full border border-border/40 backdrop-blur-sm">
            <NavLinks href="/">
              <MenuLinkIcon
                icon={Home}
                label="Home"
                currentPath={pathname}
                targetPath="/"
              />
            </NavLinks>
            <NavLinks href="/all-pets">
              <MenuLinkIcon
                icon={Grid3X3}
                label="All-Pets"
                currentPath={pathname}
                targetPath="/all-pets"
              />
            </NavLinks>
            <NavLinks href="/blogs">
              <MobileMenuLinkIcon
                icon={NotebookPen}
                label="Blogs"
                currentPath={pathname}
                targetPath="/blogs"
              />
            </NavLinks>
            <NavLinks href="/about">
              <MobileMenuLinkIcon
                icon={Info}
                label="About"
                currentPath={pathname}
                targetPath="/about"
              />
            </NavLinks>
            <NavLinks href="/contact">
              <MobileMenuLinkIcon
                icon={PhoneCall}
                label="Contact"
                currentPath={pathname}
                targetPath="/contact"
              />
            </NavLinks>
            {user && (
              <>
                <NavLinks href="/dashboard/my-requests">
                  <MenuLinkIcon
                    icon={ClipboardList}
                    label="My Requests"
                    currentPath={pathname}
                    targetPath="/dashboard/my-requests"
                  />
                </NavLinks>

                <NavLinks href="/dashboard/add-pet">
                  <MenuLinkIcon
                    icon={PlusCircle}
                    label="Add Pet"
                    currentPath={pathname}
                    targetPath="/dashboard/add-pet"
                  />
                </NavLinks>
              </>
            )}
          </div>

          {/* Right Side UI Elements */}
          <div className="flex items-center gap-4">
            <ThemeSwitch />

            {/* Auth Section */}
            {isPending ? (
              <div className="hidden md:flex items-center justify-center w-9 h-9">
                <Loader size="inline" />
              </div>
            ) : user ? (
              <div
                className="relative hidden md:block"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2.5 border border-border/60 bg-background/50 hover:bg-muted/40 hover:border-border transition-all duration-200 rounded-full pl-1.5 pr-3 py-1.5 group shadow-sm shadow-black/5 cursor-pointer"
                >
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={28}
                      height={28}
                      className="rounded-full object-cover border border-border/80 ring-1 ring-black/5"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                      <User className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}

                  <span className="text-sm font-medium max-w-25 truncate text-foreground/90 group-hover:text-foreground transition-colors">
                    {user?.name?.split(" ")[0]}
                  </span>

                  <ChevronDown
                    className={`w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-transform duration-200 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.96 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 28,
                      }}
                      className="absolute right-0 mt-2.5 w-60 rounded-xl border border-border/50 bg-background/95 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)] overflow-hidden origin-top-right p-1.5 z-50"
                    >
                      <div className="px-3 py-2.5 mb-1 bg-muted/40 rounded-lg border border-border/30">
                        <p className="text-sm font-semibold tracking-tight text-foreground truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate mt-0.5 font-normal">
                          {user?.email}
                        </p>
                      </div>

                      <div className="space-y-0.5">
                        <Link
                          href="/dashboard"
                          onClick={() => setProfileOpen(false)}
                          className={`flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg transition-colors ${
                            pathname === "/dashboard"
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                          }`}
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>

                        <button
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-destructive rounded-lg hover:bg-destructive/5 dark:hover:bg-destructive/10 transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          {isLoggingOut ? (
                            <Loader size="inline" />
                          ) : (
                            <LogOut className="w-4 h-4" />
                          )}
                          <span>
                            {isLoggingOut ? "Logging out..." : "Logout"}
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/signin"
                className="hidden md:inline-flex btn-secondary px-4 py-2"
              >
                <User size={15} />
                <span>Sign In</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full border border-border/40 bg-muted/20 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Section */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-md overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <div
                className="flex flex-col gap-1.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <NavLinks href="/">
                  <MobileMenuLinkIcon
                    icon={Home}
                    label="Home"
                    currentPath={pathname}
                    targetPath="/"
                  />
                </NavLinks>

                <NavLinks href="/all-pets">
                  <MobileMenuLinkIcon
                    icon={Grid3X3}
                    label="All-Pets"
                    currentPath={pathname}
                    targetPath="/all-pets"
                  />
                </NavLinks>
                <NavLinks href="/blogs">
                  <MobileMenuLinkIcon
                    icon={NotebookPen}
                    label="Blogs"
                    currentPath={pathname}
                    targetPath="/blogs"
                  />
                </NavLinks>
                <NavLinks href="/about">
                  <MobileMenuLinkIcon
                    icon={Info}
                    label="About"
                    currentPath={pathname}
                    targetPath="/about"
                  />
                </NavLinks>
                <NavLinks href="/contact">
                  <MobileMenuLinkIcon
                    icon={PhoneCall}
                    label="Contact"
                    currentPath={pathname}
                    targetPath="/contact"
                  />
                </NavLinks>

                {user && (
                  <>
                    <NavLinks href="/dashboard/my-requests">
                      <MobileMenuLinkIcon
                        icon={ClipboardList}
                        label="My Requests"
                        currentPath={pathname}
                        targetPath="/dashboard/my-requests"
                      />
                    </NavLinks>

                    <NavLinks href="/dashboard/add-pet">
                      <MobileMenuLinkIcon
                        icon={PlusCircle}
                        label="Add Pet"
                        currentPath={pathname}
                        targetPath="/dashboard/add-pet"
                      />
                    </NavLinks>

                    <NavLinks href="/dashboard">
                      <MobileMenuLinkIcon
                        icon={LayoutDashboard}
                        label="Dashboard"
                        currentPath={pathname}
                        targetPath="/dashboard"
                      />
                    </NavLinks>
                  </>
                )}
              </div>

              {/* Mobile Identity / Interactive CTA */}
              <div className="pt-2 border-t border-border/30">
                {isPending ? (
                  <div className="flex justify-center py-2">
                    <Loader size="inline" />
                  </div>
                ) : user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/30">
                      {user?.image ? (
                        <Image
                          src={user.image}
                          alt={user.name || "User"}
                          width={36}
                          height={36}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                      )}

                      <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    <Button
                      fullWidth
                      onPress={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                      isDisabled={isLoggingOut}
                      className="h-11 rounded-xl bg-destructive/12 font-medium text-sm text-destructive transition-transform active:scale-[0.99] hover:bg-destructive/18"
                    >
                      {isLoggingOut ? (
                        <Loader size="inline" />
                      ) : (
                        <LogOut className="w-4 h-4" />
                      )}
                      <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                    </Button>
                  </div>
                ) : (
                  <Link href="/signin" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      fullWidth
                      className="btn-secondary h-11 rounded-xl px-4 py-0 text-sm font-medium"
                    >
                      <User className="w-4 h-4" />
                      <span>Login</span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

interface MenuLinkIconProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  currentPath: string;
  targetPath: string;
  isActive?: boolean;
}

// Desktop Menu Items Icon Helper Component
const MenuLinkIcon: React.FC<MenuLinkIconProps> = ({
  icon: Icon,
  label,
  currentPath,
  targetPath,
  isActive,
}) => {
  const active = isActive || currentPath === targetPath;
  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
      }`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
    </div>
  );
};

// Mobile Drawer Items Icon Helper Component
const MobileMenuLinkIcon: React.FC<MenuLinkIconProps> = ({
  icon: Icon,
  label,
  currentPath,
  targetPath,
  isActive,
}) => {
  const active = isActive || currentPath === targetPath;
  return (
    <div
      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
        active
          ? "bg-primary/10 text-primary"
          : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </div>
  );
};

export default Navbar;
