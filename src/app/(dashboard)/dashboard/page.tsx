import { auth } from "@/lib/auth";
import { getUserListing } from "@/lib/data/pets";
import { getMyRequests, getPetRequestsByPetId } from "@/lib/data/requests";
import { AdoptionRequest, Pet } from "@/types";
import {
    AlertCircle,
    Calendar,
    ChevronRight,
    ClipboardList,
    Clock,
    HeartHandshake,
    Inbox,
    Lightbulb,
    PawPrint,
    Plus,
    Send,
    Sparkles,
    TrendingUp,
    User,
} from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const PET_CARE_TIPS = [
  {
    title: "Fresh Water First",
    content:
      "Make sure to keep your pet hydrated, especially during warmer months. Always keep fresh, clean water accessible.",
    author: "NestEdge Health Team",
  },
  {
    title: "Daily Play & Exercise",
    content:
      "Just 15-30 minutes of active play daily keeps your pet mentally stimulated, prevents obesity, and strengthens your bond.",
    author: "Behavioral Expert",
  },
  {
    title: "Regular Vet Checkups",
    content:
      "Preventive care is the best care. Schedule comprehensive checkups at least once a year to detect any health issues early.",
    author: "Veterinary Association",
  },
  {
    title: "Positive Reinforcement",
    content:
      "Reward good behavior with treats, praise, or play. This builds mutual trust and makes learning fun for your companion.",
    author: "Training Coach",
  },
  {
    title: "Grooming & Hygiene",
    content:
      "Regular brushing helps distribute natural oils, prevents matting, and is the perfect chance to check for skin issues or pests.",
    author: "Professional Groomer",
  },
];

export default async function DashboardHomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const authApi = await auth.api.getToken({
    headers: await headers(),
  });
  const token = authApi?.token || "";

  const email = session?.user?.email;
  const user = session?.user;

  // Real data fetching with fallback values
  let listings: Pet[] = [];
  let sentRequests: AdoptionRequest[] = [];
  let receivedRequests: AdoptionRequest[] = [];
  let loadingError = false;

  if (email && token) {
    try {
      listings = (await getUserListing(email, token)) || [];
      sentRequests = (await getMyRequests(email, token)) || [];

      if (listings.length > 0) {
        const promises = listings.map((pet) =>
          getPetRequestsByPetId(pet._id || "", token)
            .then((res) => res || [])
            .catch(() => []),
        );
        const results = await Promise.all(promises);
        receivedRequests = results.flat().filter(Boolean) as AdoptionRequest[];
      }
    } catch (error) {
      console.error("Dashboard data fetching failed:", error);
      loadingError = true;
    }
  }

  // Calculate metrics
  const totalListings = listings.length;
  const activeListings = listings.filter(
    (l) => l.status === "available",
  ).length;
  const adoptedListings = listings.filter((l) => l.status === "adopted").length;

  const totalReceived = receivedRequests.length;
  const pendingReceived = receivedRequests.filter(
    (r) => r.status === "pending",
  ).length;
  const approvedReceived = receivedRequests.filter(
    (r) => r.status === "approved",
  ).length;

  const totalSent = sentRequests.length;
  const pendingSent = sentRequests.filter((r) => r.status === "pending").length;
  const approvedSent = sentRequests.filter(
    (r) => r.status === "approved",
  ).length;

  const successRate =
    totalListings > 0 ? Math.round((adoptedListings / totalListings) * 100) : 0;

  // Get a random tip based on current date so it remains stable for a day
  const tipIndex = Math.floor(
    (new Date().getDate() + new Date().getMonth()) % PET_CARE_TIPS.length,
  );
  const dailyTip = PET_CARE_TIPS[tipIndex];

  // Dynamic greeting warning or action text
  let greetingMessage =
    "👋 Ready to make a difference? Add a new pet listing or explore pets to adopt!";
  if (pendingReceived > 0) {
    greetingMessage = `🐾 You have ${pendingReceived} pending adoption request${
      pendingReceived > 1 ? "s" : ""
    } waiting for your review. Let's find them a loving home!`;
  } else if (activeListings > 0) {
    greetingMessage =
      "✨ Your listed pets are doing great! Let's check if any new friends are interested.";
  } else if (totalSent > 0) {
    greetingMessage =
      "💛 Your adoption applications are submitted. We hope you connect with your dream pet soon!";
  }

  return (
    <div className="space-y-6 bg-background text-foreground min-h-screen">
      {/* Background ambient blurs */}
      <div className="pointer-events-none fixed top-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-[120px] -z-10" />
      <div className="pointer-events-none fixed bottom-10 left-10 h-72 w-72 rounded-full bg-chart-2/10 blur-[100px] -z-10" />

      {/* HEADER SECTION - Premium Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xl p-5 sm:p-7 shadow-sm flex flex-col xl:flex-row items-start xl:items-center justify-between gap-5 transition-all duration-300 hover:shadow-md hover:border-primary/20">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/15 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 z-10 min-w-0 w-full xl:w-auto">
          {/* User Image/Initials */}
          <div className="shrink-0">
            {user?.image ? (
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 shadow-md">
                <Image
                  src={user.image}
                  alt={user.name || "User Avatar"}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 shadow-md">
                <User className="h-7 w-7 text-primary" />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <span className="text-xs uppercase tracking-widest font-semibold text-primary/90 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              User Dashboard
            </span>
            <h1
              className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground mt-2"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Welcome back,{" "}
              <span className="text-primary">{user?.name || "Pet Lover"}</span>!
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              {greetingMessage}
            </p>
          </div>
        </div>

        {/* Quick listing stats bubble */}
        <div className="hidden xl:flex items-center gap-5 bg-muted/30 border border-border/60 p-4 rounded-2xl z-10 shrink-0">
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">
              {activeListings}
            </p>
            <p className="text-xs text-muted-foreground">Active Listings</p>
          </div>
          <div className="h-8 w-px bg-border/60" />
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">
              {pendingReceived}
            </p>
            <p className="text-xs text-muted-foreground">Pending Requests</p>
          </div>
          <div className="h-8 w-px bg-border/60" />
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{successRate}%</p>
            <p className="text-xs text-muted-foreground">Success Rate</p>
          </div>
        </div>
      </div>

      {/* METRICS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Listings */}
        <div className="p-4 sm:p-5 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col justify-between group">
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                My Pet Listings
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold mt-1.5 text-foreground">
                {totalListings}
              </p>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300 shrink-0 ml-2">
              <PawPrint size={18} />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between text-xs">
            <span className="text-muted-foreground flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{" "}
              {activeListings} Avail.
            </span>
            <span className="text-muted-foreground flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />{" "}
              {adoptedListings} Adopted
            </span>
          </div>
        </div>

        {/* Requests Received */}
        <div className="p-4 sm:p-5 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col justify-between group">
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                Incoming Requests
              </p>
              <div className="flex items-baseline gap-1.5 mt-1.5 flex-wrap">
                <p className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  {totalReceived}
                </p>
                {pendingReceived > 0 && (
                  <span className="text-xs font-semibold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded-md flex items-center gap-0.5 animate-pulse">
                    <Clock size={10} /> {pendingReceived} new
                  </span>
                )}
              </div>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300 shrink-0 ml-2">
              <HeartHandshake size={18} />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
            <span>{approvedReceived} Approved</span>
            <span>
              {totalReceived - pendingReceived - approvedReceived} Rejected
            </span>
          </div>
        </div>

        {/* Adoption Requests Sent */}
        <div className="p-4 sm:p-5 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col justify-between group">
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                My Sent Requests
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold mt-1.5 text-foreground">
                {totalSent}
              </p>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300 shrink-0 ml-2">
              <Send size={18} />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between text-xs">
            <span className="text-muted-foreground flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />{" "}
              {pendingSent} Pending
            </span>
            <span className="text-muted-foreground flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{" "}
              {approvedSent} Approved
            </span>
          </div>
        </div>

        {/* Success Rate */}
        <div className="p-4 sm:p-5 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col justify-between group">
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                Adoption Rate
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold mt-1.5 text-foreground">
                {successRate}%
              </p>
            </div>
            <div className="p-2 sm:p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300 shrink-0 ml-2">
              <Sparkles size={18} />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border/50">
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${successRate}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* TWO COLUMN CONTENT LAYOUT */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* LEFT COLUMN: Activity Feed & Request Summaries */}
        <div className="xl:col-span-2 space-y-5">
          {/* Incoming adoption requests timeline */}
          <div className="p-4 sm:p-5 rounded-2xl border border-border bg-card shadow-sm space-y-4">
            <div className="flex items-start justify-between border-b border-border pb-4 gap-3">
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                  <Inbox className="text-primary h-4 w-4 shrink-0" />
                  <span className="truncate">Incoming Adoption Requests</span>
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Requests for your listed pets
                </p>
              </div>
              <Link
                href="/dashboard/adoption-requests"
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 shrink-0"
              >
                Manage <ChevronRight size={14} />
              </Link>
            </div>

            {loadingError ? (
              <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/5 text-sm text-destructive flex items-center gap-2">
                <AlertCircle size={18} />
                Failed to load received requests. Please check back later.
              </div>
            ) : receivedRequests.length === 0 ? (
              <div className="text-center py-10 px-4 space-y-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                  <HeartHandshake size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    No applications received yet
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
                    When visitors submit requests to adopt the pets you have
                    listed, they will appear here with contact and status info.
                  </p>
                </div>
                <Link
                  href="/dashboard/add-pet"
                  className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-2 rounded-full hover:bg-primary hover:text-white transition duration-300"
                >
                  <Plus size={14} /> Add New Listing
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {receivedRequests.slice(0, 3).map((request) => (
                  <div
                    key={request._id}
                    className="p-3 sm:p-4 rounded-xl border border-border bg-muted/20 hover:border-primary/20 transition duration-200"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {request.petImage ? (
                          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-border shrink-0">
                            <Image
                              src={request.petImage}
                              alt={request.petName || "Pet"}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-border shrink-0">
                            <PawPrint className="text-primary" size={16} />
                          </div>
                        )}
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-foreground truncate">
                            {request.userName}
                          </h4>
                          <p className="text-xs text-muted-foreground truncate">
                            {request.userEmail}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize border shrink-0 ${
                          request.status === "approved"
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                            : request.status === "rejected"
                              ? "bg-rose-500/10 text-rose-600 border-rose-500/20"
                              : "bg-amber-500/10 text-amber-600 border-amber-500/20 animate-pulse"
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-border/50 gap-3">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground min-w-0">
                        <span className="font-medium text-primary truncate">
                          🐾 {request.petName}
                        </span>
                        <span className="flex items-center gap-1 shrink-0">
                          <Calendar size={11} />{" "}
                          {request.pickupDate || "No date"}
                        </span>
                      </div>
                      <Link
                        href="/dashboard/adoption-requests"
                        className="shrink-0"
                      >
                        <button className="text-xs font-semibold border border-border hover:bg-muted text-foreground px-2.5 py-1 rounded-lg transition duration-200 cursor-pointer">
                          Action
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
                {receivedRequests.length > 3 && (
                  <p className="text-xs text-center text-muted-foreground pt-1">
                    +{receivedRequests.length - 3} more. View listings to see
                    all.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Sent adoption requests timeline */}
          <div className="p-4 sm:p-5 rounded-2xl border border-border bg-card shadow-sm space-y-4">
            <div className="flex items-start justify-between border-b border-border pb-4 gap-3">
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                  <Send className="text-primary h-4 w-4 shrink-0" />
                  <span className="truncate">My Adoption Applications</span>
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Track your requests on NestEdge
                </p>
              </div>
              <Link
                href="/dashboard/my-requests"
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 shrink-0"
              >
                View All <ChevronRight size={14} />
              </Link>
            </div>

            {loadingError ? (
              <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/5 text-sm text-destructive flex items-center gap-2">
                <AlertCircle size={18} />
                Failed to load applications. Please check back later.
              </div>
            ) : sentRequests.length === 0 ? (
              <div className="text-center py-10 px-4 space-y-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                  <Send size={22} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    You haven&apos;t applied to adopt yet
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
                    Find your perfect companion. Browse through our listings of
                    sweet pets looking for a happy home and submit your adoption
                    request!
                  </p>
                </div>
                <Link
                  href="/all-pets"
                  className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-primary hover:text-white transition duration-300 shadow-sm"
                >
                  Browse Pets to Adopt
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {sentRequests.slice(0, 3).map((request) => (
                  <div
                    key={request._id}
                    className="p-3 sm:p-4 rounded-xl border border-border bg-muted/20 hover:border-primary/20 transition duration-200"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {request.petImage ? (
                          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-border shrink-0">
                            <Image
                              src={request.petImage}
                              alt={request.petName || "Pet"}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-border shrink-0">
                            <PawPrint className="text-primary" size={16} />
                          </div>
                        )}
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-foreground truncate">
                            Adopt {request.petName}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {request.createdAt
                              ? new Date(request.createdAt)
                                  .toISOString()
                                  .split("T")[0]
                              : ""}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize border shrink-0 ${
                          request.status === "approved"
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                            : request.status === "rejected"
                              ? "bg-rose-500/10 text-rose-600 border-rose-500/20"
                              : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-border/50 gap-3">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar size={11} /> Pickup:{" "}
                        {request.pickupDate || "Pending"}
                      </span>
                      <Link
                        href={`/all-pets/${request.petId}`}
                        className="shrink-0"
                      >
                        <button className="text-xs font-semibold border border-border hover:bg-muted text-foreground px-2.5 py-1 rounded-lg transition duration-200 cursor-pointer">
                          Details
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
                {sentRequests.length > 3 && (
                  <p className="text-xs text-center text-muted-foreground pt-1">
                    +{sentRequests.length - 3} more. View all applications.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Quick Actions & Pet Insights */}
        <div className="space-y-5">
          {/* Quick Actions Panel */}
          <div className="p-4 sm:p-5 rounded-2xl border border-border bg-card shadow-sm space-y-4">
            <h2 className="text-base font-bold text-foreground border-b border-border pb-3">
              Quick Actions
            </h2>

            <div className="space-y-3">
              {/* Add Pet */}
              <Link
                href="/dashboard/add-pet"
                className="group block p-4 rounded-xl border border-border/80 bg-muted/10 hover:bg-primary/5 hover:border-primary/30 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <Plus size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      Add New Pet
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      List a pet for adoption
                    </p>
                  </div>
                </div>
              </Link>

              {/* View Listings */}
              <Link
                href="/dashboard/my-listings"
                className="group block p-4 rounded-xl border border-border/80 bg-muted/10 hover:bg-primary/5 hover:border-primary/30 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <PawPrint size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      My Listings
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Manage your active pets
                    </p>
                  </div>
                </div>
              </Link>

              {/* Check Requests */}
              <Link
                href="/dashboard/my-requests"
                className="group block p-4 rounded-xl border border-border/80 bg-muted/10 hover:bg-primary/5 hover:border-primary/30 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <ClipboardList size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      My Requests
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Track your applications
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Pet Care Tip of the Day */}
          <div className="p-4 sm:p-5 rounded-2xl border border-primary/20 bg-primary/5 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-primary/10 blur-xl pointer-events-none" />
            <Lightbulb className="absolute right-4 top-4 text-primary/30 h-10 w-10 group-hover:rotate-12 transition-transform duration-300" />

            <div className="space-y-3 z-10 relative">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-widest border border-primary/20">
                Tip of the Day
              </span>
              <h3 className="text-base font-bold text-foreground">
                {dailyTip.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {dailyTip.content}
              </p>
              <p className="text-[10px] font-medium text-primary/80 pt-1.5">
                — {dailyTip.author}
              </p>
            </div>
          </div>

          {/* Adoption Insights Summary */}
          <div className="p-4 sm:p-5 rounded-2xl border border-border bg-card shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="text-primary h-4 w-4" /> Adoption Insights
            </h2>
            <div className="space-y-3 text-xs leading-relaxed text-muted-foreground">
              <p>
                Adoption listings with detailed descriptions and at least 3
                photos receive up to{" "}
                <span className="font-semibold text-primary">
                  60% more adoption requests
                </span>
                .
              </p>
              <p>
                Prompt responses to requests within{" "}
                <span className="font-semibold text-primary">24 hours</span>{" "}
                increase successful placements by over{" "}
                <span className="font-semibold text-primary">2 times</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-2 pt-5 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>© 2026 NestEdge. Supporting pet care &amp; smooth adoptions.</p>
        <p className="flex items-center gap-1.5">
          <Sparkles size={12} className="text-primary animate-pulse" /> Keep
          creating beautiful stories together.
        </p>
      </footer>
    </div>
  );
}
