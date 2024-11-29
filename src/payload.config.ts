// storage-adapter-import-placeholder
// import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { resendAdapter } from '@payloadcms/email-resend'
import  { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Causes } from './collections/Causes/Causes'
import { Donations } from './collections/Donations';
import PaystackWebhook from './enpoints/webhooks/paystack'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Causes, Donations],
  email: resendAdapter({
    defaultFromAddress: 'onboarding@resend.dev',
    defaultFromName: 'Donner Foundation',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  // email: nodemailerAdapter({
  //   defaultFromAddress: 'onboarding@resend.dev',
  //   defaultFromName: 'Donner Foundation',
  //   // Nodemailer transportOptions
  //   transportOptions: {
  //     host: process.env.SMTP_HOST,
  //     port: 587,
  //     auth: {
  //       user: process.env.SMTP_USER,
  //       pass: process.env.SMTP_PASS,
  //     },
  //   },
  // }),
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  endpoints: [ PaystackWebhook ],
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  cors: [process.env.NEXT_PUBLIC_SERVER_URL!],
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL!],
  plugins: [
    s3Storage({
      collections: { 
        media: true
      },
      bucket: process.env.SUPABASE_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.SUPABASE_ACCESS_KEY_ID!,
          secretAccessKey: process.env.SUPABASE_SECRET_ACCESS_KEY!,
        },
        endpoint: process.env.SUPABASE_ENDPOINT!,
        region: process.env.SUPABASE_REGION,
        // ... Other S3 configuration
      },
    }),
  ],
  sharp,
})
