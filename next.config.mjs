// For newer Payload versions (check documentation for exact import)
import { createPayloadClient } from 'payload/dist/client'
// Or potentially:
import { withPayload } from '@payloadcms/next-payload'
import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  }
}

export default withPayload(nextConfig, {
  // Point to your Payload config
  configPath: path.resolve(process.cwd(), "./payload.config.ts"),
  // Other options as needed
})
