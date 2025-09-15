import React from 'react'

const TemplateUsageInstructions: React.FC = () => {
  return (
    <div style={{
      padding: '16px',
      backgroundColor: '#f8f9fa',
      border: '1px solid #e9ecef',
      borderRadius: '6px',
      fontSize: '14px',
      lineHeight: '1.5'
    }}>
      <h4 style={{ 
        margin: '0 0 12px 0',
        fontSize: '16px',
        fontWeight: '600',
        color: '#333'
      }}>
        📖 How to Use This Template
      </h4>
      
      <div style={{ marginBottom: '16px' }}>
        <h5 style={{ 
          margin: '0 0 8px 0',
          fontSize: '14px',
          fontWeight: '600',
          color: '#555'
        }}>
          Method 1: Via Pages Editor
        </h5>
        <ol style={{ 
          margin: '0 0 0 20px',
          padding: '0',
          color: '#666'
        }}>
          <li>Go to <strong>Pages</strong> collection</li>
          <li>Create or edit a page</li>
          <li>In the sidebar, find <strong>Template Options</strong></li>
          <li>Check &quot;Load content from a template&quot;</li>
          <li>Select this template and click &quot;Load Template Content&quot;</li>
        </ol>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h5 style={{ 
          margin: '0 0 8px 0',
          fontSize: '14px',
          fontWeight: '600',
          color: '#555'
        }}>
          Method 2: Via Template Gallery
        </h5>
        <ol style={{ 
          margin: '0 0 0 20px',
          padding: '0',
          color: '#666'
        }}>
          <li>Go to <strong>Pages</strong> collection</li>
          <li>Create or edit a page</li>
          <li>Scroll down to the <strong>Template Gallery</strong> section</li>
          <li>Browse templates and click &quot;Load Template&quot;</li>
        </ol>
      </div>

      <div style={{
        padding: '12px',
        backgroundColor: '#fff3cd',
        border: '1px solid #ffeaa7',
        borderRadius: '4px',
        color: '#856404'
      }}>
        <strong>💡 Tip:</strong> After loading a template, you can customize all blocks according to your needs. Templates provide a starting point that you can fully modify.
      </div>
    </div>
  )
}

export default TemplateUsageInstructions