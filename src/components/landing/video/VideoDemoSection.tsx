"use client";

import { FC } from "react";

const features = [
  "Automatic risk scoring per wallet",
  "Real-time alerts via API",
  "AI-generated reports, auditable and downloadable"
];

const VideoDemoSection: FC = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-6">
          Detect. Score. Alert. — In Seconds
        </h2>
        <p className="text-lg sm:text-xl text-center text-gray-600 mb-16 leading-relaxed lg:whitespace-nowrap">
        Discover how Wavy Node detects, scores, and reports malicious activity in real time — before it becomes a threat.
        </p>


        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Video */}
          <div className="w-full lg:w-1/2">
            <video
              className="w-full rounded-2xl shadow-2xl"
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

          {/* Feature list */}
          <div className="w-full lg:w-1/2 space-y-8">
            {features.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-2.5 h-2.5 mt-2 rounded-full bg-black" />
                <p className="text-lg sm:text-xl text-gray-800 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoDemoSection;
