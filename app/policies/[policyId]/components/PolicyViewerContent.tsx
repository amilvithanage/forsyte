import React from 'react'

interface PolicyViewerContentProps {
  sections: any[]
  contentJson: any
}

export function PolicyViewerContent({
  sections,
  contentJson,
}: PolicyViewerContentProps) {
  const getFieldValue = (fieldKey: string): string => {
    return contentJson[fieldKey] ?? ''
  }

  const findSelectedOption = (options: any[], value: string) => {
    return options?.find((opt: any) => opt.value === value)
  }

  const getDisplayValue = (section: any, fieldKey: string): string => {
    const currentValue = getFieldValue(fieldKey)
    
    if (section.options) {
      const selectedOption = findSelectedOption(section.options, currentValue)
      return selectedOption?.label || selectedOption?.value || currentValue || 'Not set'
    }
    
    return currentValue || 'Not set'
  }

  const renderFieldWrapper = (
    fieldKey: string,
    section: any,
    content: React.ReactNode
  ) => (
    <div key={fieldKey} style={{ marginBottom: '1.5rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
        {section.title || fieldKey}
      </label>
      {content}
    </div>
  )

  const renderField = (section: any) => {
    const fieldKey = section.id || section.key
    const currentValue = getFieldValue(fieldKey)
    const displayValue = getDisplayValue(section, fieldKey)

    // Radio and select have identical rendering in view mode
    if (section.type === 'radio' || section.type === 'select') {
      return renderFieldWrapper(
        fieldKey,
        section,
        <p style={{ padding: '0.5rem 0', color: '#333' }}>{displayValue}</p>
      )
    }

    if (section.type === 'textarea' || section.type === 'text') {
      return renderFieldWrapper(
        fieldKey,
        section,
        <p
          style={{
            padding: '0.5rem',
            backgroundColor: '#f9f9f9',
            borderRadius: '4px',
            whiteSpace: 'pre-wrap',
            color: '#333',
            minHeight: '3rem',
          }}
        >
          {displayValue}
        </p>
      )
    }

    return null
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Policy Content</h2>
      </div>
      {sections.map(renderField)}
    </div>
  )
}
