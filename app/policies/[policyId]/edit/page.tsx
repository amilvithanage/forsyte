'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface Policy {
  id: string
  customerId: string
  template: {
    id: string
    name: string
    schemaJson: any
  }
}

interface PolicyVersion {
  id: string
  version: number
  contentJson: any
  changeNote?: string | null
}

export default function PolicyEditorPage() {
  const params = useParams()
  const router = useRouter()
  const policyId = params.policyId as string

  const [policy, setPolicy] = useState<Policy | null>(null)
  const [latestVersion, setLatestVersion] = useState<PolicyVersion | null>(null)
  const [contentJson, setContentJson] = useState<any>({})
  const [changeNote, setChangeNote] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [previewHtml, setPreviewHtml] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    loadPolicy()
    loadLatestVersion()
  }, [policyId])

  const loadPolicy = async () => {
    try {
      const response = await fetch(`/api/policies/${policyId}`)
      if (response.ok) {
        const data = await response.json()
        setPolicy(data)
      }
    } catch (error) {
      console.error('Error loading policy:', error)
    }
  }

  const loadLatestVersion = async () => {
    try {
      const response = await fetch(`/api/policies/${policyId}/versions/latest`)
      if (response.ok) {
        const data = await response.json()
        setLatestVersion(data)
        setContentJson(data.contentJson || {})
      } else {
        // No version yet, start with empty content
        setContentJson({})
      }
    } catch (error) {
      console.error('Error loading latest version:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFieldChange = (fieldKey: string, value: any) => {
    setContentJson((prev: any) => ({
      ...prev,
      [fieldKey]: value,
    }))
  }

  const renderField = (section: any) => {
    const fieldKey = section.id || section.key
    const currentValue = contentJson[fieldKey]

    if (section.type === 'radio') {
      return (
        <div key={fieldKey} style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            {section.title || fieldKey}
          </label>
          {section.options?.map((option: any) => (
            <label key={option.value} style={{ display: 'block', marginBottom: '0.5rem' }}>
              <input
                type="radio"
                name={fieldKey}
                value={option.value}
                checked={currentValue === option.value}
                onChange={(e) => handleFieldChange(fieldKey, e.target.value)}
                style={{ marginRight: '0.5rem' }}
              />
              {option.label || option.value}
            </label>
          ))}
          {latestVersion && latestVersion.contentJson[fieldKey] !== currentValue && (
            <span style={{ color: 'orange', fontSize: '0.9rem', marginLeft: '1rem' }}>
              (Changed from v{latestVersion.version})
            </span>
          )}
        </div>
      )
    }

    if (section.type === 'select') {
      return (
        <div key={fieldKey} style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            {section.title || fieldKey}
          </label>
          <select
            value={currentValue || ''}
            onChange={(e) => handleFieldChange(fieldKey, e.target.value)}
            style={{ padding: '0.5rem', width: '100%', maxWidth: '400px' }}
          >
            <option value="">Select...</option>
            {section.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label || option.value}
              </option>
            ))}
          </select>
        </div>
      )
    }

    if (section.type === 'textarea' || section.type === 'text') {
      return (
        <div key={fieldKey} style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            {section.title || fieldKey}
          </label>
          <textarea
            value={currentValue || ''}
            onChange={(e) => handleFieldChange(fieldKey, e.target.value)}
            rows={4}
            style={{ padding: '0.5rem', width: '100%', maxWidth: '600px' }}
          />
        </div>
      )
    }

    return null
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/policies/${policyId}/versions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentJson,
          changeNote: changeNote || null,
        }),
      })

      if (response.ok) {
        router.push(`/policies/${policyId}/versions`)
      } else {
        alert('Failed to save version')
      }
    } catch (error) {
      console.error('Error saving version:', error)
      alert('Error saving version')
    } finally {
      setSaving(false)
    }
  }

  const handlePreview = async () => {
    if (!policy?.template.schemaJson) return

    try {
      const response = await fetch('/api/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schemaJson: policy.template.schemaJson,
          contentJson,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setPreviewHtml(data.html)
        setShowPreview(true)
      }
    } catch (error) {
      console.error('Error generating preview:', error)
    }
  }

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading...</div>
  }

  if (!policy) {
    return <div style={{ padding: '2rem' }}>Policy not found</div>
  }

  const schemaJson = policy.template.schemaJson
  const sections = schemaJson?.sections || []

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Policy Editor</h1>
        <p>
          <strong>Template:</strong> {policy.template.name}
        </p>
        {latestVersion && (
          <p>
            <strong>Current Version:</strong> v{latestVersion.version} (Last edited:{' '}
            {new Date(latestVersion.createdAt).toLocaleString()})
          </p>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: showPreview ? '1fr 1fr' : '1fr', gap: '2rem' }}>
        <div>
          <div style={{ marginBottom: '2rem' }}>
            <h2>Section: {policy.template.name}</h2>
            {latestVersion && (
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                v{latestVersion.version} - Current
              </p>
            )}
          </div>

          {sections.map((section: any) => renderField(section))}

          <div style={{ marginTop: '2rem', marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Change Reason:
            </label>
            <input
              type="text"
              value={changeNote}
              onChange={(e) => setChangeNote(e.target.value)}
              placeholder="Describe what changed and why..."
              style={{ padding: '0.5rem', width: '100%', maxWidth: '600px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: saving ? 'not-allowed' : 'pointer',
              }}
            >
              {saving ? 'Saving...' : 'Save New Version'}
            </button>
            <button
              onClick={handlePreview}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#666',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Preview Changes
            </button>
            <button
              onClick={() => router.push(`/policies/${policyId}/versions`)}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'transparent',
                color: '#0070f3',
                border: '1px solid #0070f3',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              View Version History
            </button>
          </div>
        </div>

        {showPreview && previewHtml && (
          <div>
            <h2>Preview Generated Policy Section</h2>
            <div
              style={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '1.5rem',
                backgroundColor: '#f9f9f9',
              }}
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
            <button
              onClick={() => setShowPreview(false)}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#666',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Close Preview
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

