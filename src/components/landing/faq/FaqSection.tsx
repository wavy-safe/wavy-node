"use client";

import { useState, FC } from "react";
import { ChevronDown } from "lucide-react";

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
  return (
    <section className="bg-gray-50 py-24">
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
            answer="We are currently integrated with Ethereum, Arbitrum, Polygon, Optimism, and many more. Support for networks like Bitcoin is coming soon."
          />
          <FAQ 
            question="How do you detect if a wallet is malicious?"
            answer="We use machine learning models and rule-based risk scoring powered by historical transactions, blacklisted wallets, and suspicious activity patterns."
          />
          <FAQ 
            question="Can I integrate alerts into my platform?"
            answer="Yes. We provide API endpoints that allow you to integrate alerts, reports, and wallet risk scoring directly into your exchange, wallet, or dApp."
          />
          <FAQ 
            question="What kind of reports do you offer?"
            answer="We generate detailed activity reports, high-risk interaction logs, AML risk scores, and wallet links to known exploits or sanctioned entities."
          />
          <FAQ 
            question="Do you comply with global standards like FATF?"
            answer="Yes. Wavy Node is built based on FATF recommendations, adapted to decentralized environments. We support AML compliance in Web3 ecosystems, with a special focus on Latin America."
          />
          <FAQ 
            question="Can I try the platform before integrating it?"
            answer="Absolutely. You can request a personalized demo or create an account to explore our app using test data."
          />
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
