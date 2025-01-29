'use client'

import Hero from "@/components/landing/Hero";
import ExploreProduct from "@/components/landing/ExploreProduct";
import Footer from "@/components/landing/Footer";
import Navbar from "../components/landing/Navbar";
import PushHelpChat from "@/components/landing/PushHelpChat";

// Import restapi for function calls
// Import socket for listening for real time messages
import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';

// Ethers or Viem, both are supported
import { ethers } from 'ethers';
import { useState, useRef, useEffect } from 'react';

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
