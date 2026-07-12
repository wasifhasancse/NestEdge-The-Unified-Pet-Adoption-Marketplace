import React from "react";
import {
  Stethoscope,
  Scissors,
  Heart,
  Home,
  Calendar,
  PawPrint,
  ShieldCheck,
  Star,
  Ambulance,
} from "lucide-react";

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const PetCareServices: React.FC = () => {
  const services: ServiceItem[] = [
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Veterinary Clinic",
      description:
        "Expert medical care for your pets with experienced veterinarians and modern facilities.",
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      title: "Grooming Salon",
      description:
        "Professional grooming services including bathing, trimming, nail care & styling.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Wellness & Vaccination",
      description:
        "Regular health checkups, vaccinations, and preventive care programs.",
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Pet Boarding",
      description:
        "Safe and comfortable boarding facilities with 24/7 monitoring and play areas.",
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 px-4 bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-muted rounded-2xl">
                <PawPrint className="w-10 h-10 text-primary" />
              </div>

              <h2
                className="text-3xl md:text-5xl font-bold text-foreground tracking-tight "
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Services For
                <span className="text-primary"> Your Pet Care</span>
              </h2>
            </div>

            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
              Quality services we provide for your beloved pets. Pick the best
              option for their health and happiness.
            </p>
          </div>

          {/* Button */}
          <button className="group flex items-center gap-3 bg-card text-primary hover:opacity-90 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-xl active:scale-95 cursor-pointer">
            <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Book an Appointment
          </button>
        </div>
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card text-card-foreground rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full border border-border"
            >
              {/* Icon */}
              <div className="mb-8 p-4 bg-muted w-fit rounded-2xl group-hover:bg-muted/70 transition-colors">
                <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>

              <p className="text-muted-foreground leading-relaxed flex-1">
                {service.description}
              </p>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between text-sm">
                <span className="text-primary font-medium flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer">
                  Learn more →
                </span>

                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <PawPrint className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center text-muted-foreground text-sm flex flex-wrap justify-center gap-x-10 gap-y-4">
          <div className="flex items-center gap-2">
            <Ambulance className="w-4 h-4 text-primary" />
            <span>24/7 Emergency Care</span>
          </div>

          <div className="flex items-center gap-2">
            <PawPrint className="w-4 h-4 text-primary" />
            <span>5000+ Happy Pets</span>
          </div>

          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-primary" />
            <span>4.9/5 Average Rating</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Licensed Professionals</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetCareServices;
