/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	reactStrictMode: true,
	productionBrowserSourceMaps: true, // 👈 ayuda a depurar errores de hidratación
	experimental: {
	  webpackMemoryOptimizations: true, // está bien
	  // ⚠️ eliminamos serverActions y reactRoot
	},
	webpack: (config) => {
	  if (process.env.ANALYZE === 'true') {
		const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
		config.plugins.push(new BundleAnalyzerPlugin());
	  }
	  return config;
	},
  };
  
  module.exports = nextConfig;
  