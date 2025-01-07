/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone', // Habilita el despliegue optimizado para plataformas como Cloudflare
	experimental: {
		optimizePackageImports: ["@privy-io/react-auth", "ai"],
		webpackMemoryOptimizations: true
	}
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
