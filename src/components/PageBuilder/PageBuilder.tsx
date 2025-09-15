'use client'
import React from 'react'
import BlockRenderer from './BlockRenderer'
import { serializeRichText } from '@/utils/serialize'

interface PageBuilderBlock {
  blockType: string
  id?: string | null
  blockName?: string | null
  block?: any
  content?: any
  html?: string
  css?: string | null
}

interface PageBuilderProps {
  blocks?: PageBuilderBlock[]
  className?: string
}

export default function PageBuilder({ blocks, className }: PageBuilderProps) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className={`page-builder-empty ${className || ''}`.trim()}>
        <div className="bg-gray-50 p-8 text-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
          <p>No content blocks found. Start building your page!</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`page-builder ${className || ''}`.trim()}>
      {blocks.map((block, index) => {
        const key = block.id || `block-${index}`
        
        switch (block.blockType) {
          case 'contentBlock':
            // Render a content block from the blocks collection
            if (block.block) {
              return (
                <BlockRenderer 
                  key={key}
                  block={block.block} 
                  className="mb-6" 
                />
              )
            }
            return (
              <div key={key} className="bg-red-100 p-4 text-red-800 rounded mb-6">
                <p>Content block reference is missing</p>
              </div>
            )

          case 'richText':
            // Render rich text content
            if (block.content) {
              return (
                <div key={key} className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: serializeRichText(block.content) }} />
              )
            }
            return (
              <div key={key} className="bg-yellow-100 p-4 text-yellow-800 rounded mb-6">
                <p>Rich text content is missing</p>
              </div>
            )

          case 'customHTML':
            // Render custom HTML with optional CSS
            return (
              <div key={key} className="custom-html-block mb-6">
                {block.css && (
                  <style dangerouslySetInnerHTML={{ __html: block.css }} />
                )}
                <div dangerouslySetInnerHTML={{ __html: block.html || '' }} />
              </div>
            )

          default:
            return (
              <div key={key} className="bg-gray-100 p-4 text-gray-600 rounded mb-6">
                <p>Unknown block type: {block.blockType}</p>
              </div>
            )
        }
      })}
    </div>
  )
}