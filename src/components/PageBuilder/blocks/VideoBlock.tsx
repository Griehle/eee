import React from 'react'
import { ContentBlock } from '@/payload-types'

interface VideoBlockProps {
  block: ContentBlock
}

export default function VideoBlock({ block }: VideoBlockProps) {
  return (
    <div className="video-block">
      <div className="bg-yellow-100 p-4 text-center text-yellow-800 rounded">
        <p>VideoBlock - Coming Soon</p>
        <small>Block Type: {block.blockType}</small>
      </div>
    </div>
  )
}