import React from 'react'
import { ContentBlock } from '@/payload-types'
import Image from 'next/image'

interface ImageBlockProps {
  block: ContentBlock
}

export default function ImageBlock({ block }: ImageBlockProps) {
  const { image } = block
  
  if (!image) {
    return null
  }

  // Handle case where image is just an ID (number) vs full Media object
  const imageData = typeof image === 'number' ? null : image
  
  if (!imageData?.url) {
    return null
  }

  return (
    <div className="image-block">
      <Image
        src={imageData.url}
        alt={imageData.alt || ''}
        width={imageData.width || 800}
        height={imageData.height || 600}
        className="max-w-full h-auto"
      />
    </div>
  )
}