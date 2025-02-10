'use client'

import Hero from "@/components/landing/Hero";
import ExploreProduct from "@/components/landing/ExploreProduct";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import PushHelpChat from "@/components/landing/PushHelpChat";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <PushHelpChat />
      <ExploreProduct />
      <Footer />
    </main>
  );
} 
