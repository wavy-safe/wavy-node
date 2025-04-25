"use client";

import { FC } from "react";

const features = [
  "Automated history and risk reports for wallets that interact with your business.",
  "Real-time transaction verification aligned with local regulatory frameworks in Latam.",
  "Time and effort savings for compliance and fraud prevention teams."
];

const VideoDemoSection: FC = () => {
  return (
    <section className="bg-[#eaf6fc] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">
          On-chain monitoring with local compliance.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Video */}
          <div>
            <video
              className="w-full rounded-2xl shadow-xl"
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              poster="/assets/wavybackground.png"
            >
              <source src="/assets/wavy_wnborders.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Features */}
          <div className="space-y-10">
            {features.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="mt-2 w-2.5 h-2.5 bg-gray-900 rounded-full flex-shrink-0" />
                <p className="text-lg sm:text-xl text-gray-800 leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoDemoSection;