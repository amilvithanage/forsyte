import React from 'react'
import { PolicyVersion } from '@/types/policy'

interface PolicyFormFieldsProps {
  sections: any[]
  contentJson: any
  currentVersion?: PolicyVersion | null
  onFieldChange: (fieldKey: string, value: any) => void
  changeNote: string
  onChangeNoteChange: (value: string) => void
}

export function PolicyFormFields({
  sections,
  contentJson,
  currentVersion,
  onFieldChange,
  changeNote,
  onChangeNoteChange,
}: PolicyFormFieldsProps) {
  const getFieldValue = (fieldKey: string) => {
    return contentJson[fieldKey]
  }

  const hasFieldChanged = (fieldKey: string): boolean => {
    if (!currentVersion) return false
    return (
      JSON.stringify(currentVersion.contentJson[fieldKey]) !==
      JSON.stringify(contentJson[fieldKey])
    )
  }

  const renderFieldWrapper = (
    fieldKey: string,
    section: any,
    content: React.ReactNode
  ) => {
    const hasChanged = hasFieldChanged(fieldKey)

    return (
      <div key={fieldKey} style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          {section.title || fieldKey}
        </label>
        {content}
        {hasChanged && currentVersion && (
          <span style={{ color: 'orange', fontSize: '0.9rem', marginLeft: '1rem' }}>
            (Changed from v{currentVersion.version})
          </span>
        )}
      </div>
    )
  }

  const renderField = (section: any) => {
    const fieldKey = section.id || section.key
    const currentValue = getFieldValue(fieldKey)

    if (section.type === 'radio') {
      return renderFieldWrapper(
        fieldKey,
        section,
        <div>
          {section.options?.map((option: any) => (
            <label key={option.value} style={{ display: 'block', marginBottom: '0.5rem' }}>
              <input
                type="radio"
                name={fieldKey}
                value={option.value}
                checked={currentValue === option.value}
                onChange={(e) => onFieldChange(fieldKey, e.target.value)}
                style={{ marginRight: '0.5rem' }}
              />
              {option.label || option.value}
            </label>
          ))}
        </div>
      )
    }

    if (section.type === 'select') {
      return renderFieldWrapper(
        fieldKey,
        section,
        <select
          value={currentValue || ''}
          onChange={(e) => onFieldChange(fieldKey, e.target.value)}
          style={{ padding: '0.5rem', width: '100%', maxWidth: '400px' }}
        >
          <option value="">Select...</option>
          {section.options?.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.label || option.value}
            </option>
          ))}
        </select>
      )
    }

    if (section.type === 'textarea' || section.type === 'text') {
      return renderFieldWrapper(
        fieldKey,
        section,
        <textarea
          value={currentValue || ''}
          onChange={(e) => onFieldChange(fieldKey, e.target.value)}
          rows={4}
          style={{ padding: '0.5rem', width: '100%', maxWidth: '600px' }}
        />
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
      <div style={{ marginTop: '2rem', marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Change Reason:
        </label>
        <input
          type="text"
          value={changeNote}
          onChange={(e) => onChangeNoteChange(e.target.value)}
          placeholder="Describe what changed and why..."
          style={{ padding: '0.5rem', width: '100%', maxWidth: '600px' }}
        />
      </div>
    </div>
  )
}
