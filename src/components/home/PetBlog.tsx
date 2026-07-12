import React from "react";
import {
  Calendar,
  User,
  ArrowRight,
  MessageSquare,
  PawPrint,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";

interface BlogPost {
  id: number;
  image: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  comments: number;
}

const PetBlog: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop",
      category: "Pet Care",
      title: "5 Essential Tips for Welcoming Your First Adopted Cat",
      excerpt:
        "Bringing a new cat home is exciting but requires preparation. Learn how to make their first week comfortable and stress-free.",
      author: "Dr. Ayesha",
      date: "May 24, 2026",
      comments: 12,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop",
      category: "Dog Training",
      title: "Understanding Puppy Behavior: A Guide for New Owners",
      excerpt:
        "From teething to separation anxiety, understand what your new pup is trying to tell you through their body language.",
      author: "Rahman M.",
      date: "May 18, 2026",
      comments: 8,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop",
      category: "Health & Nutrition",
      title: "The Ultimate Balanced Diet Guide for Active Dogs",
      excerpt:
        "Choosing the right food ensures longevity and energy. Discover the core nutrients every active dog needs in their daily meals.",
      author: "S. Tanvir",
      date: "May 12, 2026",
      comments: 15,
    },
  ];

  return (
    <section className="bg-background text-foreground py-16 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-5">
            <PawPrint className="w-4 h-4" />
            Our Journal
          </span>

          <h2
            className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4 leading-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Latest From <span className="text-primary">Pet Blogs</span>
          </h2>

          <p className="max-w-2xl mx-auto text-muted-foreground text-base md:text-lg leading-relaxed">
            Stay updated with expert tips, heartwarming adoption stories, and
            essential pet care guides.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 flex flex-col group shadow-md"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-video">
                <Image
                  fill
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-md shadow-md">
                  {post.category}
                </span>
              </div>

              {/* Content Container */}
              <div className="p-6 flex flex-col grow">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-primary" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare size={14} className="text-primary" />
                    <span>{post.comments} Comments</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold leading-snug group-hover:text-primary transition-colors duration-300 cursor-pointer line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm mt-3 line-clamp-3 grow leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Footer/Author Section */}
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-secondary rounded-full flex items-center justify-center border border-border">
                      <User size={14} className="text-muted-foreground" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      By {post.author}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-primary inline-flex items-center gap-1 group-hover:underline cursor-pointer">
                    Read More
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center items-center">
          <Link
            href="/blogs"
            className="inline-flex justify-center items-center gap-2 mt-10 text-sm font-medium text-primary hover:underline"
          >
            View All Articles <MdArrowRightAlt className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PetBlog;
