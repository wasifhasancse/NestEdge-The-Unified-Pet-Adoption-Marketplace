"use client";

import React, { useState } from "react";
import {
  CreditCard,
  RotateCcw,
  Syringe,
  Clock,
  Headset,
  ChevronDown,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  payments: CreditCard,
  undo: RotateCcw,
  vaccines: Syringe,
  schedule: Clock,
  support_agent: Headset,
};

interface FAQItem {
  icon: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const Icon = iconMap[faq.icon];

        return (
          <div
            key={index}
            onClick={() => toggle(index)}
            className="bg-card border border-border rounded-lg p-4 cursor-pointer transition hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {Icon && <Icon className="w-5 h-5 text-primary" />}
                <p className="text-sm md:text-base font-medium text-card-foreground">
                  {faq.question}
                </p>
              </div>

              <ChevronDown
                className={`w-5 h-5 text-muted-foreground transition-transform ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>

            {activeIndex === index && (
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
