import Link from 'next/link'
import { PolicyVersion } from '@/types/policy'

interface CompareHeaderProps {
  templateName: string
  version1: PolicyVersion
  version2: PolicyVersion
  policyId: string
}

export function CompareHeader({
  templateName,
  version1,
  version2,
  policyId,
}: CompareHeaderProps) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '1rem',
        }}
      >
        <div>
          <h1>Version Comparison</h1>
          <p>
            <strong>Template:</strong> {templateName}
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
      </div>
      <div>
        <Link
          href={`/policies/${policyId}/versions`}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'transparent',
            color: '#0070f3',
            border: '1px solid #0070f3',
            borderRadius: '4px',
            display: 'inline-block',
            textDecoration: 'none',
          }}
        >
          ← Back to Version History
        </Link>
      </div>
    </div>
  )
}

