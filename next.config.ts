/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: export for development with middleware
  // Only use output: export when building for production Electron app
  ...(process.env.NODE_ENV === 'production' && process.env.BUILD_STATIC === 'true' 
    ? { 
        output: 'export',
        trailingSlash: true,
        images: {
          unoptimized: true
        }
      } 
    : {}),
  
  // Enable experimental features if needed
  experimental: {
    serverComponentsExternalPackages: ['@clerk/backend']
  },
  
  // Webpack configuration for Electron compatibility
  webpack: (config: import("webpack").Configuration, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;