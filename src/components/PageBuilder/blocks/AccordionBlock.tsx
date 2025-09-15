import React from 'react'
import { ContentBlock } from '@/payload-types'

interface AccordionBlockProps {
  block: ContentBlock
}

export default function AccordionBlock({ block }: AccordionBlockProps) {
  return (
    <div className="accordion-block">
      <div className="bg-yellow-100 p-4 text-center text-yellow-800 rounded">
        <p>AccordionBlock - Coming Soon</p>
        <small>Block Type: {block.blockType}</small>
      </div>
    </div>
  )
}
