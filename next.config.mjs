import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
}

export default withPayload(nextConfig, {
  // Make sure this matches your environment variable
  configPath: path.resolve(process.cwd(), "./payload.config.ts"),
  
  // Other options
  devBundleServerPackages: false
})
