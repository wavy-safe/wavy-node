"use client";

import { useEffect } from "react";

export const TallyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  useEffect(() => {
    if (isOpen) {
      const script = document.createElement("script");
      script.src = "https://tally.so/widgets/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
          ✕
        </button>
        <iframe
          data-tally-src="https://tally.so/r/nrJoOL?transparentBackground=1"
          width="100%"
          height="500px"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="Wait List"
        ></iframe>
      </div>
    </div>
  );
};

