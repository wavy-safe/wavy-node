'use client'

import Hero from "@/components/landing/hero/Hero";
import VideoDemoSection from "@/components/landing/video/VideoDemoSection";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/navbar/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <VideoDemoSection />
      <Footer />
    </main>
  );
} 
