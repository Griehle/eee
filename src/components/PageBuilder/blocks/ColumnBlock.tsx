import React from 'react'
import { ContentBlock } from '@/payload-types'
import { serializeRichText } from '@/utils/serialize'

interface ColumnBlockProps {
  block: ContentBlock
}

export default function ColumnBlock({ block }: ColumnBlockProps) {
  return (
    <div className="column-block">
      {block.content && (
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: serializeRichText(block.content) }} />
      )}
    </div>
  )
}
