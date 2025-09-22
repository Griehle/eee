import React from 'react'
import { ContentBlock } from '@/payload-types'
import { serializeRichText } from '@/utils/serialize'
import BlockRenderer from '../BlockRenderer'

interface RowBlockProps {
  block: ContentBlock
}

// Helper component to render column blocks similar to PageBuilder
const ColumnBlockRenderer = ({ blocks }: { blocks: any[] }) => {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <div className="column-content">
      {blocks.map((block, index) => {
        const key = block.id || `column-block-${index}`
        
        switch (block.blockType) {
          case 'contentBlock':
            // Render a content block from the blocks collection
            if (block.blockType === 'contentBlock' && block.block) {
              // Handle both ID reference and populated ContentBlock object
              const contentBlock = typeof block.block === 'number' ? null : block.block as ContentBlock
              if (contentBlock) {
                return (
                  <BlockRenderer 
                    key={key}
                    block={contentBlock} 
                    className="mb-4" 
                  />
                )
              }
            }
            return (
              <div key={key} className="bg-red-100 p-4 text-red-800 rounded mb-4">
                <p>Content block reference is missing</p>
              </div>
            )

          case 'richText':
            // Render rich text content
            if (block.blockType === 'richText' && block.content) {
              return (
                <div key={key} className="prose max-w-none mb-4" dangerouslySetInnerHTML={{ __html: serializeRichText(block.content) }} />
              )
            }
            return (
              <div key={key} className="bg-yellow-100 p-4 text-yellow-800 rounded mb-4">
                <p>Rich text content is missing</p>
              </div>
            )

          case 'customHTML':
            // Render custom HTML with optional CSS
            if (block.blockType === 'customHTML') {
              return (
                <div key={key} className="custom-html-block mb-4">
                  {block.css && (
                    <style dangerouslySetInnerHTML={{ __html: block.css }} />
                  )}
                  <div dangerouslySetInnerHTML={{ __html: block.html || '' }} />
                </div>
              )
            }
            break

          default:
            return (
              <div key={key} className="bg-gray-100 p-4 text-gray-600 rounded mb-4">
                <p>Unknown column block type: {JSON.stringify(block)}</p>
              </div>
            )
        }
      })}
    </div>
  )
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
              {/* Render new column blocks structure */}
              {column.columnBlocks && column.columnBlocks.length > 0 ? (
                <ColumnBlockRenderer blocks={column.columnBlocks} />
              ) : (
                /* Fallback to legacy rich text content */
                column.content && (
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: serializeRichText(column.content) }} />
                )
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
