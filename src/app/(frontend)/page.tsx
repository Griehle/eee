import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import Link from 'next/link'
import React from 'react'

import config from '@/payload.config'
import ImageSlider from '@/components/ImageSlider'
import ContentSection from '@/components/ContentSection'
import { serializeRichText } from '@/utils/serialize'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  // Get home page settings
  const homePageData = await payload.findGlobal({
    slug: 'home-page',
  })

  // Get slider data from CMS (up to 10 active slides)
  const { docs: sliderData } = await payload.find({
    collection: 'home-slider',
    where: {
      isActive: {
        equals: true,
      },
    },
    sort: 'order',
    limit: 10, // Limit to 10 slides for performance
    depth: 2, // Include media relationships
  })

  // Get content sections from CMS
  const { docs: homeSections } = await payload.find({
    collection: 'home-section',
    where: {
      isActive: {
        equals: true,
      },
    },
    sort: 'order',
    depth: 2, // Include media relationships
  })

  // Get recent posts if enabled
  const showRecentPosts = homePageData?.showRecentPosts ?? true
  const recentPostsLimit = homePageData?.recentPostsLimit ?? 3
  let recentPosts: any[] = []
  
  if (showRecentPosts) {
    const postsResult = await payload.find({
      collection: 'posts',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedDate',
      limit: recentPostsLimit,
    })
    recentPosts = postsResult.docs
  }

  // Transform slider data for the ImageSlider component
  const sliderSlides = sliderData.map((slide: any, index: number) => ({
    id: slide.id || index + 1,
    image: typeof slide.image === 'object' ? slide.image.url : slide.image,
    title: slide.title,
    subtitle: slide.subtitle || undefined,
    buttonText: slide.buttonText || undefined,
    buttonLink: slide.buttonLink || undefined,
  }))

  // Fallback slides if no CMS data
  const defaultSlides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'Welcome to Our Platform',
      subtitle: 'Experience the future of web development with our cutting-edge solutions',
      buttonText: 'Get Started',
      buttonLink: '/register'
    },
  ]

  const slidesToShow = sliderSlides.length > 0 ? sliderSlides : defaultSlides
  const autoPlayInterval = homePageData?.autoPlayInterval ?? 6000

  return (
    <div className="home">
      {/* Hero Slider */}
      <ImageSlider slides={slidesToShow} autoPlay={true} interval={autoPlayInterval} />

      {/* CMS-managed Content Sections */}
      {homeSections.map((section: any, index: number) => {
        const content = serializeRichText(section.content)
        const imageSrc = typeof section.image === 'object' ? section.image.url : section.image
        const imageAlt = typeof section.image === 'object' ? section.image.alt || section.title : section.title

        return (
          <ContentSection
            key={section.id || `section-${index}`}
            title={section.title}
            content={content}
            imageSrc={imageSrc}
            imageAlt={imageAlt}
            imagePosition={section.imagePosition as 'left' | 'right'}
            buttonText={section.buttonText || undefined}
            buttonLink={section.buttonLink || undefined}
            backgroundColor={section.backgroundColor}
          />
        )
      })}

      {/* Static Features Section - could also be made CMS-manageable */}
      {/*<section className="features">
        <div className="features-content">
          <h2>Why Choose Our Platform?</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>🔐 Secure Authentication</h3>
              <p>Enterprise-grade security with built-in user management and role-based access control</p>
            </div>
            <div className="feature">
              <h3>📝 Content Management</h3>
              <p>Intuitive admin interface for managing all your content, media, and data efficiently</p>
            </div>
            <div className="feature">
              <h3>🎨 Modern Design</h3>
              <p>Responsive, accessible design that works beautifully on all devices and browsers</p>
            </div>
            <div className="feature">
              <h3>⚡ High Performance</h3>
              <p>Optimized for speed with server-side rendering and modern web technologies</p>
            </div>
            <div className="feature">
              <h3>🔧 Developer Friendly</h3>
              <p>TypeScript support, comprehensive APIs, and excellent developer experience</p>
            </div>
            <div className="feature">
              <h3>🌐 Scalable</h3>
              <p>Built to grow with your needs, from small projects to enterprise applications</p>
            </div>
          </div>
        </div>
      </section>*/}

      {/* Recent Posts Section */}
      {showRecentPosts && recentPosts.length > 0 && (
        <section className="recent-posts">
          <div className="posts-content">
            <h2>Latest from Our Blog</h2>
            <div className="posts-grid">
              {recentPosts.map((post: any) => (
                <article key={post.id} className="post-card">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="post-meta">
                    <span>By {post.author?.firstName} {post.author?.lastName}</span>
                    <span>{new Date(post.publishedDate || post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <Link href={`/posts/${post.slug}`} className="post-link">
                    Read More →
                  </Link>
                </article>
              ))}
            </div>
            <div className="posts-cta">
              <Link href="/posts" className="btn btn-secondary">
                View All Posts
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
