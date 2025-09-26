'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Import everything dynamically to avoid SSR issues
const PDFFlipBookAdvanced = dynamic(() => import('../../../components/PDFFlipBook/PDFFlipBookAdvanced'), {
  ssr: false,
  loading: () => <div>🔄 Loading Advanced FlipBook...</div>
})

const DocumentTest = dynamic(() => import('./DocumentTest'), {
  ssr: false,
  loading: () => <div>🔄 Loading Document Test...</div>
})

export default function PDFDebugPage() {
  const pdfUrl = '/api/media/file/ESK%20ACA%20Dual%20Secondary%20Booklet%202025.pdf'
  
  console.log('PDF Debug Page loaded with URL:', pdfUrl)
  
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>PDF FlipBook Debug</h1>
      
      <div style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Debug Info:</h3>
        <p><strong>PDF URL:</strong> <code>{pdfUrl}</code></p>
        <p><strong>Full URL:</strong> <code>{typeof window !== 'undefined' ? window.location.origin + pdfUrl : 'N/A'}</code></p>
        
        <div style={{ marginTop: '10px' }}>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" style={{ 
            display: 'inline-block', 
            padding: '8px 16px', 
            background: '#007bff', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '4px'
          }}>
            🔗 Test PDF URL Directly
          </a>
        </div>
      </div>

      <div style={{ border: '2px solid #ddd', borderRadius: '8px', padding: '20px' }}>
        <h3>React-PDF Document Test:</h3>
        <DocumentTest pdfUrl={pdfUrl} />
      </div>
      
      <div style={{ border: '2px solid #ddd', borderRadius: '8px', padding: '20px', marginTop: '20px' }}>
        <h3>PDF FlipBook Test:</h3>
        <PDFFlipBookAdvanced
          pdfUrl={pdfUrl}
          title="Debug Test PDF"
          width={600}
          height={800}
          showCover={true}
          enableDownload={true}
          enableFullscreen={true}
          enableSearch={true}
          enableZoom={true}
        />
      </div>
    </div>
  )
}