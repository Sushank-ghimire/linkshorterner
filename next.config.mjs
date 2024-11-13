import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DOMAIN: process.env.DOMAIN,
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESENT:
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESENT,
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
