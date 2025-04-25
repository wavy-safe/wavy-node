"use client";

import Image from "next/image";

const sponsors = [
  { name: "Arbitrum", src: "/assets/arbitrum.png" },
  { name: "dRPC", src: "/assets/DRPC.png" },
  { name: "Odisea", src: "/assets/odisea.png" },
  { name: "Mantle", src: "/assets/mantle.png" },
];

const SponsorBanner = () => {
  return (
    <div className="mt-16 w-full flex flex-col items-center">
      <p className="text-sm sm:text-base text-gray-400 font-medium mb-6 tracking-wide">
        Trusted by
      </p>

      {/* Logos centrados en una sola línea sin scroll */}
      <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
        {sponsors.map((sponsor, index) => (
          <div
            key={index}
            className="grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition duration-300 ease-in-out"
          >
            <Image
              src={sponsor.src}
              alt={sponsor.name}
              width={90} // 👈 más pequeño que antes
              height={30}
              className="h-8 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorBanner;
