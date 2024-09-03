"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleSearchClick = () => {
    router.push("/dashboard"); // Redirige a la página de búsqueda
  };

  return (
    <header className="flex justify-between items-center p-5 bg-white shadow">
      <a href="./">
        <Image
          src="/wavyNode.svg"
          alt="WavyNode Logo"
          width={100}
          height={50}
        />
      </a>
      <h1 className="text-3xl font-medium text-gray-800">Wavy Node</h1>
      <button
        className="bg-gray-800 text-white text-sm py-1 px-3 rounded-full"
        onClick={handleSearchClick}
      >
        Platform
      </button>
    </header>
  );
}
