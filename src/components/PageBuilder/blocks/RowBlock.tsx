import React from 'react'
import { ContentBlock } from '@/payload-types'
import { serializeRichText } from '@/utils/serialize'

interface RowBlockProps {
  block: ContentBlock
}

export default function RowBlock({ block }: RowBlockProps) {
  if (!block.columns || block.columns.length === 0) {
    return (
      <div className="container mx-auto px-4">
        <div className="bg-gray-50 p-8 text-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
          <p>No columns defined for this row.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-12 gap-4">
        {block.columns.map((column, index) => {
          const width = parseInt(column.width || '12')
          const colSpanClass = `col-span-12 lg:col-span-${width}`
          
          return (
            <div key={index} className={colSpanClass}>
              {column.content && (
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: serializeRichText(column.content) }} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}