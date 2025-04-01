// For newer Payload versions
import { withPayload } from '@payloadcms/next/dist/index.js'
import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  }
}

export default withPayload(nextConfig, {
  // Make sure this matches your environment variable
  configPath: path.resolve(process.cwd(), "./payload.config.ts"),
  
  // Other options
  devBundleServerPackages: false
})
