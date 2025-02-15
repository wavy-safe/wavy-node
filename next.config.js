/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
  
	experimental: {
	  webpackMemoryOptimizations: true,
	  optimizeCss: true,
	  nextScriptWorkers: true,
	},
  
	compress: true,
  
	webpack: (config, { isServer }) => {
	  if (!isServer) {
		config.optimization.splitChunks = {
		  chunks: "all",
		  minSize: 20000,
		  maxSize: 240000,
		};
	  }
  
	  if (process.env.ANALYZE === "true") {
		const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
		config.plugins.push(new BundleAnalyzerPlugin());
	  }
  
	  return config;
	},
  
	modularizeImports: {
	  lodash: {
		transform: "lodash-es/{{member}}",
	  },
	  moment: {
		transform: "moment/{{member}}",
	  },
	},
  };
  
  module.exports = nextConfig;
  