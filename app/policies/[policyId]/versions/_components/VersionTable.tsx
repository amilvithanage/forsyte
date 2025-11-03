'use client'

import { useRouter } from 'next/navigation'
import { PolicyVersion } from '@/types/policy'

interface VersionTableProps {
  versions: PolicyVersion[]
  policyId: string
}

export function VersionTable({ versions, policyId }: VersionTableProps) {
  const router = useRouter()

  if (versions.length === 0) {
    return (
      <p>No versions found. Create your first version in the editor.</p>
    )
  }

  return (
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
                onClick={() => router.push(`/policies/${policyId}?version=${version.version}`)}
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
  )
}

