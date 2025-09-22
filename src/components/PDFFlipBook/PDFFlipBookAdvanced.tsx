'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFFlipBookAdvancedProps {
  pdfUrl: string;
  width?: number;
  height?: number;
  showCover?: boolean;
  title?: string;
  className?: string;
  enableDownload?: boolean;
  enableFullscreen?: boolean;
  enableSearch?: boolean;
  enableZoom?: boolean;
  onPageChange?: (page: number) => void;
  onDownload?: () => void;
}

interface PageProps {
  pageNumber: number;
  width: number;
  height: number;
  pdfUrl: string;
  scale: number;
}

// Individual page component
const FlipPage = React.forwardRef<HTMLDivElement, PageProps>(
  ({ pageNumber, width, height, pdfUrl, scale }, ref) => {
    return (
      <div ref={ref} className="pdf-page" style={{ width: width * scale, height: height * scale }}>
        <Document file={pdfUrl} loading="Loading page...">
          <Page
            pageNumber={pageNumber}
            width={width * scale}
            height={height * scale}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </div>
    );
  }
);

FlipPage.displayName = 'FlipPage';

export const PDFFlipBookAdvanced: React.FC<PDFFlipBookAdvancedProps> = ({
  pdfUrl,
  width = 400,
  height = 600,
  showCover = true,
  title,
  className = '',
  enableDownload = true,
  enableFullscreen = true,
  enableSearch = false,
  enableZoom = true,
  onPageChange,
  onDownload
}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const flipBook = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pdf, setPdf] = useState<any>(null);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error('Error loading PDF:', error);
    setError('Failed to load PDF document');
    setIsLoading(false);
  }, []);

  // Fullscreen functionality
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Zoom functionality
  const zoomIn = useCallback(() => {
    setScale(prev => Math.min(prev + 0.2, 3));
  }, []);

  const zoomOut = useCallback(() => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  }, []);

  const resetZoom = useCallback(() => {
    setScale(1);
  }, []);

  // Navigation
  const goToPage = useCallback((pageNumber: number) => {
    if (flipBook.current && pageNumber >= 0 && pageNumber < numPages + (showCover ? 1 : 0)) {
      flipBook.current.pageFlip().flip(pageNumber);
    }
  }, [numPages, showCover]);

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
    const newPage = e.data;
    setCurrentPage(newPage);
    onPageChange?.(newPage);
  }, [onPageChange]);

  // Download functionality
  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title || 'document.pdf';
    link.click();
    onDownload?.();
  }, [pdfUrl, title, onDownload]);

  // Search functionality
  const performSearch = useCallback(async (term: string) => {
    if (!term.trim() || !pdf) return;

    setIsSearching(true);
    const results: any[] = [];

    try {
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const text = textContent.items.map((item: any) => item.str).join(' ');
        
        if (text.toLowerCase().includes(term.toLowerCase())) {
          results.push({
            pageNumber: pageNum,
            text: text.substring(0, 200) + '...',
            matches: (text.match(new RegExp(term, 'gi')) || []).length
          });
        }
      }
      
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  }, [pdf, numPages]);

  // Search input handler
  const handleSearchInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length > 2) {
      const debounceTimer = setTimeout(() => {
        performSearch(term);
      }, 300);
      
      return () => clearTimeout(debounceTimer);
    } else {
      setSearchResults([]);
    }
  }, [performSearch]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      switch (e.key) {
        case 'ArrowLeft':
          prevPage();
          break;
        case 'ArrowRight':
          nextPage();
          break;
        case 'f':
          if (enableFullscreen) toggleFullscreen();
          break;
        case '+':
          if (enableZoom) zoomIn();
          break;
        case '-':
          if (enableZoom) zoomOut();
          break;
        case '0':
          if (enableZoom) resetZoom();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [prevPage, nextPage, toggleFullscreen, zoomIn, zoomOut, resetZoom, enableFullscreen, enableZoom]);

  // Generate pages array
  const pages = [];
  
  // Add cover page if enabled
  if (showCover && numPages > 0) {
    pages.push(
      <div key="cover" className="pdf-cover" style={{ width: width * scale, height: height * scale }}>
        <div className="cover-content">
          <h2>{title || 'PDF Document'}</h2>
          <p>Click to open</p>
          <div className="cover-stats">
            <span>{numPages} pages</span>
          </div>
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
        scale={scale}
      />
    );
  }

  if (isLoading) {
    return (
      <div className={`pdf-flipbook-container loading ${className}`}>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading PDF...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`pdf-flipbook-container error ${className}`}>
        <div className="error-message">
          <h3>Error Loading PDF</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`pdf-flipbook-container advanced ${className} ${isFullscreen ? 'fullscreen' : ''}`}>
      {/* Hidden Document component to get total pages and PDF object */}
      <div style={{ display: 'none' }}>
        <Document
          file={pdfUrl}
          onLoadSuccess={(pdf) => {
            onDocumentLoadSuccess({ numPages: pdf.numPages });
            setPdf(pdf);
          }}
          onLoadError={onDocumentLoadError}
          loading=""
        >
          <Page pageNumber={1} />
        </Document>
      </div>

      {/* Toolbar */}
      <div className="flipbook-toolbar">
        <div className="toolbar-section">
          <button onClick={prevPage} disabled={currentPage === 0} className="toolbar-btn">
            <span>←</span>
          </button>
          <span className="page-info">
            {currentPage + 1} / {numPages + (showCover ? 1 : 0)}
          </span>
          <button onClick={nextPage} disabled={currentPage >= numPages + (showCover ? 0 : -1)} className="toolbar-btn">
            <span>→</span>
          </button>
        </div>

        {/* Search */}
        {enableSearch && (
          <div className="toolbar-section search-section">
            <input
              type="text"
              placeholder="Search in document..."
              value={searchTerm}
              onChange={handleSearchInput}
              className="search-input"
            />
            {isSearching && <div className="search-spinner">⏳</div>}
            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.slice(0, 5).map((result, index) => (
                  <div key={index} className="search-result" onClick={() => goToPage(result.pageNumber + (showCover ? 0 : -1))}>
                    Page {result.pageNumber} ({result.matches} matches)
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="toolbar-section actions">
          {enableZoom && (
            <>
              <button onClick={zoomOut} className="toolbar-btn" title="Zoom Out (-)">
                🔍-
              </button>
              <span className="zoom-level">{Math.round(scale * 100)}%</span>
              <button onClick={zoomIn} className="toolbar-btn" title="Zoom In (+)">
                🔍+
              </button>
              <button onClick={resetZoom} className="toolbar-btn" title="Reset Zoom (0)">
                ⚫
              </button>
            </>
          )}
          
          <button 
            onClick={() => setShowThumbnails(!showThumbnails)} 
            className={`toolbar-btn ${showThumbnails ? 'active' : ''}`}
            title="Toggle Thumbnails"
          >
            📑
          </button>

          {enableDownload && (
            <button onClick={handleDownload} className="toolbar-btn" title="Download PDF">
              📥
            </button>
          )}

          {enableFullscreen && (
            <button onClick={toggleFullscreen} className="toolbar-btn" title="Fullscreen (F)">
              {isFullscreen ? '📋' : '📺'}
            </button>
          )}
        </div>
      </div>

      {/* FlipBook */}
      <div className="flipbook-wrapper" style={{ transform: `scale(${isFullscreen ? 1 : scale})` }}>
        <HTMLFlipBook
          ref={flipBook}
          width={width}
          height={height}
          size="stretch"
          minWidth={315}
          maxWidth={isFullscreen ? 2000 : 1000}
          minHeight={400}
          maxHeight={isFullscreen ? 1500 : 1533}
          maxShadowOpacity={0.5}
          showCover={false}
          mobileScrollSupport={true}
          onFlip={onFlip}
          className="flipbook"
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {pages}
        </HTMLFlipBook>
      </div>

      {/* Thumbnail Navigation */}
      {showThumbnails && (
        <div className="thumbnail-nav">
          <div className="thumbnails">
            {showCover && (
              <div
                className={`thumbnail cover-thumb ${currentPage === 0 ? 'active' : ''}`}
                onClick={() => goToPage(0)}
              >
                <div className="cover-thumbnail">
                  <span>📄</span>
                  <span className="thumbnail-number">Cover</span>
                </div>
              </div>
            )}
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
      )}

      {/* Keyboard shortcuts help */}
      <div className="shortcuts-help">
        <small>
          Use arrow keys to navigate • F for fullscreen • +/- to zoom • 0 to reset zoom
        </small>
      </div>
    </div>
  );
};

export default PDFFlipBookAdvanced;