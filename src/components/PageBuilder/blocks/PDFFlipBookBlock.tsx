import React from 'react'
import { ContentBlock } from '@/payload-types'
import dynamic from 'next/dynamic'

// Dynamically import flipbook components to avoid SSR issues
const PDFFlipBook = dynamic(() => import('@/components/PDFFlipBook/PDFFlipBook'), {
  ssr: false,
  loading: () => <div className="flipbook-loading">Loading FlipBook...</div>
})

const PDFFlipBookAdvanced = dynamic(() => import('@/components/PDFFlipBook/PDFFlipBookAdvanced'), {
  ssr: false,
  loading: () => <div className="flipbook-loading">Loading Advanced FlipBook...</div>
})

interface PDFFlipBookBlockProps {
  block: ContentBlock
}

export default function PDFFlipBookBlock({ block }: PDFFlipBookBlockProps) {
  // Check if we have the required flipbook configuration
  if (!block.pdfFlipbook?.pdfDocument) {
    return (
      <div className="flipbook-error">
        <div className="bg-red-50 p-6 text-center text-red-800 rounded-lg border border-red-200">
          <p className="font-medium">📚 PDF FlipBook Block</p>
          <p className="text-sm mt-2">No PDF document selected. Please select a PDF document in the block settings.</p>
        </div>
      </div>
    )
  }

  // Get the PDF document data
  const pdfDocument = typeof block.pdfFlipbook.pdfDocument === 'object' 
    ? block.pdfFlipbook.pdfDocument 
    : null

  if (!pdfDocument) {
    return (
      <div className="flipbook-error">
        <div className="bg-red-50 p-6 text-center text-red-800 rounded-lg border border-red-200">
          <p className="font-medium">📚 PDF FlipBook Block</p>
          <p className="text-sm mt-2">PDF document data not loaded. Please check your document selection.</p>
        </div>
      </div>
    )
  }

  // Get PDF file URL
  const pdfFileUrl = typeof pdfDocument.pdfFile === 'object' 
    ? pdfDocument.pdfFile?.url 
    : null

  if (!pdfFileUrl) {
    return (
      <div className="flipbook-error">
        <div className="bg-red-50 p-6 text-center text-red-800 rounded-lg border border-red-200">
          <p className="font-medium">📚 PDF FlipBook Block</p>
          <p className="text-sm mt-2">PDF file URL not found. Please check the uploaded PDF file.</p>
        </div>
      </div>
    )
  }

  // Determine which component to use
  const useAdvanced = block.pdfFlipbook.useAdvanced !== false // Default to true

  // Get settings (with overrides)
  const documentSettings = pdfDocument.settings || {}
  const overrides = block.pdfFlipbook.overrideSettings || {}
  
  const flipbookProps = {
    pdfUrl: pdfFileUrl,
    title: pdfDocument.title,
    width: overrides.width || documentSettings.width || 600,
    height: overrides.height || documentSettings.height || 800,
    showCover: overrides.showCover !== undefined ? overrides.showCover : (documentSettings.showCover !== false),
    enableDownload: overrides.enableDownload !== undefined ? overrides.enableDownload : (documentSettings.enableDownload !== false),
    enableFullscreen: overrides.enableFullscreen !== undefined ? overrides.enableFullscreen : (documentSettings.enableFullscreen !== false),
    className: 'page-builder-flipbook'
  }

  // Advanced component additional props
  const advancedProps = useAdvanced ? {
    enableSearch: true,
    enableZoom: true,
    onPageChange: (page: number) => {
      console.log(`FlipBook page changed to: ${page}`)
    },
    onDownload: () => {
      console.log(`FlipBook download: ${pdfDocument.title}`)
      // TODO: Implement download tracking
    }
  } : {}

  return (
    <div className="pdf-flipbook-block">
      {/* Document Title */}
      {block.pdfFlipbook.displayTitle && pdfDocument.title && (
        <div className="flipbook-header mb-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            {pdfDocument.title}
          </h2>
          {pdfDocument.author && (
            <p className="text-sm text-gray-600 text-center mt-2">
              by {pdfDocument.author}
            </p>
          )}
        </div>
      )}

      {/* FlipBook Component */}
      <div className="flipbook-container">
        {useAdvanced ? (
          <PDFFlipBookAdvanced
            {...flipbookProps}
            {...advancedProps}
          />
        ) : (
          <PDFFlipBook
            {...flipbookProps}
          />
        )}
      </div>

      {/* Document Description */}
      {block.pdfFlipbook.displayDescription && pdfDocument.description && (
        <div className="flipbook-footer mt-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">About this document</h3>
            <p className="text-gray-700 leading-relaxed">
              {pdfDocument.description}
            </p>
            
            {/* Document metadata */}
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
              {pdfDocument.category && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">Category:</span>
                  <span className="capitalize">{pdfDocument.category}</span>
                </div>
              )}
              
              {pdfDocument.tags && pdfDocument.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Tags:</span>
                  <div className="flex gap-1">
                    {pdfDocument.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {pdfDocument.publishedAt && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">Published:</span>
                  <span>{new Date(pdfDocument.publishedAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}