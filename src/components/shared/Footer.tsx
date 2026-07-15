import NestEdgeLogo from "@/components/ui/NestEdgeLogo";
import { Send, Share2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { LuFacebook } from "react-icons/lu";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-card py-16 text-foreground sm:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 md:grid-cols-2 xl:grid-cols-4">
        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-2 mb-6 text-foreground">
            <NestEdgeLogo className="w-10 h-10" />
            <span className="text-2xl font-bold">NestEdge</span>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Making pet adoption easier and more accessible for everyone. Our
            mission is to find every pet a loving home.
          </p>

          <div className="flex gap-4">
            <Link
              href="#"
              className="btn-secondary h-10 w-10 rounded-full p-0 text-muted-foreground hover:border-primary hover:text-primary-foreground"
            >
              <LuFacebook className="w-4 h-4" />
            </Link>

            <Link
              href="#"
              className="btn-secondary h-10 w-10 rounded-full p-0 text-muted-foreground hover:border-primary hover:text-primary-foreground"
            >
              <Share2 className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-6 text-lg font-bold">Explore</h4>
          <ul className="space-y-4 text-muted-foreground">
            {[
              { label: "Find a Pet", href: "/all-pets" },
              { label: "Blogs", href: "/blogs" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="hover:text-primary transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="mb-6 text-lg font-bold">Support</h4>
          <ul className="space-y-4 text-muted-foreground">
            {[
              { label: "Help Center", href: "/contact" },
              { label: "Contact Us", href: "/contact" },
              { label: "About NestEdge", href: "/about" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="hover:text-primary transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-bold mb-6">Newsletter</h4>

          <p className="text-muted-foreground mb-6 text-sm">
            Subscribe to get updates on new pets and adoption events.
          </p>

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
            />

            <button className="btn-primary rounded-lg px-4 py-3">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mx-auto mt-12 max-w-7xl border-t border-border px-4 pt-6 text-center text-sm text-muted-foreground sm:px-6">
        © 2026 NestEdge. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
