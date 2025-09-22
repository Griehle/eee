'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import './pdf-demo.css';

// Import components dynamically to avoid SSR issues
const PDFFlipBookWrapper = dynamic(() => import('../../../components/PDFFlipBook/PDFFlipBookWrapper'), {
  ssr: false,
  loading: () => <div className="loading-placeholder">Loading PDF FlipBook...</div>
});

export default function PDFDemoPage() {
  return (
    <div className="pdf-demo-page">
      <div className="container">
        <header className="demo-header">
          <h1>📚 PDF Flip Book Demo</h1>
          <p>
            Experience PDF documents like never before with our DearFlip-style flip book viewer.
            Upload PDFs through PayloadCMS and display them with beautiful page-turning animations.
          </p>
        </header>

        <section className="demo-section">
          <h2>🚀 Getting Started</h2>
          <div className="getting-started">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Upload PDF in PayloadCMS</h3>
                <p>Go to your PayloadCMS admin panel → PDF Documents → Create New</p>
                <code>/admin/collections/pdf-documents</code>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Configure Settings</h3>
                <p>Set title, category, thumbnail, and flip book settings</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Display on Website</h3>
                <p>Use the PDFFlipBook component with the PDF URL</p>
              </div>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>📖 Basic PDF FlipBook</h2>
          <p>Simple, clean flip book with essential features:</p>
          
          <div className="demo-container demo-placeholder">
            <div className="demo-info">
              <h3>🎯 Ready to Use!</h3>
              <p>Upload your first PDF in PayloadCMS to see the flip book in action.</p>
              <div className="feature-list">
                <span className="feature">✅ Page flipping animation</span>
                <span className="feature">✅ Thumbnail navigation</span>
                <span className="feature">✅ Mobile responsive</span>
                <span className="feature">✅ Keyboard shortcuts</span>
              </div>
            </div>
          </div>
          
          <div className="code-example">
            <h4>Usage Example:</h4>
            <pre><code>{`import PDFFlipBook from '@/components/PDFFlipBook/PDFFlipBook';

<PDFFlipBook
  pdfUrl="/path/to/your/document.pdf"
  title="My Document"
  width={500}
  height={700}
  showCover={true}
  className="my-flipbook"
/>`}</code></pre>
          </div>
        </section>

        <section className="demo-section">
          <h2>⚡ Advanced PDF FlipBook</h2>
          <p>Feature-rich flip book with search, zoom, fullscreen, and more:</p>
          
          <div className="demo-container demo-placeholder">
            <div className="demo-info">
              <h3>🚀 Advanced Features!</h3>
              <p>The advanced version includes all basic features plus:</p>
              <div className="feature-list">
                <span className="feature">✅ PDF text search</span>
                <span className="feature">✅ Zoom in/out</span>
                <span className="feature">✅ Fullscreen mode</span>
                <span className="feature">✅ Download button</span>
                <span className="feature">✅ Enhanced toolbar</span>
              </div>
            </div>
          </div>
          
          <div className="code-example">
            <h4>Advanced Usage Example:</h4>
            <pre><code>{`import PDFFlipBookAdvanced from '@/components/PDFFlipBook/PDFFlipBookAdvanced';

<PDFFlipBookAdvanced
  pdfUrl="/path/to/your/document.pdf"
  title="My Advanced Document"
  width={600}
  height={800}
  showCover={true}
  enableDownload={true}
  enableFullscreen={true}
  enableSearch={true}
  enableZoom={true}
  onPageChange={(page) => console.log('Page:', page)}
  onDownload={() => console.log('Downloaded')}
/>`}</code></pre>
          </div>
        </section>

        <section className="demo-section">
          <h2>📚 Live Demo with PayloadCMS</h2>
          <p>This component automatically fetches and displays PDF documents from your PayloadCMS collection:</p>
          
          <div className="demo-container">
            <PDFFlipBookWrapper
              useAdvanced={true}
              className="live-demo"
              onPageChange={(page) => console.log('Page changed to:', page)}
              onDownload={() => console.log('Document downloaded')}
            />
          </div>
          
          <div className="code-example">
            <h4>PayloadCMS Integration Example:</h4>
            <pre><code>{`import PDFFlipBookWrapper from '@/components/PDFFlipBook/PDFFlipBookWrapper';

// Display all published PDFs
<PDFFlipBookWrapper useAdvanced={true} />

// Display PDFs from specific category
<PDFFlipBookWrapper category="brochure" useAdvanced={true} />

// Display specific document by ID
<PDFFlipBookWrapper documentId="12345" useAdvanced={false} />`}</code></pre>
          </div>
        </section>

        <section className="demo-section">
          <h2>🎯 Features Comparison</h2>
          <div className="features-comparison">
            <div className="feature-column">
              <h3>Basic FlipBook</h3>
              <ul>
                <li>✅ Page flipping animation</li>
                <li>✅ Thumbnail navigation</li>
                <li>✅ Mobile responsive</li>
                <li>✅ Previous/Next buttons</li>
                <li>✅ Cover page option</li>
                <li>✅ Keyboard navigation</li>
              </ul>
            </div>
            <div className="feature-column">
              <h3>Advanced FlipBook</h3>
              <ul>
                <li>✅ Everything from Basic</li>
                <li>✅ Search within PDF</li>
                <li>✅ Zoom in/out</li>
                <li>✅ Fullscreen mode</li>
                <li>✅ Download button</li>
                <li>✅ Enhanced toolbar</li>
                <li>✅ Keyboard shortcuts</li>
                <li>✅ Progress tracking</li>
                <li>✅ Error handling</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>⌨️ Keyboard Shortcuts</h2>
          <div className="shortcuts-grid">
            <div className="shortcut">
              <kbd>←</kbd><kbd>→</kbd>
              <span>Navigate pages</span>
            </div>
            <div className="shortcut">
              <kbd>F</kbd>
              <span>Toggle fullscreen</span>
            </div>
            <div className="shortcut">
              <kbd>+</kbd><kbd>-</kbd>
              <span>Zoom in/out</span>
            </div>
            <div className="shortcut">
              <kbd>0</kbd>
              <span>Reset zoom</span>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>🔗 Integration with PayloadCMS</h2>
          <p>The PDF Documents collection includes:</p>
          <ul>
            <li>📁 PDF file upload with validation</li>
            <li>🖼️ Optional thumbnail images</li>
            <li>📝 Title, description, and metadata</li>
            <li>🏷️ Categories and tags for organization</li>
            <li>⚙️ Flip book configuration options</li>
            <li>📊 View and download tracking</li>
            <li>🔐 Publishing controls</li>
          </ul>
        </section>

        <section className="demo-section api-section">
          <h2>📡 API Integration</h2>
          <p>Fetch PDF documents from PayloadCMS:</p>
          
          <div className="code-example">
            <h4>Fetching PDF Documents:</h4>
            <pre><code>{`// Fetch all published PDF documents
const response = await fetch('/api/pdf-documents?where[isPublished][equals]=true');
const { docs } = await response.json();

// Use in component
{docs.map((doc) => (
  <PDFFlipBookAdvanced
    key={doc.id}
    pdfUrl={doc.pdfFile.url}
    title={doc.title}
    width={doc.settings.width}
    height={doc.settings.height}
    showCover={doc.settings.showCover}
    enableDownload={doc.settings.enableDownload}
    enableFullscreen={doc.settings.enableFullscreen}
  />
))}`}</code></pre>
          </div>
        </section>

        <section className="demo-section">
          <h2>🎨 Customization</h2>
          <p>Both components are fully customizable:</p>
          <ul>
            <li>🎨 Custom CSS classes and styling</li>
            <li>📐 Configurable dimensions</li>
            <li>🌈 Color themes and branding</li>
            <li>🔧 Feature toggles</li>
            <li>📱 Mobile-first responsive design</li>
            <li>🌙 Dark mode support</li>
          </ul>
        </section>

        <footer className="demo-footer">
          <h3>🚀 Ready to Get Started?</h3>
          <p>
            Your PDF flip book components are ready to use! 
            Upload your first PDF document in PayloadCMS and start creating beautiful flip books.
          </p>
          <div className="footer-links">
            <a href="/admin" className="footer-link admin-link">
              Go to PayloadCMS Admin
            </a>
            <a href="https://github.com" className="footer-link github-link">
              View on GitHub
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}