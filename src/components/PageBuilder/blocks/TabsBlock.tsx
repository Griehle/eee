import React from 'react'
import { ContentBlock } from '@/payload-types'

interface TabsBlockProps {
  block: ContentBlock
}

export default function TabsBlock({ block }: TabsBlockProps) {
  return (
    <div className="tabs-block">
      <div className="bg-yellow-100 p-4 text-center text-yellow-800 rounded">
        <p>TabsBlock - Coming Soon</p>
        <small>Block Type: {block.blockType}</small>
      </div>
    </div>
  )
}