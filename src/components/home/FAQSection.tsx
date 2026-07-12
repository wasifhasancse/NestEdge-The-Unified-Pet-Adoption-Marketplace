import Image from "next/image";
import FAQAccordion from "../ui/FAQAccordion";
import React from "react";

const faqs = [
  {
    icon: "payments",
    question: "How much does it cost to adopt a pet?",
    answer:
      "Adoption fees vary depending on the pet, but they usually cover vaccinations, checkups, and initial care.",
  },
  {
    icon: "undo",
    question: "Can I return a pet if it doesn’t work out?",
    answer:
      "Yes, we provide a safe return policy to ensure both you and the pet are comfortable.",
  },
  {
    icon: "vaccines",
    question: "Are the pets vaccinated and healthy?",
    answer:
      "All pets are vaccinated, health-checked, and ready for a loving home.",
  },
  {
    icon: "schedule",
    question: "How long does the adoption process take?",
    answer:
      "The process usually takes a few days depending on verification and approval.",
  },
  {
    icon: "support_agent",
    question: "Do you have any post-adoption support?",
    answer: "Yes, we provide ongoing support including guidance and check-ins.",
  },
];

const FAQSection: React.FC = () => {
  return (
    <div className="bg-card py-16 md:py-20 my-4 px-4">
      <section className="max-w-7xl mx-auto rounded-xl p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end bg-muted">
        {/* LEFT */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h2
              className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4 leading-tight"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              FAQ
              <span className="text-primary"> Section</span>
            </h2>

            <p className="max-w-2xl mx-auto text-muted-foreground text-base md:text-lg leading-relaxed">
              Find answers to the most common questions about pet adoption.
              We&apos;re here to guide you through every step of the journey.
            </p>
          </div>

          <FAQAccordion faqs={faqs} />
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-5 bg-card rounded-xl p-6 shadow-sm border border-border text-center">
          <div className="rounded-lg overflow-hidden mb-4">
            <Image
              src='https://images.unsplash.com/photo-1570018144715-43110363d70a?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt="Pets"
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
          </div>

          <h3 className="text-lg font-semibold text-card-foreground">
            Still have questions?
          </h3>

          <p className="text-muted-foreground mt-1 mb-4">We&apos;re here to help!</p>

          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-sm hover:opacity-90 transition cursor-pointer">
            CONTACT US
          </button>
        </div>
      </section>
    </div>
  );
};

export default FAQSection;
