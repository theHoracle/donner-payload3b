import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: false
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/api/media/file/**', //  allow only media files from API
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_HOSTNAME || 'vercel',
        pathname: '/api/media/file/**', 
      },
    ],
  },

};

export default withPayload(nextConfig);
