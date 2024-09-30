import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DOMAIN: process.env.DOMAIN,
  },
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "api.qrserver.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
