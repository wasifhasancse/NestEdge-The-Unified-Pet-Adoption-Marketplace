import { Heart, ShieldCheck, HandHeart, PawPrint } from "lucide-react";
import React from "react";

interface BenefitItem {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
}

const WhyAdoptSection: React.FC = () => {
  const benefits: BenefitItem[] = [
    {
      icon: Heart,
      title: "Save a Life",
      description:
        "Provide a forever home to an animal in need and make room in shelters for others.",
    },
    {
      icon: ShieldCheck,
      title: "Health Benefits",
      description:
        "Pets are proven to reduce stress, lower blood pressure, and improve overall mental health.",
    },
    {
      icon: HandHeart,
      title: "Unconditional Love",
      description:
        "Adopted pets often show a special kind of gratitude and loyalty to their new owners.",
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-5">
            <PawPrint className="w-4 h-4" />
            Why NestEdge?
          </span>

          <h2
            className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4 leading-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Every Pet Deserves
            <span className="text-primary"> A Loving Home</span>
          </h2>

          <p className="max-w-2xl mx-auto text-muted-foreground text-base md:text-lg leading-relaxed">
            Adoption goes far beyond simply getting a pet. It&apos;s about
            offering a forever home to an animal who deserves love, while
            gaining a loyal and grateful companion who will brighten your
            everyday life.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-card rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/20 flex flex-col h-full"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <benefit.icon
                  className="w-9 h-9 text-primary"
                  strokeWidth={2}
                />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed text-[17px]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAdoptSection;
