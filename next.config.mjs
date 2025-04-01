import { withPayload } from '@payloadcms/next-payload'
import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  typescript: {
    ignoreBuildErrors: true, // Optional: helps with build issues
  }
}

export default withPayload(nextConfig, {
  // Required: Point to your Payload config file
  configPath: path.resolve(process.cwd(), "./payload/payload.config.ts"),
  
  // Optional: Path to your exported Payload instance
  payloadPath: path.resolve(process.cwd(), "./payload/payloadClient.ts"),
  
  // Optional: Custom admin route (default is '/admin')
  // adminRoute: "/dashboard",
  
  // Your existing option
  devBundleServerPackages: false
})
