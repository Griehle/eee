import React from 'react'
import { ContentBlock } from '@/payload-types'

interface HeadingBlockProps {
  block: ContentBlock
}

export default function HeadingBlock({ block }: HeadingBlockProps) {
  const { heading } = block
  
  if (!heading?.text) {
    return null
  }

  const HeadingTag = (heading.tag || 'h2') as keyof React.JSX.IntrinsicElements
  
  const styles: React.CSSProperties = {}
  if (heading.color) {
    styles.color = heading.color
  }

  return (
    <HeadingTag style={styles} className="heading-block">
      {heading.text}
    </HeadingTag>
  )
}