'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFFlipBookProps {
  pdfUrl: string;
  width?: number;
  height?: number;
  showCover?: boolean;
  title?: string;
  className?: string;
}

interface PageProps {
  pageNumber: number;
  width: number;
  height: number;
  pdfUrl: string;
}

// Individual page component
const FlipPage = React.forwardRef<HTMLDivElement, PageProps>(
  ({ pageNumber, width, height, pdfUrl }, ref) => {
    return (
      <div ref={ref} className="pdf-page" style={{ width, height }}>
        <Document file={pdfUrl} loading="Loading page...">
          <Page
            pageNumber={pageNumber}
            width={width}
            height={height}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    );
  }
);

FlipPage.displayName = 'FlipPage';

export const PDFFlipBook: React.FC<PDFFlipBookProps> = ({
  pdfUrl,
  width = 400,
  height = 600,
  showCover = true,
  title,
  className = ''
}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const flipBook = useRef<any>(null);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error('Error loading PDF:', error);
    setIsLoading(false);
  }, []);

  const goToPage = useCallback((pageNumber: number) => {
    if (flipBook.current) {
      flipBook.current.pageFlip().flip(pageNumber);
    }
  }, []);

  const nextPage = useCallback(() => {
    if (flipBook.current) {
      flipBook.current.pageFlip().flipNext();
    }
  }, []);

  const prevPage = useCallback(() => {
    if (flipBook.current) {
      flipBook.current.pageFlip().flipPrev();
    }
  }, []);

  const onFlip = useCallback((e: any) => {
    setCurrentPage(e.data);
  }, []);

  // Generate pages array
  const pages = [];
  
  // Add cover page if enabled
  if (showCover && numPages > 0) {
    pages.push(
      <div key="cover" className="pdf-cover">
        <div className="cover-content">
          <h2>{title || 'PDF Document'}</h2>
          <p>Click to open</p>
        </div>
      </div>
    );
  }

  // Add PDF pages
  for (let i = 1; i <= numPages; i++) {
    pages.push(
      <FlipPage
        key={`page-${i}`}
        pageNumber={i}
        width={width}
        height={height}
        pdfUrl={pdfUrl}
      />
    );
  }

  if (isLoading) {
    return (
      <div className={`pdf-flipbook-container ${className}`}>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading PDF...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`pdf-flipbook-container ${className}`}>
      {/* Hidden Document component to get total pages */}
      <div style={{ display: 'none' }}>
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading=""
        >
          <Page pageNumber={1} />
        </Document>
      </div>

      {/* Controls */}
      <div className="flipbook-controls">
        <button 
          onClick={prevPage}
          disabled={currentPage === 0}
          className="control-btn prev-btn"
        >
          ← Previous
        </button>
        
        <span className="page-info">
          Page {currentPage + 1} of {numPages + (showCover ? 1 : 0)}
        </span>
        
        <button 
          onClick={nextPage}
          disabled={currentPage >= numPages + (showCover ? 0 : -1)}
          className="control-btn next-btn"
        >
          Next →
        </button>
      </div>

      {/* FlipBook */}
      <div className="flipbook-wrapper">
        <HTMLFlipBook
          ref={flipBook}
          width={width}
          height={height}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          showCover={false}
          mobileScrollSupport={true}
          onFlip={onFlip}
          className="flipbook"
        >
          {pages}
        </HTMLFlipBook>
      </div>

      {/* Thumbnail Navigation */}
      <div className="thumbnail-nav">
        <div className="thumbnails">
          {Array.from({ length: numPages }, (_, i) => (
            <div
              key={i}
              className={`thumbnail ${currentPage === i + (showCover ? 1 : 0) ? 'active' : ''}`}
              onClick={() => goToPage(i + (showCover ? 1 : 0))}
            >
              <Document file={pdfUrl} loading="">
                <Page
                  pageNumber={i + 1}
                  width={60}
                  height={80}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>
              <span className="thumbnail-number">{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PDFFlipBook;