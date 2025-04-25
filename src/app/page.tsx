'use client'

import Hero from "@/components/landing/hero/Hero";
import VideoDemoSection from "@/components/landing/video/VideoDemoSection";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/navbar/Navbar";
import FoundersSection from "@/components/landing/founders/FoundersSection";
import FaqSection from "@/components/landing/faq/FaqSection";
import CompaniesSection from "@/components/landing/CompaniesSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <VideoDemoSection />  
      <CompaniesSection/>
      <FaqSection/>
      <Footer />
    </main>
  );
} 
