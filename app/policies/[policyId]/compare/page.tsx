'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'

interface PolicyVersion {
  id: string
  version: number
  contentJson: any
  changeNote?: string | null
  createdAt: string
}

interface Policy {
  id: string
  template: {
    id: string
    name: string
    schemaJson: any
  }
}

export default function ComparePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const policyId = params.policyId as string

  const v1Num = searchParams.get('v1')
  const v2Num = searchParams.get('v2')

  const [policy, setPolicy] = useState<Policy | null>(null)
  const [version1, setVersion1] = useState<PolicyVersion | null>(null)
  const [version2, setVersion2] = useState<PolicyVersion | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!v1Num || !v2Num) {
      router.push(`/policies/${policyId}/versions`)
      return
    }

    loadPolicy()
    loadVersions()
  }, [policyId, v1Num, v2Num])

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

  const loadVersions = async () => {
    if (!v1Num || !v2Num) return

    try {
      const version1Num = parseInt(v1Num, 10)
      const version2Num = parseInt(v2Num, 10)

      if (isNaN(version1Num) || isNaN(version2Num)) {
        router.push(`/policies/${policyId}/versions`)
        return
      }

      const [res1, res2] = await Promise.all([
        fetch(`/api/policies/${policyId}/versions/${version1Num}`),
        fetch(`/api/policies/${policyId}/versions/${version2Num}`),
      ])

      if (res1.ok && res2.ok) {
        const v1 = await res1.json()
        const v2 = await res2.json()
        setVersion1(v1)
        setVersion2(v2)
      }
    } catch (error) {
      console.error('Error loading versions:', error)
    } finally {
      setLoading(false)
    }
  }

  const getFieldLabel = (fieldKey: string): string => {
    if (!policy?.template.schemaJson) return fieldKey
    const section = policy.template.schemaJson.sections?.find(
      (s: any) => (s.id || s.key) === fieldKey
    )
    return section?.title || fieldKey
  }

  const getFieldValue = (fieldKey: string, contentJson: any, schemaJson: any): string => {
    const value = contentJson[fieldKey]
    if (value === undefined || value === null) return 'Not set'

    const section = schemaJson?.sections?.find((s: any) => (s.id || s.key) === fieldKey)
    if (section?.options) {
      const option = section.options.find((opt: any) => opt.value === value)
      return option?.label || value
    }

    return String(value)
  }

  const hasChanges = (): boolean => {
    if (!version1 || !version2) return false

    const keys = new Set([
      ...Object.keys(version1.contentJson || {}),
      ...Object.keys(version2.contentJson || {}),
    ])

    return Array.from(keys).some((key) => {
      const v1Value = version1.contentJson[key]
      const v2Value = version2.contentJson[key]
      return JSON.stringify(v1Value) !== JSON.stringify(v2Value)
    })
  }

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading...</div>
  }

  if (!policy || !version1 || !version2) {
    return <div style={{ padding: '2rem' }}>Versions not found</div>
  }

  const allKeys = new Set([
    ...Object.keys(version1.contentJson || {}),
    ...Object.keys(version2.contentJson || {}),
  ])

  return (
    <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Version Comparison</h1>
        <p>
          <strong>Template:</strong> {policy.template.name}
        </p>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '2rem' }}>
          <div>
            <strong>Version {version1.version}</strong>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              {new Date(version1.createdAt).toLocaleString()}
            </div>
            {version1.changeNote && (
              <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
                {version1.changeNote}
              </div>
            )}
          </div>
          <div>
            <strong>Version {version2.version}</strong>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              {new Date(version2.createdAt).toLocaleString()}
            </div>
            {version2.changeNote && (
              <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
                {version2.changeNote}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={() => router.push(`/policies/${policyId}/versions`)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'transparent',
            color: '#0070f3',
            border: '1px solid #0070f3',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          ← Back to Version History
        </button>
      </div>

      {!hasChanges() ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
          No changes detected between these versions.
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <div style={{ borderRight: '1px solid #ccc', padding: '1rem', backgroundColor: '#fff5f5' }}>
            <h3 style={{ marginBottom: '1rem', color: '#c53030' }}>Version {version1.version}</h3>
            {Array.from(allKeys).map((key) => {
              const v1Value = getFieldValue(key, version1.contentJson, policy.template.schemaJson)
              const v2Value = getFieldValue(key, version2.contentJson, policy.template.schemaJson)
              const changed = JSON.stringify(version1.contentJson[key]) !== JSON.stringify(version2.contentJson[key])

              return (
                <div
                  key={key}
                  style={{
                    marginBottom: '1rem',
                    padding: '0.75rem',
                    backgroundColor: changed ? '#fed7d7' : 'transparent',
                    borderRadius: '4px',
                    border: changed ? '2px solid #c53030' : '1px solid #e2e8f0',
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {getFieldLabel(key)}
                  </div>
                  <div style={{ color: changed ? '#742a2a' : '#4a5568' }}>
                    {v1Value}
                  </div>
                </div>
              )
            })}
          </div>

          <div style={{ padding: '1rem', backgroundColor: '#f0fff4' }}>
            <h3 style={{ marginBottom: '1rem', color: '#22543d' }}>Version {version2.version}</h3>
            {Array.from(allKeys).map((key) => {
              const v1Value = getFieldValue(key, version1.contentJson, policy.template.schemaJson)
              const v2Value = getFieldValue(key, version2.contentJson, policy.template.schemaJson)
              const changed = JSON.stringify(version1.contentJson[key]) !== JSON.stringify(version2.contentJson[key])

              return (
                <div
                  key={key}
                  style={{
                    marginBottom: '1rem',
                    padding: '0.75rem',
                    backgroundColor: changed ? '#c6f6d5' : 'transparent',
                    borderRadius: '4px',
                    border: changed ? '2px solid #22543d' : '1px solid #e2e8f0',
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {getFieldLabel(key)}
                  </div>
                  <div style={{ color: changed ? '#1a202c' : '#4a5568' }}>
                    {v2Value}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </main>
  )
}

