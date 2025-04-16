"use client";

import { useState } from "react";
import { ArrowRight, PlayCircle } from "lucide-react";
import { TallyModal } from "@/components/landing/TallyModal";
import SponsorBanner from "@/components/landing/hero/SponsorBanner";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      className="relative flex items-center min-h-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/assets/wavybackground.png')", // ✅ asegúrate que el nombre es exacto
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Section */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              AI-powered Threat Detection & Transaction Analysis
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-700 max-w-2xl">
              Monitor, identify, and track malicious wallets. Stay ahead of
              threats with detailed activity reports, preventing high-risk
              interactions for dApps and exchanges.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center px-8 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-medium transition"
              >
                Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <a
                href="https://docs.wavynode.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-8 py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-xl font-medium transition shadow-md"
              >
                Launch App <PlayCircle className="ml-2 h-5 w-5" />
              </a>
            </div>

            {/* Sponsors */}
            <div className="mt-12">
              <SponsorBanner />
            </div>
          </div>

          {/* Right Section - Feature Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-black to-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-white">For dApps</h3>
              <p className="mt-2 text-sm text-gray-300">
                Prevent high-risk transactions with real-time wallet analysis and scoring.
              </p>
            </div>
            <div className="bg-gradient-to-br from-black to-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-white">For Exchanges</h3>
              <p className="mt-2 text-sm text-gray-300">
                Protect users with real-time wallet risk scoring, alerts, and compliance.
              </p>
            </div>
          </div>
        </div>
      </div>

      <TallyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Hero;
