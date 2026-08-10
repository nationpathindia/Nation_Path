/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  compress: true,

  poweredByHeader: false,

  reactStrictMode: true,

  images: {
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

    formats: ["image/avif", "image/webp"],

    minimumCacheTTL: 31536000,

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

module.exports = withBundleAnalyzer(nextConfig);