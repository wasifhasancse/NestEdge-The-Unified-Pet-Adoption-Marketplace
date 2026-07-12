import Image from "next/image";
import { ShieldCheck, Syringe, Stethoscope, Pill, Brain } from "lucide-react";
import React from "react";

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  bg: string;
  text: string;
}

export default function HealthSafetySection() {
  const features: FeatureItem[] = [
    {
      icon: <Syringe className="w-5 h-5" />,
      title: "Vaccinated",
      description: "All pets are up-to-date on vaccinations.",
      bg: "bg-primary/10",
      text: "text-primary",
    },
    {
      icon: <Stethoscope className="w-5 h-5" />,
      title: "Health Checked",
      description: "Regular health check-ups by trusted vets.",
      bg: "bg-primary/10",
      text: "text-primary",
    },
    {
      icon: <Pill className="w-5 h-5" />,
      title: "Dewormed",
      description: "Deworming and parasite control completed.",
      bg: "bg-primary/15",
      text: "text-primary",
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Behavior Assessed",
      description: "Evaluation to ensure readiness for adoption.",
      bg: "bg-primary/10",
      text: "text-primary",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-16 md:py-24 px-4">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="flex flex-col md:flex-row items-stretch">
          {/* Left Content */}
          <div className="flex-1 px-6 py-10 md:px-10 md:py-12">
            {/* Heading */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>

              <h2
                className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Health & Safety
                <span className="text-primary"> Assurance</span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-base leading-7 max-w-2xl mb-10">
              Every pet&apos;s health and safety is our top priority.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((item, index) => (
                <div key={index} className="group transition-all duration-300">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${item.bg} ${item.text}`}
                  >
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h4 className="text-base font-semibold text-foreground mb-2">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative md:w-[38%] min-h-80">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAb_nlTrGevtwP2kFLPix6UTdsIQ8Wasbb3xWezf7tX_hrD4EflpPlVuc0Hg8ha2A3zOSkpYiphM8elORTUwMZsHPj2NoP8ywQus4mnijII08qPs6AK0eOzu9FViV-jFIahfgFeCR2euJS4_giRvqinxpYfh02bp6Q4xRULHWtUe_6Op98C3IbitXNK0c6ZDTaDGE-VyxLC0j0K8lUqjAlowl9_v-jQ9KKB2GiQ95Zk3E29q-aRM_1pjGz6MNAbgWSCB9sQI8cTUHE"
              alt="Veterinarian with puppy"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
