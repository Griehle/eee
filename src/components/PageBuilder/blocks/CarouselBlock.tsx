import React from 'react'
import { ContentBlock } from '@/payload-types'

interface CarouselBlockProps {
  block: ContentBlock
}

export default function CarouselBlock({ block }: CarouselBlockProps) {
  return (
    <div className="carousel-block">
      <div className="bg-yellow-100 p-4 text-center text-yellow-800 rounded">
        <p>CarouselBlock - Coming Soon</p>
        <small>Block Type: {block.blockType}</small>
      </div>
    </div>
  )
}