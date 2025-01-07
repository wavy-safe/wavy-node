/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone', // Habilita el despliegue optimizado para plataformas como Cloudflare
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
