import React from 'react'
import { ContentBlock } from '@/payload-types'

interface FeaturesBlockProps {
  block: ContentBlock
}

export default function FeaturesBlock({ block }: FeaturesBlockProps) {
  return (
    <div className="features-block">
      <div className="bg-yellow-100 p-4 text-center text-yellow-800 rounded">
        <p>FeaturesBlock - Coming Soon</p>
        <small>Block Type: {block.blockType}</small>
      </div>
    </div>
  )
}
