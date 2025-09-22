// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { MediaCategories } from './collections/MediaCategories'
import { Pages } from './collections/Pages'
import { HomeSlider } from './collections/HomeSlider'
import { HomeSection } from './collections/HomeSection'
import { Testimonials } from './collections/Testimonials'
import { TeamMembers } from './collections/TeamMembers'
import { Services } from './collections/Services'
import { ContentBlocks } from './collections/ContentBlocks'
import { PageTemplates } from './collections/PageTemplates'
import { PDFDocuments } from './collections/PDFDocuments'
import { HomePage } from './globals/HomePage'
import { SiteBranding } from './globals/SiteBranding'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users, 
    Media, 
    MediaCategories, 
    Pages, 
    HomeSlider, 
    HomeSection,
    Testimonials,
    TeamMembers,
    Services,
    ContentBlocks,
    PageTemplates,
    PDFDocuments,
  ],
  globals: [HomePage, SiteBranding],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
