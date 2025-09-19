'use client'
import React from 'react'
import { ContentBlock } from '@/payload-types'

// Import essential block components
import RowBlock from './blocks/RowBlock'
import ColumnBlock from './blocks/ColumnBlock'
import SectionBlock from './blocks/SectionBlock'
import TextBlock from './blocks/TextBlock'
import HeadingBlock from './blocks/HeadingBlock'
import ImageBlock from './blocks/ImageBlock'
import GalleryBlock from './blocks/GalleryBlock'
import VideoBlock from './blocks/VideoBlock'
import QuoteBlock from './blocks/QuoteBlock'
import ButtonBlock from './blocks/ButtonBlock'
import IconBoxBlock from './blocks/IconBoxBlock'
import AccordionBlock from './blocks/AccordionBlock'
import TabsBlock from './blocks/TabsBlock'
import CarouselBlock from './blocks/CarouselBlock'
import FeaturesBlock from './blocks/FeaturesBlock'
import RawHtmlBlock from './blocks/RawHtmlBlock'

// Stub component for unimplemented blocks
const StubBlock = ({ block }: { block: any }) => (
  <div className="bg-blue-50 p-6 text-center text-blue-800 rounded-lg border border-blue-200">
    <p className="font-medium">📋 {block.blockType.replace('_', ' ').toUpperCase()} Block</p>
    <small className="text-blue-600">This block type will be implemented soon</small>
  </div>
)

interface BlockRendererProps {
  block: ContentBlock
  className?: string
}

export default function BlockRenderer({ block, className }: BlockRendererProps) {
  if (!block || !block.isActive) {
    return null
  }

  // Generate styles from styling options
  const getBlockStyles = (): React.CSSProperties => {
    const { styling } = block
    if (!styling) return {}

    const styles: React.CSSProperties = {}

    // Spacing
    if (styling.marginTop) styles.marginTop = styling.marginTop
    if (styling.marginBottom) styles.marginBottom = styling.marginBottom
    if (styling.paddingTop) styles.paddingTop = styling.paddingTop
    if (styling.paddingBottom) styles.paddingBottom = styling.paddingBottom
    if (styling.paddingLeft) styles.paddingLeft = styling.paddingLeft
    if (styling.paddingRight) styles.paddingRight = styling.paddingRight

    // Background
    if (styling.backgroundColor) styles.backgroundColor = styling.backgroundColor
    if (styling.backgroundGradient) styles.background = styling.backgroundGradient
    if (styling.backgroundImage) {
      let bgImage = ''
      if (typeof styling.backgroundImage === 'string') {
        bgImage = styling.backgroundImage
      } else if (typeof styling.backgroundImage === 'object' && styling.backgroundImage !== null) {
        bgImage = (styling.backgroundImage as any).url || ''
      }
      if (bgImage) {
        styles.backgroundImage = `url(${bgImage})`
        styles.backgroundPosition = styling.backgroundPosition || 'center center'
        styles.backgroundSize = styling.backgroundSize || 'cover'
        styles.backgroundRepeat = styling.backgroundRepeat || 'no-repeat'
      }
    }

    // Borders
    if (styling.borderWidth) styles.borderWidth = styling.borderWidth
    if (styling.borderStyle) styles.borderStyle = styling.borderStyle
    if (styling.borderColor) styles.borderColor = styling.borderColor
    if (styling.borderRadius) styles.borderRadius = styling.borderRadius

    // Typography
    if (styling.textAlign) styles.textAlign = styling.textAlign as any
    if (styling.textColor) styles.color = styling.textColor
    if (styling.fontSize) styles.fontSize = styling.fontSize
    if (styling.fontWeight) styles.fontWeight = styling.fontWeight

    // Effects
    if (styling.boxShadow) styles.boxShadow = styling.boxShadow

    return styles
  }

  // Generate CSS classes
  const getBlockClasses = (): string => {
    const { styling } = block
    const classes: string[] = []

    if (className) classes.push(className)
    if (styling?.customClassName) classes.push(styling.customClassName)
    if (styling?.animation && styling.animation !== 'none') classes.push(`animate-${styling.animation}`)

    // Responsive visibility classes
    if (styling?.hideOnMobile) classes.push('hidden lg:block')
    if (styling?.hideOnTablet) classes.push('hidden md:block lg:hidden')
    if (styling?.hideOnDesktop) classes.push('block lg:hidden')

    return classes.join(' ')
  }

  // Generate animation styles
  const getAnimationStyles = (): React.CSSProperties => {
    const { styling } = block
    if (!styling?.animation || styling.animation === 'none') return {}

    const animStyles: React.CSSProperties = {}
    if (styling.animationDelay) animStyles.animationDelay = styling.animationDelay
    if (styling.animationDuration) animStyles.animationDuration = styling.animationDuration

    return animStyles
  }

  const blockStyles = {
    ...getBlockStyles(),
    ...getAnimationStyles(),
  }

  // Add custom CSS if provided
  let customCSS = null
  if (block.styling?.customCSS) {
    customCSS = (
      <style jsx>{`
        .block-${block.id} {
          ${block.styling.customCSS}
        }
      `}</style>
    )
  }

  const wrapperProps = {
    className: `block-${block.id} ${getBlockClasses()}`.trim(),
    style: blockStyles,
  }

  // Render appropriate block component based on blockType
  const renderBlock = () => {
    switch (block.blockType) {
      // Layout Elements
      case 'row':
        return <RowBlock block={block} />
      case 'column':
        return <ColumnBlock block={block} />
      case 'section':
        return <SectionBlock block={block} />
      
      // Content Elements
      case 'text':
        return <TextBlock block={block} />
      case 'heading':
        return <HeadingBlock block={block} />
      case 'image':
        return <ImageBlock block={block} />
      case 'gallery':
        return <GalleryBlock block={block} />
      case 'video':
        return <VideoBlock block={block} />
      case 'quote':
        return <QuoteBlock block={block} />
      case 'button':
        return <ButtonBlock block={block} />
      case 'icon_box':
        return <IconBoxBlock block={block} />
      case 'raw_html':
        return <RawHtmlBlock block={block} />
      
      // Interactive Elements
      case 'accordion':
        return <AccordionBlock block={block} />
      case 'tabs':
        return <TabsBlock block={block} />
      case 'carousel':
        return <CarouselBlock block={block} />
      
      // Data Display
      case 'features':
        return <FeaturesBlock block={block} />
      
      // Unimplemented blocks - use stub
      case 'contact_form':
      case 'google_maps':
      case 'stats':
      case 'team_grid':
      case 'posts_grid':
      case 'cta':
      case 'progress_bar':
      case 'separator':
        return <StubBlock block={block} />
      
      default:
        return (
          <div className="bg-gray-100 p-4 text-center text-gray-600">
            <p>Unknown block type: {block.blockType}</p>
          </div>
        )
    }
  }

  return (
    <>
      <div {...wrapperProps}>
        {renderBlock()}
      </div>
      {customCSS}
    </>
  )
}