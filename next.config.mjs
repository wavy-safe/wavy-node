/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Habilita el despliegue optimizado para plataformas como Cloudflare
  experimental: {
    appDir: true, // Habilita el uso del nuevo sistema de directorios en Next.js
  },
};

export default nextConfig;
