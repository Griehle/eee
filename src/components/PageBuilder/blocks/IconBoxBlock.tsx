import React from 'react'
import { ContentBlock } from '@/payload-types'

interface IconBoxBlockProps {
  block: ContentBlock
}

export default function IconBoxBlock({ block }: IconBoxBlockProps) {
  return (
    <div className="iconbox-block">
      <div className="bg-yellow-100 p-4 text-center text-yellow-800 rounded">
        <p>IconBoxBlock - Coming Soon</p>
        <small>Block Type: {block.blockType}</small>
      </div>
    </div>
  )
}