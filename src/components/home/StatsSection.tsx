"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { PawPrint, Home, Star, Clock } from "lucide-react";

interface CounterProps {
  value: number;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ value, suffix = "" }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true });

  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(latest) {
          setDisplayValue(Math.floor(latest));
        },
      });

      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
};

const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: PawPrint,
      value: 2500,
      suffix: "+",
      label: "Pets Adopted",
    },
    {
      icon: Home,
      value: 1800,
      suffix: "+",
      label: "Happy Families",
    },
    {
      icon: Star,
      value: 98,
      suffix: "%",
      label: "Satisfaction Rate",
    },
    {
      icon: Clock,
      value: 24,
      suffix: "/7",
      label: "Support Available",
    },
  ];

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-background">
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-5">
            <PawPrint className="w-4 h-4" />
            Trusted By Pet Lovers
          </span>

          <h2
            className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Making Thousands Of Pets
            <span className="text-primary"> Happy</span>
          </h2>

          <p className="max-w-2xl mx-auto text-muted-foreground text-base md:text-lg leading-relaxed">
            We connect loving families with adorable pets and provide a safe,
            caring adoption experience for everyone.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card/80 backdrop-blur-xl p-6 md:p-8 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-br from-primary/10 via-transparent to-accent/10 transition-opacity duration-500" />

              {/* Icon */}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-primary" strokeWidth={1.8} />
              </div>

              {/* Number */}
              <h3 className="relative z-10 text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </h3>

              {/* Label */}
              <p className="relative z-10 text-sm md:text-lg font-medium text-muted-foreground">
                {stat.label}
              </p>

              {/* Bottom Border */}
              <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-primary transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
