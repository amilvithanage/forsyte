import Link from 'next/link'

interface VersionHistoryHeaderProps {
  templateName: string
  policyId: string
}

export function VersionHistoryHeader({ templateName, policyId }: VersionHistoryHeaderProps) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div>
          <h1>Version History</h1>
          <p>
            <strong>Template:</strong> {templateName}
          </p>
          <p>
            <strong>Policy ID:</strong> {policyId}
          </p>
        </div>
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
    </div>
  )
}

