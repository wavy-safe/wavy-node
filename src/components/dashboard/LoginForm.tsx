"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

export default function LoginForm() {
  const { login, authenticated, user, logout } = usePrivy();
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    try {
      await login(email); // Inicia sesión con el email
      alert("Inicio de sesión exitoso");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      {!authenticated ? (
        <>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleLogin}
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Iniciar Sesión
          </button>
        </>
      ) : (
        <div>
          <p>Bienvenido, {user?.email}</p>
          <button
            onClick={logout}
            className="mt-4 bg-red-500 text-white p-2 rounded"
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}
