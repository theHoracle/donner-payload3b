// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { resendAdapter } from '@payloadcms/email-resend'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Causes } from './collections/Causes/Causes'
import { Donations } from './collections/Donations';

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
    defaultFromAddress: 'info@donnerfoundation.com',
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
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
