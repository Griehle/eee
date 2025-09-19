import React from 'react'
import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'

import config from '@/payload.config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './styles.css'

export const metadata = {
  description: 'A modern website built with Payload CMS and Next.js.',
  title: 'My Website',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  // Get site branding data
  const siteBranding = await payload.findGlobal({
    slug: 'site-branding',
    depth: 2, // Include media relationships
  })

  // Transform user to match Header component expectations
  const headerUser = user ? {
    id: user.id.toString(),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  } : undefined

  return (
    <html lang="en">
      <body>
        <Header user={headerUser} branding={siteBranding} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
