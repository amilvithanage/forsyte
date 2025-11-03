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
    <div key={fieldKey} className="mb-6">
      <label className="block mb-2 font-bold">
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
        <p className="py-2 text-gray-800">{displayValue}</p>
      )
    }

    if (section.type === 'textarea' || section.type === 'text') {
      return renderFieldWrapper(
        fieldKey,
        section,
        <p className="p-2 bg-gray-50 rounded whitespace-pre-wrap text-gray-800 min-h-12">
          {displayValue}
        </p>
      )
    }

    return null
  }

  return (
    <div>
      <div className="mb-8">
        <h2>Policy Content</h2>
      </div>
      {sections.map(renderField)}
    </div>
  )
}
