'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface PolicyVersion {
  id: string
  version: number
  contentJson: any
  changeNote?: string | null
  createdAt: string
}

interface Policy {
  id: string
  customerId: string
  template: {
    id: string
    name: string
  }
}

export default function VersionHistoryPage() {
  const params = useParams()
  const router = useRouter()
  const policyId = params.policyId as string

  const [policy, setPolicy] = useState<Policy | null>(null)
  const [versions, setVersions] = useState<PolicyVersion[]>([])
  const [loading, setLoading] = useState(true)
  const [compareVersion1, setCompareVersion1] = useState<string | null>(null)
  const [compareVersion2, setCompareVersion2] = useState<string | null>(null)

  useEffect(() => {
    loadPolicy()
    loadVersions()
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

  const loadVersions = async () => {
    try {
      const response = await fetch(`/api/policies/${policyId}/versions`)
      if (response.ok) {
        const data = await response.json()
        setVersions(data)
      }
    } catch (error) {
      console.error('Error loading versions:', error)
    } finally {
      setLoading(false)
    }
  }


  const handleCompare = () => {
    if (compareVersion1 && compareVersion2) {
      const v1 = versions.find((v) => v.id === compareVersion1)
      const v2 = versions.find((v) => v.id === compareVersion2)
      if (v1 && v2) {
        router.push(
          `/policies/${policyId}/compare?v1=${v1.version}&v2=${v2.version}`
        )
      }
    }
  }

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading...</div>
  }

  if (!policy) {
    return <div style={{ padding: '2rem' }}>Policy not found</div>
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Version History</h1>
        <p>
          <strong>Template:</strong> {policy.template.name}
        </p>
        <p>
          <strong>Policy ID:</strong> {policyId}
        </p>
      </div>

      <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        <h3>Compare Versions</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
          <select
            value={compareVersion1 || ''}
            onChange={(e) => setCompareVersion1(e.target.value)}
            style={{ padding: '0.5rem' }}
          >
            <option value="">Select version 1...</option>
            {versions.map((v) => (
              <option key={v.id} value={v.id}>
                v{v.version}
              </option>
            ))}
          </select>
          <span>vs</span>
          <select
            value={compareVersion2 || ''}
            onChange={(e) => setCompareVersion2(e.target.value)}
            style={{ padding: '0.5rem' }}
          >
            <option value="">Select version 2...</option>
            {versions.map((v) => (
              <option key={v.id} value={v.id}>
                v{v.version}
              </option>
            ))}
          </select>
          <button
            onClick={handleCompare}
            disabled={!compareVersion1 || !compareVersion2}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: !compareVersion1 || !compareVersion2 ? 'not-allowed' : 'pointer',
            }}
          >
            Compare
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <Link
          href="/policies"
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            display: 'inline-block',
          }}
        >
          ← Back to Policies
        </Link>
      </div>

      {versions.length === 0 ? (
        <p>No versions found. Create your first version in the editor.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ccc' }}>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Version</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Change Note</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Created</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {versions.map((version) => (
              <tr key={version.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>v{version.version}</td>
                <td style={{ padding: '0.5rem' }}>
                  {version.changeNote || <em style={{ color: '#999' }}>No change note</em>}
                </td>
                <td style={{ padding: '0.5rem' }}>
                  {new Date(version.createdAt).toLocaleString()}
                </td>
                <td style={{ padding: '0.5rem' }}>
                  <button
                    onClick={() => router.push(`/policies/${policyId}/edit?version=${version.version}&mode=view`)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      marginRight: '0.5rem',
                      backgroundColor: 'transparent',
                      color: '#0070f3',
                      border: '1px solid #0070f3',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                    }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => router.push(`/policies/${policyId}/edit?version=${version.version}`)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      marginRight: '0.5rem',
                      backgroundColor: 'transparent',
                      color: '#28a745',
                      border: '1px solid #28a745',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}

