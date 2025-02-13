/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone', 
	experimental: {
	  webpackMemoryOptimizations: true 
	},
	webpack: (config) => {
	  
	  if (process.env.ANALYZE === 'true') {
		const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
		config.plugins.push(new BundleAnalyzerPlugin());
	  }
	  return config;
	}
  };
  
  module.exports = nextConfig;
  