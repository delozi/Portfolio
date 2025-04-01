const { withPayload } = require('@payloadcms/next/withPayload')
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development'
  },
  // Handle API routes in development and production
  rewrites: async () => {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3000/api/:path*',
        },
      ]
    }
    return []
  }
}

module.exports = withPayload(nextConfig, {
  // Make sure this matches your environment variable
  configPath: path.resolve(process.cwd(), "./payload.config.ts"),
  
  // Other options
  devBundleServerPackages: false
}) 