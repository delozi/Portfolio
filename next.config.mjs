import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'

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

export default withPayload(nextConfig, {
  // Make sure this matches your environment variable
  configPath: path.resolve(process.cwd(), "./payload.config.ts"),
  
  // Other options
  devBundleServerPackages: false
})
