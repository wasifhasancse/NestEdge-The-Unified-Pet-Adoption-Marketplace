import {
    ArrowRight,
    Calendar,
    ChevronRight,
    Clock,
    Heart,
    MapPin,
    Search,
} from "lucide-react";
import Image from "next/image";
import React from "react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

const categories = [
  "All",
  "Success Stories",
  "Pet Care",
  "Training",
  "Adoption Tips",
];

const featuredPost = {
  id: 1,
  title:
    "From Stray to Soulmate: How Max Found His Forever Family Against All Odds",
  excerpt:
    "Found abandoned in a rainstorm, Max the Golden Retriever mix was terrified of everything. Read the heartwarming story of how patience, love, and a dedicated foster family transformed him into a certified therapy dog.",
  category: "Success Stories",
  date: "May 24, 2026",
  readTime: "6 min read",
  author: {
    name: "Sarah Jenkins",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  },
  image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=1200",
};

const blogPosts: BlogPost[] = [
  {
    id: 2,
    title: "The Ultimate Guide to Puppy-Proofing Your Living Space",
    excerpt:
      "Before bringing your new furry friend home, make sure your house is safe. From hidden electrical cords to toxic houseplants, here is your essential safety checklist.",
    category: "Pet Care",
    date: "May 20, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600",
  },
  {
    id: 3,
    title: "5 Essential Commands Every Adopted Dog Needs to Learn First",
    excerpt:
      "Building trust starts with communication. Discover the positive reinforcement techniques that will help your rescue dog master basic commands in their first week.",
    category: "Training",
    date: "May 15, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600",
  },
  {
    id: 4,
    title:
      "Decoding Cat Body Language: What Your Rescue Kitty is Trying to Tell You",
    excerpt:
      "A slow blink? A twitching tail? Cats communicate subtly. Learn how to read your new rescue cat's signals to make them feel safe and comfortable in their new home.",
    category: "Adoption Tips",
    date: "May 12, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600",
  },
  {
    id: 5,
    title: "Preparing Your Budget for Pet Adoption: Hidden Costs to Consider",
    excerpt:
      "Adoption fees are just the beginning. From unexpected vet visits to quality nutrition, we break down the realistic yearly costs of owning a pet so you can plan ahead.",
    category: "Adoption Tips",
    date: "May 08, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=600",
  },
];

const featuredPet = {
  name: "Bruno",
  breed: "Boxer & Lab Mix",
  age: "2 years old",
  location: "Austin Shelter",
  image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500",
};

const BlogsPage: React.FC = () => {
  const activeCategory = "All";

  return (
    <div className="min-h-screen bg-background pt-20 text-foreground font-sans transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Heading */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            The Adoption <span className="text-primary">Journal</span>
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl text-sm md:text-base">
            Expert pet care guidelines, heartwarming rescue transformations, and
            professional advice to set up your adoption journey for absolute
            success.
          </p>
        </div>

        {/* HERO AREA: Big Featured Magazine Card */}
        <section className="mb-16">
          <div className="bg-card rounded-3xl overflow-hidden border border-border shadow-lg grid grid-cols-1 lg:grid-cols-12">
            {/* Hero Image Viewport */}
            <div className="lg:col-span-7 relative h-64 sm:h-96 lg:h-full min-h-95 overflow-hidden group">
              <Image
                fill
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md">
                {featuredPost.category}
              </div>
            </div>

            {/* Hero Text Frame */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-card">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} className="text-primary" />{" "}
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} className="text-primary" />{" "}
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight hover:text-primary transition-colors cursor-pointer">
                  {featuredPost.title}
                </h2>

                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed line-clamp-4 lg:line-clamp-none">
                  {featuredPost.excerpt}
                </p>
              </div>

              {/* Author Footer Metadata */}
              <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    height={40}
                    width={40}
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-border"
                  />
                  <div>
                    <p className="text-sm font-semibold">
                      {featuredPost.author.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Shelter Coordinator
                    </p>
                  </div>
                </div>

                <button className="flex items-center gap-1 text-primary font-bold text-sm hover:underline transition-all group bg-transparent border-none cursor-pointer">
                  Read Story
                  <ArrowRight
                    size={16}
                    className="transform group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. THREE-COLUMN FILTERS BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-10 border-b border-border">
          {/* Horizontal Scroll Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((category) => (
              <button
                key={category}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border cursor-pointer ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Quick Search Widget */}
          <div className="relative w-full md:w-72">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* 3. CORE CONTENT SPLIT: Main Feed (2/3) vs Sidebar (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column Feed: 2 Columns of Magazine Cards */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
                >
                  {/* Card Thumbnail */}
                  <div className="relative aspect-16/10 overflow-hidden">
                    <Image
                      fill
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-3 left-3 bg-card/90 text-foreground text-xs font-bold px-2.5 py-1 rounded-lg border border-border shadow-sm">
                      {post.category}
                    </span>
                  </div>

                  {/* Card Body Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                        <span>{post.date}</span>
                        <span className="inline-block w-1 h-1 rounded-full bg-border"></span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} className="text-primary" />{" "}
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-bold text-foreground text-lg leading-snug line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border flex items-center text-sm font-bold text-primary group-hover:underline transition-colors cursor-pointer">
                      <span>Read Article</span>
                      <ChevronRight
                        size={16}
                        className="ml-0.5 group-hover:translate-x-0.5 transition-transform"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination / Load Feed CTA */}
            <div className="clear-both mt-12 text-center">
              <button className="bg-card border border-border text-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:bg-secondary transition-colors inline-flex items-center gap-2 shadow-sm cursor-pointer">
                Load Older Articles
              </button>
            </div>
          </div>

          {/* Right Column Layout: Fixed Sticky Sidebar Container */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
            {/* Widget A: Urgent Feature Adoption Drive */}
            <div className="bg-secondary rounded-3xl p-6 border border-border shadow-md relative overflow-hidden group">
              <div className="absolute -right-12 -bottom-12 w-44 h-44 bg-primary/10 rounded-full blur-2xl"></div>

              <div className="relative space-y-5">
                <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-primary/20">
                  <Heart size={12} className="fill-current" /> Pet of the Week
                </span>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Meet {featuredPet.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    This sweet boy has spent over 120 days waiting in our
                    shelter network. He loves long walks, fetches cleanly, and
                    is fully house-trained.
                  </p>
                </div>

                {/* Micro Pet Profile Card */}
                <div className="bg-card rounded-2xl p-3 flex items-center gap-4 border border-border shadow-sm">
                  <Image
                    width={64}
                    height={64}
                    src={featuredPet.image}
                    alt={featuredPet.name}
                    className="w-16 h-16 rounded-xl object-cover shadow-sm"
                  />
                  <div className="text-xs space-y-1 text-muted-foreground">
                    <p className="font-bold text-sm text-foreground">
                      {featuredPet.breed}
                    </p>
                    <p>{featuredPet.age}</p>
                    <p className="flex items-center gap-0.5">
                      <MapPin size={10} className="text-primary" />{" "}
                      {featuredPet.location}
                    </p>
                  </div>
                </div>

                <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border-none">
                  Apply to Adopt {featuredPet.name}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Widget B: Editorial Newsletter Form */}
            <div className="bg-card rounded-3xl p-6 border border-border shadow-sm space-y-4">
              <div className="space-y-1">
                <h4 className="font-bold text-foreground text-lg">
                  NestEdge Weekly Digest
                </h4>
                <p className="text-muted-foreground text-sm">
                  Join 12,000+ subscribers getting weekly updates on pet care,
                  training tips, and localized success stories.
                </p>
              </div>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <button className="w-full bg-foreground text-background font-bold py-3 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-sm cursor-pointer border-none">
                  Subscribe
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground text-center leading-normal">
                No spam. Unsubscribe at any point with one simple click.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default BlogsPage;
