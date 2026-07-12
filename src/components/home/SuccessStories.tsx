"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCreative } from "swiper/modules";
import { Star, Quote, PawPrint } from "lucide-react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

interface StoryItem {
  name: string;
  role: string;
  image: string;
  review: string;
}

const stories: StoryItem[] = [
  {
    name: "Ayesha Rahman",
    role: "Pet Adopter, Dhaka",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
    review:
      "Adopting my cat from this platform was the best decision of my life. The process was smooth, safe, and very caring.",
  },
  {
    name: "Tanvir Hossain",
    role: "Dog Adopter, Chattogram",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
    review:
      "I found my best friend here. The adoption process was simple and the support team was very helpful.",
  },
  {
    name: "Nusrat Jahan",
    role: "Pet Lover",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
    review:
      "This platform truly cares about animals. I adopted a rescued puppy and the experience was heartwarming.",
  },
  {
    name: "Mehedi Hasan",
    role: "First-time Adopter",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400",
    review:
      "I was nervous at first, but everything was handled professionally. My new pet is now part of my family.",
  },
  {
    name: "Farhana Ahmed",
    role: "Animal Rescuer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400",
    review:
      "It’s amazing to see so many pets finding loving homes through this platform. Highly recommended!",
  },
];

const SuccessStories: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24 px-5 md:px-10">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-125 w-125 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-75 w-75 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      {/* Shape */}
      <div className="absolute top-0 right-0 h-full w-[60%] opacity-10 pointer-events-none">
        <svg
          className="w-full h-full fill-current text-primary"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 0 200 C 0 50 150 0 200 0 S 400 50 400 200 S 250 400 200 400 S 0 350 0 200" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-5 uppercase">
            <PawPrint className="w-4 h-4" />
            success stories
          </span>

          <h2
            className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4 leading-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            What People
            <span className="text-primary"> Are Saying</span>
          </h2>

          <p className="max-w-2xl mx-auto text-muted-foreground text-base md:text-lg leading-relaxed">
            Real stories from happy families who found their perfect companion and experienced the joy of adoption at NestEdge.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Autoplay, EffectCreative]}
          effect="creative"
          centeredSlides={true}
          grabCursor={true}
          loop={true}
          initialSlide={2}
          speed={1200}
          observer={true}
          observeParents={true}
          watchSlidesProgress={true}
          updateOnWindowResize={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          creativeEffect={{
            limitProgress: 3,
            prev: {
              shadow: false,
              translate: ["-95%", 0, -300],
              rotate: [0, 0, -12],
              scale: 0.82,
              opacity: 0.45,
            },
            next: {
              shadow: false,
              translate: ["95%", 0, -300],
              rotate: [0, 0, 12],
              scale: 0.82,
              opacity: 0.45,
            },
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1.3,
            },
            1024: {
              slidesPerView: 2.2,
            },
            1400: {
              slidesPerView: 2.6,
            },
          }}
          className="testimonial-swiper"
        >
          {stories.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="py-10 px-3">
                <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-card/70 p-8 md:p-12 transition-all duration-700 hover:-translate-y-3">
                  {/* Glow */}
                  <div className="absolute -top-20 -right-20 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />

                  {/* Quote */}
                  <div className="absolute top-7 right-7 opacity-10">
                    <Quote className="w-20 h-20 text-primary" />
                  </div>

                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Image */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl scale-110" />

                      <Image
                        src={item.image}
                        alt={item.name}
                        width={110}
                        height={110}
                        className="relative z-10 h-24 w-24 md:h-28 md:w-28 rounded-full border-4 border-background object-cover shadow-2xl"
                      />
                    </div>

                    {/* Name */}
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {item.name}
                    </h3>

                    {/* Role */}
                    <p className="text-sm uppercase tracking-[0.25em] text-primary font-medium mb-6">
                      {item.role}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-8">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-5 h-5 fill-primary text-primary"
                        />
                      ))}
                    </div>

                    {/* Review */}
                    <blockquote className="text-lg md:text-xl leading-relaxed text-foreground/90 italic">
                      “{item.review}”
                    </blockquote>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SuccessStories;
