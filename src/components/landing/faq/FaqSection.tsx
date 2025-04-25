"use client";

import { useState, FC } from "react";
import { ChevronDown } from "lucide-react";
import { TallyModal } from "@/components/landing/TallyModal"; 

interface FAQProps {
  question: string;
  answer: string;
}

const FAQ: FC<FAQProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`transition-all duration-300 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm ${
        open ? "ring-2 ring-blue-200" : ""
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-5 text-left text-gray-800 font-medium hover:bg-gray-50"
      >
        <span className="text-base sm:text-lg">{question}</span>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-300 ${
            open ? "rotate-180 text-blue-600" : "rotate-0"
          }`}
        />
      </button>
      <div
        className={`px-6 pb-6 text-gray-600 text-sm sm:text-base leading-relaxed transition-all duration-300 ${
          open ? "block" : "hidden"
        }`}
      >
        {answer}
      </div>
    </div>
  );
};

const FaqSection: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 

  return (
    <section className="bg-[#eaf6fc] py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-500 text-lg mb-12">
          Everything you need to know about how Wavy Node works.
        </p>
        <div className="space-y-5">
          <FAQ 
            question="What networks does Wavy Node currently support?"
            answer="We currently monitor Ethereum, Arbitrum, Celo, Optimism, Base, Polygon. We are constantly expanding our coverage and offer customized integration according to each client's stack."
          />
          <FAQ 
            question="Does it comply with local regulations in Latin America?"
            answer="Yes. We adapt our reporting and risk criteria to the regulations in force in each country of the region where our clients operate."
          />
          <FAQ 
            question="How fast are alerts or reports generated?"
            answer="Background reports and risk alerts are generated in real time, allowing agile decisions without operational friction."
          />
          <FAQ 
            question="What level of customization do you offer in the reports?"
            answer="You can adjust risk levels, regulatory criteria and report formats according to the needs of your legal, compliance or audit team."
          />
          <FAQ 
            question="Can it be integrated with our current systems?"
            answer="Yes, through a simple API to integrate directly into your payment flow, monitoring or compliance, as well as customizable dashboards."
          />
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-xl sm:text-2xl font-medium text-gray-800 mb-6">
            Learn how your team can automate compliance and mitigate risk in seconds.
          </h3>
          <button
            onClick={() => setIsModalOpen(true)} 
            className="mt-8 px-8 py-3 rounded-xl bg-gray-900 hover:bg-black text-white font-medium shadow-xl transition"
          >
            REQUEST A DEMO
          </button>
        </div>
      </div>

      <TallyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default FaqSection;
