"use client";

import { useState, FC } from "react";
import { TallyModal } from "@/components/landing/TallyModal";
import { ArrowRight } from "lucide-react";

const companies = [
  "Financial Institutions",
  "Electronic Payment Providers",
  "Centralized Exchanges",
  "Startups"
];

const CompaniesSection: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="bg-[#eaf6fc] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Left */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
              What kind of companies <br className="hidden sm:block" />
              use Wavy Node to be <br className="hidden sm:block" />
              compliant and secure?
            </h2>
          </div>

          {/* Right */}
          <div className="space-y-4">
            {companies.map((c, i) => (
              <div
                key={i}
                className="border-b border-gray-300 pb-2 text-lg text-gray-800"
              >
                {c}
              </div>
            ))}
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-8 flex items-center justify-center px-8 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-medium transition shadow-xl"
            >
              REQUEST A DEMO <ArrowRight className="ml-2 h-5 w-5" />
            </button>

          </div>
        </div>
      </div>

      <TallyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default CompaniesSection;
