import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Page } from '@/payload-types'
import PageBuilder from '@/components/PageBuilder/PageBuilder'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

async function getPageBySlug(slug: string): Promise<Page | null> {
  const payload = await getPayload({ config })
  
  try {
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
        status: {
          equals: 'published',
        },
      },
      limit: 1,
    })

    return pages.docs[0] || null
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  
  try {
    const pages = await payload.find({
      collection: 'pages',
      where: {
        status: {
          equals: 'published',
        },
      },
      limit: 1000,
    })

    return pages.docs.map((page) => ({
      slug: page.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {page.title}
          </h1>
          {page.publishedDate && (
            <p className="text-gray-600">
              Published on {new Date(page.publishedDate).toLocaleDateString()}
            </p>
          )}
        </header>

        <main>
          {page.pageBuilder && page.pageBuilder.length > 0 ? (
            <PageBuilder blocks={page.pageBuilder} />
          ) : page.content ? (
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: page.content.root.children
                  .map((child: { text?: string; type?: string }) => child.text || '')
                  .join(' ') 
              }}
            />
          ) : (
            <div className="text-gray-500">
              No content available for this page.
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: page.title,
    description: `Page: ${page.title}`,
  }
}
