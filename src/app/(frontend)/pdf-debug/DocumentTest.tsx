'use client'

import React from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Set up PDF.js worker BEFORE using Document component
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
  console.log('📦 DocumentTest - PDF.js worker configured for version:', pdfjs.version);
}

interface DocumentTestProps {
  pdfUrl: string;
}

export default function DocumentTest({ pdfUrl }: DocumentTestProps) {
  const [numPages, setNumPages] = React.useState<number>(0)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  
  console.log('🧪 DocumentTest component rendering with:', pdfUrl)
  
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
      <p><strong>Direct react-pdf Document test:</strong></p>
      {loading && <p>⏳ Loading document...</p>}
      {error && <p style={{ color: 'red' }}>❌ Error: {error}</p>}
      {numPages > 0 && <p style={{ color: 'green' }}>✅ Loaded {numPages} pages</p>}
      
      <div style={{ display: 'none' }}>
        <Document
          file={pdfUrl}
          onLoadSuccess={(pdf) => {
            console.log('✅ DocumentTest: PDF loaded successfully!', pdf.numPages)
            setNumPages(pdf.numPages)
            setLoading(false)
          }}
          onLoadError={(error) => {
            console.log('❌ DocumentTest: Error loading PDF:', error)
            setError(error.message)
            setLoading(false)
          }}
          loading=""
        >
          <Page pageNumber={1} width={200} />
        </Document>
      </div>
      
      {numPages > 0 && (
        <div>
          <Document file={pdfUrl}>
            <Page pageNumber={1} width={300} />
          </Document>
        </div>
      )}
    </div>
  )
}