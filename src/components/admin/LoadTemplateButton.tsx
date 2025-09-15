'use client'
import React, { useCallback } from 'react'
import { useField, useFormFields } from '@payloadcms/ui'
import { Button } from '@payloadcms/ui'

const LoadTemplateButton: React.FC = () => {
  const { setValue: setPageBuilderValue } = useField({ path: 'pageBuilder' })
  const { value: templateId } = useField({ path: 'templateSelector.template' })

  const loadTemplate = useCallback(async () => {
    if (!templateId) {
      alert('Please select a template first')
      return
    }

    try {
      // Fetch the template data
      const response = await fetch(`/api/page-templates/${templateId}`, {
        credentials: 'include',
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch template')
      }
      
      const template = await response.json()
      
      if (template.pageBuilder && Array.isArray(template.pageBuilder)) {
        // Load the template's page builder content
        setPageBuilderValue(template.pageBuilder)
        alert(`Template "${template.name}" loaded successfully!`)
      } else {
        alert('This template has no page builder content')
      }
    } catch (error) {
      console.error('Error loading template:', error)
      alert('Failed to load template. Please try again.')
    }
  }, [templateId, setPageBuilderValue])

  return (
    <div style={{ marginTop: '1rem' }}>
      <Button
        onClick={loadTemplate}
        buttonStyle="primary"
        size="small"
      >
        Load Template Content
      </Button>
      <p style={{ 
        marginTop: '0.5rem', 
        fontSize: '0.875rem', 
        color: '#666',
        lineHeight: '1.4'
      }}>
        This will replace the current page builder content with the selected template&apos;s content.
      </p>
    </div>
  )
}

export default LoadTemplateButton