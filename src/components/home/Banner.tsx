"use client";

import { motion } from "framer-motion";
import { ArrowRight, PawPrint } from "lucide-react";
import Link from "next/link";
import React, {
    useEffect,
    useRef,
    useState,
    useSyncExternalStore,
} from "react";
import type { Swiper as SwiperClass } from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const Banner: React.FC = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // Dark mode slider images
  const slidesDark = [
    "https://images.unsplash.com/photo-1708097672571-3d30ef56fe74",
    "https://images.unsplash.com/photo-1761850506365-90f8dcf5db77",
    "https://images.unsplash.com/photo-1737915235106-6dbc4b1bcc4f",
    "https://images.unsplash.com/photo-1512027792141-80e5842b87c8",
    "https://images.unsplash.com/photo-1728118257046-df9728875eb2",
  ];

  // Light mode slider images
  const slidesLight = [
    "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0",
    "https://images.unsplash.com/photo-1663127046003-ef3ec7ce7bc4",
    "https://images.unsplash.com/photo-1664371675060-87e49122263c",
    "https://images.unsplash.com/photo-1565712546991-158cb3885821",
    "https://images.unsplash.com/photo-1696334137510-5025957ef28e"
  ];

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const currentSlides = isDarkMode ? slidesDark : slidesLight;

  if (!mounted) {
    return (
      <section className="relative h-[70vh] md:h-[80vh] lg:h-screen w-full bg-background" />
    );
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background Slider */}
      <Swiper
        key={isDarkMode ? "dark" : "light"}
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        speed={1200}
        loop
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="overflow-hidden animate-fade-in"
      >
        {currentSlides.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[80vh] lg:h-screen w-full overflow-hidden">
              <div
                style={{
                  backgroundImage: `url(${image})`,
                }}
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-b from-background/30 via-background/25 to-background/95 dark:from-black/40 dark:via-black/20 dark:to-background" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative inline-flex items-center gap-2 overflow-hidden rounded-full p-px mb-6"
          >
            {/* Animated Border */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,var(--primary),transparent)]"
            />

            {/* Content */}
            <div className="relative z-10 inline-flex items-center gap-2 rounded-full bg-card/85 backdrop-blur-xl px-5 py-2 text-sm text-foreground shadow-lg border border-border/20">
              <PawPrint size={16} className="text-primary animate-pulse" />
              Find Your Forever Companion
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Discover Your{" "}
            <span className="block bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              NestEdge Companion
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-6 max-w-2xl mx-auto text-base md:text-lg lg:text-xl leading-relaxed text-foreground/80"
          >
            Adopt a loving pet and give them the cozy nest they deserve.
            Experience unconditional love, happiness, and companionship that
            fills your life with warmth every single day.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            {/* Primary Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/all-pets"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-primary px-8 py-4 text-base md:text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              >
                <span className="absolute inset-0 overflow-hidden rounded-2xl">
                  <span className="absolute left-[-120%] top-0 h-full w-[80%] rotate-12 bg-white/20 blur-2xl transition-all duration-700 group-hover:left-[140%]" />
                </span>
                <span className="absolute inset-0 bg-white/0 transition duration-300 group-hover:bg-white/5" />
                <span className="relative z-10">Adopt Now</span>
                <ArrowRight
                  size={20}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            {/* Secondary Button */}
            <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/blogs"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-primary/20 bg-card/70 backdrop-blur-xl px-8 py-4 text-base md:text-lg font-semibold text-foreground shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-[0_10px_30px_rgba(var(--primary-rgb),0.18)]"
              >
                <span className="absolute bottom-0 left-0 h-0 w-full bg-primary transition-all duration-300 group-hover:h-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-primary-foreground">
                  Read Blogs
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Pagination Styling */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 25px !important;
        }

        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.45);
          opacity: 1;
          transition: all 0.3s ease;
        }

        .dark .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.3);
        }

        .swiper-pagination-bullet-active {
          width: 30px;
          border-radius: 999px;
          background: var(--primary) !important;
        }
      `}</style>
    </section>
  );
};

export default Banner;
