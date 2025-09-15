import React from 'react'
import { ContentBlock } from '@/payload-types'
import { serializeRichText } from '@/utils/serialize'

interface SectionBlockProps {
  block: ContentBlock
}

export default function SectionBlock({ block }: SectionBlockProps) {
  return (
    <section className="section-block py-8">
      {block.content && (
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: serializeRichText(block.content) }} />
      )}
    </section>
  )
}