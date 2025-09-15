import React from 'react'
import { ContentBlock } from '@/payload-types'

interface QuoteBlockProps {
  block: ContentBlock
}

export default function QuoteBlock({ block }: QuoteBlockProps) {
  return (
    <div className="quote-block">
      <div className="bg-yellow-100 p-4 text-center text-yellow-800 rounded">
        <p>QuoteBlock - Coming Soon</p>
        <small>Block Type: {block.blockType}</small>
      </div>
    </div>
  )
}
