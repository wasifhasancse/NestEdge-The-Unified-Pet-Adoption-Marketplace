import Link from "next/link";
import { Share2, Send } from "lucide-react";
import { LuFacebook } from "react-icons/lu";
import NestEdgeLogo from "@/components/ui/NestEdgeLogo";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-card text-foreground border-t border-border py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
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
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition text-muted-foreground hover:border-primary"
            >
              <LuFacebook className="w-4 h-4" />
            </Link>

            <Link
              href="#"
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition text-muted-foreground hover:border-primary"
            >
              <Share2 className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-muted-foreground">
            {["Find a Pet", "Pet Care Tips", "Success Stories", "Donation"].map(
              (item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-primary transition">
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-bold mb-6">Support</h4>
          <ul className="space-y-4 text-muted-foreground">
            {[
              "Help Center",
              "Contact Us",
              "Privacy Policy",
              "Terms of Service",
            ].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-primary transition">
                  {item}
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

            <button className="px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition flex items-center justify-center cursor-pointer">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-6 border-t border-border text-center text-sm text-muted-foreground">
        © 2026 NestEdge. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
