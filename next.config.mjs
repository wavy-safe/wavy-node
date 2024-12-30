/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Optimiza la construcción para despliegue
  experimental: {
    appDir: true, // Habilita el uso del nuevo sistema de directorios en Next.js
  },
};

export default nextConfig;
