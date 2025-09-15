'use client'
import React, { useState, useEffect } from 'react'
import { useField } from '@payloadcms/ui'

interface Template {
  id: string
  name: string
  description?: string
  category: string
  thumbnail?: {
    url: string
    alt: string
  }
  tags?: Array<{ tag: string }>
  isFeatured: boolean
  isActive?: boolean
}

const TemplateGallery: React.FC = () => {
  const { setValue: setPageBuilderValue } = useField({ path: 'pageBuilder' })
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/page-templates?limit=100', {
        credentials: 'include',
      })
      
      if (response.ok) {
        const data = await response.json()
        setTemplates(data.docs || [])
      }
    } catch (error) {
      console.error('Error fetching templates:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadTemplate = async (templateId: string, templateName: string) => {
    try {
      const response = await fetch(`/api/page-templates/${templateId}`, {
        credentials: 'include',
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch template')
      }
      
      const template = await response.json()
      
      if (template.pageBuilder && Array.isArray(template.pageBuilder)) {
        setPageBuilderValue(template.pageBuilder)
        alert(`Template "${templateName}" loaded successfully!`)
      } else {
        alert('This template has no page builder content')
      }
    } catch (error) {
      console.error('Error loading template:', error)
      alert('Failed to load template. Please try again.')
    }
  }

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    const matchesSearch = !searchQuery || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags?.some(tag => tag.tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesSearch && template.isActive !== false
  })

  const categories = [
    { value: 'all', label: 'All Templates' },
    { value: 'homepage', label: '🏠 Homepage' },
    { value: 'about', label: '📄 About' },
    { value: 'contact', label: '📞 Contact' },
    { value: 'services', label: '🛍️ Services' },
    { value: 'team', label: '👥 Team' },
    { value: 'blog', label: '📰 Blog' },
    { value: 'portfolio', label: '📁 Portfolio' },
    { value: 'pricing', label: '💰 Pricing' },
    { value: 'faq', label: '❓ FAQ' },
    { value: 'landing', label: '🎯 Landing Page' },
    { value: 'other', label: '🔧 Other' },
  ]

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading templates...</div>
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600' }}>
        Page Template Gallery
      </h2>

      {/* Search and Filter Controls */}
      <div style={{ 
        marginBottom: '30px', 
        display: 'grid', 
        gridTemplateColumns: '1fr 200px', 
        gap: '15px',
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            backgroundColor: 'white'
          }}
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Featured Templates */}
      {filteredTemplates.some(t => t.isFeatured) && (
        <>
          <h3 style={{ marginBottom: '15px', fontSize: '18px', fontWeight: '500' }}>
            ⭐ Featured Templates
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '20px',
            marginBottom: '30px'
          }}>
            {filteredTemplates.filter(t => t.isFeatured).map(template => (
              <TemplateCard key={template.id} template={template} onLoad={loadTemplate} />
            ))}
          </div>
        </>
      )}

      {/* All Templates */}
      <h3 style={{ marginBottom: '15px', fontSize: '18px', fontWeight: '500' }}>
        All Templates ({filteredTemplates.length})
      </h3>
      
      {filteredTemplates.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          backgroundColor: '#f9f9f9', 
          borderRadius: '8px',
          color: '#666'
        }}>
          <p>No templates found matching your criteria.</p>
          <p style={{ fontSize: '14px', marginTop: '10px' }}>
            Try adjusting your search or category filter.
          </p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '20px'
        }}>
          {filteredTemplates.map(template => (
            <TemplateCard key={template.id} template={template} onLoad={loadTemplate} />
          ))}
        </div>
      )}
    </div>
  )
}

interface TemplateCardProps {
  template: Template
  onLoad: (id: string, name: string) => void
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onLoad }) => {
  return (
    <div style={{
      border: '1px solid #e1e5e9',
      borderRadius: '8px',
      padding: '20px',
      backgroundColor: 'white',
      transition: 'box-shadow 0.2s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = 'none'
    }}
    >
      {/* Template Thumbnail */}
      {template.thumbnail?.url && (
        <div style={{ 
          marginBottom: '15px',
          borderRadius: '6px',
          overflow: 'hidden',
          backgroundColor: '#f5f5f5',
          height: '150px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src={template.thumbnail.url} 
            alt={template.thumbnail.alt || template.name}
            style={{ 
              maxWidth: '100%', 
              maxHeight: '100%', 
              objectFit: 'cover' 
            }}
          />
        </div>
      )}

      {/* Template Info */}
      <h4 style={{ 
        margin: '0 0 10px 0', 
        fontSize: '16px', 
        fontWeight: '600',
        color: '#333'
      }}>
        {template.name}
        {template.isFeatured && (
          <span style={{ marginLeft: '8px', fontSize: '12px' }}>⭐</span>
        )}
      </h4>

      {template.description && (
        <p style={{ 
          margin: '0 0 15px 0', 
          fontSize: '14px', 
          color: '#666',
          lineHeight: '1.4'
        }}>
          {template.description.length > 100 
            ? `${template.description.substring(0, 100)}...` 
            : template.description
          }
        </p>
      )}

      {/* Tags */}
      {template.tags && template.tags.length > 0 && (
        <div style={{ marginBottom: '15px' }}>
          {template.tags.slice(0, 3).map((tagObj, index) => (
            <span
              key={index}
              style={{
                display: 'inline-block',
                fontSize: '12px',
                backgroundColor: '#f0f0f0',
                color: '#666',
                padding: '2px 8px',
                borderRadius: '12px',
                marginRight: '5px',
                marginBottom: '5px'
              }}
            >
              {tagObj.tag}
            </span>
          ))}
        </div>
      )}

      {/* Load Button */}
      <button
        onClick={() => onLoad(template.id, template.name)}
        style={{
          width: '100%',
          padding: '10px 16px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#0051cc'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#0070f3'
        }}
      >
        Load Template
      </button>
    </div>
  )
}

export default TemplateGallery