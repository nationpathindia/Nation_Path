/** @type {import('next').NextConfig} */

const nextConfig = {

  images: {
    domains: [
      "res.cloudinary.com",
      "images.unsplash.com",
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