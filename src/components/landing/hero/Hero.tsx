"use client";

import { useState } from "react";
import { ArrowRight, PlayCircle } from "lucide-react";
import { TallyModal } from "@/components/landing/TallyModal";
import SponsorBanner from "@/components/landing/hero/SponsorBanner";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative flex items-center min-h-screen overflow-hidden bg-gradient-to-br from-[#eaf6ff] via-[#dbeefc] to-[#c7e1f9] transition-colors duration-700 ease-in-out">
      {/* Light blur aura */}
      <div className="absolute right-0 top-1/2 w-[588px] h-[509px] bg-[#004688] blur-[300px] opacity-50 translate-y-[-50%] -z-10" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Section */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
                AI-powered fraud & risk detection for crypto payments in Latam
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-700 max-w-2xl leading-relaxed">
                Ensure regulatory compliance and reduce risk with automated KYT (Know Your Transaction) reports tailored to crypto and stablecoin operations in Latin America.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center px-8 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-medium transition shadow-xl"
              >
                Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              {/* <a
                href="https://docs.wavynode.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-8 py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-xl font-medium transition shadow-md"
              >
                Launch App <PlayCircle className="ml-2 h-5 w-5" />
              </a> */}
            </div>

            {/* Sponsors */}
            <div className="pt-10">
              <SponsorBanner />
            </div>
          </div>

          {/* Right Section - Image with blur background */}
          <div className="lg:col-span-5 relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[588px] h-[509px] bg-[#004688] blur-[300px] opacity-60 rounded-[48px] -z-10" />
            <img
              src="/assets/aset.png"
              alt="Wavy Node context image"
              className="w-full max-w-lg object-cover rounded-[24px] shadow-2xl"
            />
          </div>
        </div>
      </div>

      <TallyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Hero;