import Banner from "@/components/home/Banner";
import FAQSection from "@/components/home/FAQSection";
import FeaturedPets from "@/components/home/FeaturedPets";
import HealthSafetySection from "@/components/home/HealthSafetySection";
import PetBlog from "@/components/home/PetBlog";
import PetCareServices from "@/components/home/PetCareServices";
import StatsSection from "@/components/home/StatsSection";
import SuccessStories from "@/components/home/SuccessStories";
import WhyAdoptSection from "@/components/home/WhyAdoptSection";
import React from "react";

export default function Home() {
  return (
    <div>
      <Banner />
      <StatsSection />
      <FeaturedPets />
      <WhyAdoptSection />
      <SuccessStories />
      <FAQSection />
      <PetBlog />
      <PetCareServices />
      <HealthSafetySection />
    </div>
  );
}
