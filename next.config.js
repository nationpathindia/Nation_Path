/** @type {import('next').NextConfig} */

const nextConfig = {
  // Enable gzip/brotli compression
  compress: true,

  // Remove "X-Powered-By" header
  poweredByHeader: false,

  // React strict mode (development only)
  reactStrictMode: true,

  images: {
    // Next.js 15 recommended configuration
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],

    // Modern image formats
    formats: ["image/avif", "image/webp"],

    // Cache optimized images
    minimumCacheTTL: 31536000,

    // Responsive breakpoints
    deviceSizes: [
      320,
      420,
      640,
      768,
      1024,
      1280,
      1536,
      1920,
    ],

    imageSizes: [
      16,
      32,
      48,
      64,
      96,
      128,
      256,
      384,
    ],
  },

  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
    },

    serverComponentsExternalPackages: [
      "@swisseph/node",
    ],
  },

  staticPageGenerationTimeout: 0,
};

module.exports = nextConfig;