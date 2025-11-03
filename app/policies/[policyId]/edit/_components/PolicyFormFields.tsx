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
      <div key={fieldKey} className="mb-6">
        <label className="block mb-2 font-bold">
          {section.title || fieldKey}
        </label>
        {content}
        {hasChanged && currentVersion && (
          <span className="text-orange-500 text-sm ml-4">
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
            <label key={option.value} className="block mb-2">
              <input
                type="radio"
                name={fieldKey}
                value={option.value}
                checked={currentValue === option.value}
                onChange={(e) => onFieldChange(fieldKey, e.target.value)}
                className="mr-2"
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
          className="p-2 w-full max-w-md border border-gray-300 rounded"
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
          className="p-2 w-full max-w-2xl border border-gray-300 rounded"
        />
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
      <div className="mt-8 mb-4">
        <label className="block mb-2 font-bold">
          Change Reason:
        </label>
        <input
          type="text"
          value={changeNote}
          onChange={(e) => onChangeNoteChange(e.target.value)}
          placeholder="Describe what changed and why..."
          className="p-2 w-full max-w-2xl border border-gray-300 rounded"
        />
      </div>
    </div>
  )
}
