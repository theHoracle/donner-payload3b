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
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SERVER_URL || 'donner-payload3b.vercel.app',
        pathname: '/_next/image**', // allow images processed by Next.js
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SERVER_URL || 'donner-payload3b.vercel.app',
        pathname: '/api/media/file/**', //  allow media files from API
      },
    ],
  },

};

export default withPayload(nextConfig);
