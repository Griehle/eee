import React from 'react'
import { ContentBlock } from '@/payload-types'
import { serializeRichText } from '@/utils/serialize'

interface TextBlockProps {
  block: ContentBlock
}

export default function TextBlock({ block }: TextBlockProps) {
  if (!block.content) {
    return null
  }

  return (
    <div className="text-block prose max-w-none" dangerouslySetInnerHTML={{ __html: serializeRichText(block.content) }} />
  )
}