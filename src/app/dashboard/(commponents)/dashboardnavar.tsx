"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alchemy, Network } from "alchemy-sdk";

// Configura Alchemy SDK con tu clave API
const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, // Asegúrate de tener la clave API en tus variables de entorno
  network: Network.ETH_MAINNET, // Red de Ethereum principal, puedes cambiarla si es necesario
};

const alchemy = new Alchemy(settings);

export default function DashboardNav() {
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      setError(""); // Resetear error antes de una nueva búsqueda
      // Validar que la dirección no esté vacía
      if (!address) {
        setError("Please enter a valid address.");
        return;
      }

      // Consultar información de la dirección usando Alchemy SDK
      const balance = await alchemy.core.getBalance(address);

      // Asegurarse de que se convierta a string antes de renderizar
      setStatus(balance.toString());
    } catch (err) {
      setError("Error fetching data. Please ensure the address is valid.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-[#EAF0F5]">
      <div className="w-full max-w-md mt-12">
        <div className="flex flex-col items-center mb-8">
          <img src="/wavyNode.svg" alt="Logo" className="h-12 mb-4" />
          <h1 className="text-3xl font-semibold text-gray-900">Wavy Node</h1>
        </div>

        <div className="w-full max-w-md">
          <div className="flex items-center bg-[#1F2937] rounded-full shadow-md">
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              className="flex-1 rounded-l-full border-none bg-[#1F2937] text-white px-4 py-3 focus:outline-none"
            />
            <Button
              onClick={handleSearch}
              className="rounded-r-full bg-[#111827] text-white px-6 py-3 hover:bg-[#374151] transition-all"
            >
              Search
            </Button>
          </div>
          <p className="text-gray-500 mt-2 text-center">
            Find the status of an address
          </p>
          {status && (
            <p className="text-center text-green-500 mt-4">
              Balance: {status} wei
            </p>
          )}
          {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
}
