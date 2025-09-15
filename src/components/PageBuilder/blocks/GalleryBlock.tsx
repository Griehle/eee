import React from 'react'
import { ContentBlock } from '@/payload-types'

interface GalleryBlockProps {
  block: ContentBlock
}

export default function GalleryBlock({ block }: GalleryBlockProps) {
  return (
    <div className="gallery-block">
      <div className="bg-yellow-100 p-4 text-center text-yellow-800 rounded">
        <p>GalleryBlock - Coming Soon</p>
        <small>Block Type: {block.blockType}</small>
      </div>
    </div>
  )
}