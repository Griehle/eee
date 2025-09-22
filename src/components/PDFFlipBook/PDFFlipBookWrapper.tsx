'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import components dynamically to avoid SSR issues
const PDFFlipBookAdvanced = dynamic(() => import('./PDFFlipBookAdvanced'), {
  ssr: false,
  loading: () => (
    <div className="pdf-loading-placeholder">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading PDF FlipBook...</p>
      </div>
    </div>
  )
});

const PDFFlipBook = dynamic(() => import('./PDFFlipBook'), {
  ssr: false,
  loading: () => (
    <div className="pdf-loading-placeholder">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading PDF FlipBook...</p>
      </div>
    </div>
  )
});

interface PDFDocument {
  id: string;
  title: string;
  description?: string;
  pdfFile: {
    url: string;
    filename: string;
  };
  thumbnail?: {
    url: string;
    alt: string;
  };
  settings: {
    showCover: boolean;
    width: number;
    height: number;
    enableDownload: boolean;
    enableFullscreen: boolean;
  };
  category: string;
  tags?: string[];
  author?: string;
  isPublished: boolean;
}

interface PDFFlipBookWrapperProps {
  documentId?: string;
  category?: string;
  tag?: string;
  useAdvanced?: boolean;
  className?: string;
  onPageChange?: (page: number) => void;
  onDownload?: () => void;
}

export const PDFFlipBookWrapper: React.FC<PDFFlipBookWrapperProps> = ({
  documentId,
  category,
  tag,
  useAdvanced = true,
  className = '',
  onPageChange,
  onDownload
}) => {
  const [documents, setDocuments] = useState<PDFDocument[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<PDFDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        let url = '/api/pdf-documents?where[isPublished][equals]=true';
        
        if (documentId) {
          url = `/api/pdf-documents/${documentId}`;
        } else if (category) {
          url += `&where[category][equals]=${category}`;
        } else if (tag) {
          url += `&where[tags][contains]=${tag}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch PDF documents');
        }

        const data = await response.json();
        
        if (documentId) {
          // Single document
          if (data.isPublished) {
            setSelectedDocument(data);
            setDocuments([data]);
          } else {
            setError('Document not found or not published');
          }
        } else {
          // Multiple documents
          setDocuments(data.docs || []);
          if (data.docs && data.docs.length > 0) {
            setSelectedDocument(data.docs[0]);
          }
        }
      } catch (err) {
        console.error('Error fetching PDF documents:', err);
        setError('Failed to load PDF documents');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [documentId, category, tag]);

  const handleDocumentSelect = (doc: PDFDocument) => {
    setSelectedDocument(doc);
  };

  const handleDownloadWrapper = () => {
    // Track download in PayloadCMS
    if (selectedDocument) {
      fetch(`/api/pdf-documents/${selectedDocument.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          downloadCount: (selectedDocument as any).downloadCount + 1 || 1,
        }),
      }).catch(console.error);
    }
    
    onDownload?.();
  };

  const handlePageChangeWrapper = (page: number) => {
    // Track page views if needed
    onPageChange?.(page);
  };

  if (loading) {
    return (
      <div className={`pdf-flipbook-wrapper ${className}`}>
        <div className="pdf-loading-placeholder">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading PDF documents...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`pdf-flipbook-wrapper ${className}`}>
        <div className="pdf-error-placeholder">
          <h3>⚠️ Error Loading PDF</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  if (!selectedDocument) {
    return (
      <div className={`pdf-flipbook-wrapper ${className}`}>
        <div className="pdf-empty-placeholder">
          <h3>📄 No PDF Documents Found</h3>
          <p>No published PDF documents match your criteria.</p>
          <a href="/admin/collections/pdf-documents" className="admin-link">
            Upload PDFs in Admin Panel
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`pdf-flipbook-wrapper ${className}`}>
      {/* Document Selector (if multiple documents) */}
      {documents.length > 1 && (
        <div className="document-selector">
          <h3>Select Document:</h3>
          <div className="document-grid">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className={`document-card ${selectedDocument.id === doc.id ? 'active' : ''}`}
                onClick={() => handleDocumentSelect(doc)}
              >
                {doc.thumbnail ? (
                  <img src={doc.thumbnail.url} alt={doc.thumbnail.alt} />
                ) : (
                  <div className="document-placeholder">📄</div>
                )}
                <div className="document-info">
                  <h4>{doc.title}</h4>
                  {doc.description && <p>{doc.description}</p>}
                  <span className="document-category">{doc.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PDF FlipBook */}
      <div className="flipbook-container">
        {useAdvanced ? (
          <PDFFlipBookAdvanced
            pdfUrl={selectedDocument.pdfFile.url}
            title={selectedDocument.title}
            width={selectedDocument.settings.width}
            height={selectedDocument.settings.height}
            showCover={selectedDocument.settings.showCover}
            enableDownload={selectedDocument.settings.enableDownload}
            enableFullscreen={selectedDocument.settings.enableFullscreen}
            enableSearch={true}
            enableZoom={true}
            onPageChange={handlePageChangeWrapper}
            onDownload={handleDownloadWrapper}
            className="cms-flipbook"
          />
        ) : (
          <PDFFlipBook
            pdfUrl={selectedDocument.pdfFile.url}
            title={selectedDocument.title}
            width={selectedDocument.settings.width}
            height={selectedDocument.settings.height}
            showCover={selectedDocument.settings.showCover}
            className="cms-flipbook"
          />
        )}
      </div>

      {/* Document Metadata */}
      <div className="document-metadata">
        <div className="metadata-content">
          <h3>{selectedDocument.title}</h3>
          {selectedDocument.description && (
            <p className="document-description">{selectedDocument.description}</p>
          )}
          
          <div className="metadata-grid">
            {selectedDocument.author && (
              <div className="metadata-item">
                <strong>Author:</strong> {selectedDocument.author}
              </div>
            )}
            <div className="metadata-item">
              <strong>Category:</strong> {selectedDocument.category}
            </div>
            {selectedDocument.tags && selectedDocument.tags.length > 0 && (
              <div className="metadata-item">
                <strong>Tags:</strong>
                <div className="tag-list">
                  {selectedDocument.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFFlipBookWrapper;