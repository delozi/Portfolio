// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Posts } from './collections/Posts'
import { Skills } from './collections/Skills'
import { Experience } from './collections/Experience'
import { About } from './collections/About'
import { Contact } from './collections/Contact'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    css: path.resolve(dirname, 'app/admin/globals.css'),
    meta: {
      titleSuffix: '- Portfolio Admin',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
  },
  collections: [
    Users,
    Media,
    Projects,
    Posts,
    Skills,
    Experience,
    About,
    Contact,
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
  editor: lexicalEditor(),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  // Enable static site generation
  staticGeneration: {
    enabled: process.env.NODE_ENV === 'production',
    baseURL: process.env.PAYLOAD_PUBLIC_SITE_URL || 'http://localhost:3000',
    crawlerMaxRequests: 500, // Max pages to generate statically
    ignoreRoutes: ['api', 'admin', '_next', 'favicon.ico'],
    // outputDir: path.resolve(process.cwd(), 'dist'),
  },
  rateLimits: {
    window: 5 * 60 * 1000, // 5 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
  limiter: {
    window: 5 * 60 * 1000, // 5 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs
  },
  upload: {
    limits: {
      fileSize: 10000000, // 10MB, in bytes
    },
  },
  secret: process.env.PAYLOAD_SECRET || '',
})
