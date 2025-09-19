import React from 'react'
import { ContentBlock } from '@/payload-types'

interface RawHtmlBlockProps {
  block: ContentBlock
}

export default function RawHtmlBlock({ block }: RawHtmlBlockProps) {
  const { htmlContent, cssStyles } = block

  if (!htmlContent) {
    return (
      <div className="raw-html-block">
        <div className="bg-yellow-100 p-4 text-center text-yellow-800 rounded">
          <p>No HTML content provided</p>
          <small>Please add HTML content to display</small>
        </div>
      </div>
    )
  }

  return (
    <div className="raw-html-block">
      {/* Optional CSS styles for this specific HTML block */}
      {cssStyles && (
        <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
      )}
      
      {/* Raw HTML content */}
      <div 
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        className="raw-html-content"
      />
    </div>
  )
}