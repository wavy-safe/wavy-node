"use client";

import Image from "next/image";

const founders = [
  {
    name: "Ale RaMo – CEO",
    role: "Business Development",
    image: "/assets/Ale.png",
    bio: "Ale leads the strategic direction and partnerships at Wavy Node. He brings experience from the Mexican Congress and the public-private innovation ecosystem, focusing on creating scalable impact through technology.",
    past: "Past collaborations: Cámara de Diputados, Kolabora, Green Coin Protocol"
  },
  {
    name: "Frida Ruh – COO",
    role: "AI Specialist",
    image: "/assets/Frida.png",
    bio: "Frida is an AI strategist with deep expertise in ethical AI and financial applications. She has led AI projects at Google and Santander and is a recognized voice in the Latin American tech community.",
    past: "Past roles: Google, Santander, Justo"
  },
  {
    name: "Eder Martínez – CTO",
    role: "Full Stack Developer",
    image: "/assets/Eder.png",
    bio: "Eder is a full stack engineer passionate about decentralization and open-source development. He has built scalable infrastructure for crypto media platforms and research communities.",
    past: "Past affiliations: Espacio Cripto, UNAM"
  }
];

const FoundersSection = () => {
  return (
    <section className="bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4">Meet the Founders</h2>
        <p className="text-xl text-center text-gray-400 mb-16">
          Built by experts in business, AI, and web3 security.
        </p>

        <div className="space-y-24">
          {founders.map((founder, idx) => (
            <div
              key={idx}
              className="flex flex-col lg:flex-row items-center gap-12"
            >
              <div className="w-full lg:w-1/3 flex justify-center">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  width={192}
                  height={192}
                  className="rounded-full object-cover h-48 w-48"
                />
              </div>
              <div className="w-full lg:w-2/3">
                <h3 className="text-2xl font-bold">{founder.name}</h3>
                <p className="text-lg text-gray-400 mb-4">{founder.role}</p>
                <p className="text-gray-300 mb-4">{founder.bio}</p>
                <p className="text-sm text-gray-400">{founder.past}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
