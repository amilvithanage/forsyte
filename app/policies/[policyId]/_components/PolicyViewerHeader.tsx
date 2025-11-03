import Link from 'next/link'

interface PolicyViewerHeaderProps {
  templateName: string
  customerId: string
  latestVersion?: {
    version: number
    createdAt: string
  }
  currentVersion?: {
    version: number
  }
  policyId: string
}

export function PolicyViewerHeader({
  templateName,
  customerId,
  latestVersion,
  currentVersion,
  policyId,
}: PolicyViewerHeaderProps) {
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
          <h1>Policy Viewer</h1>
          <p>
            <strong>Template:</strong> {templateName}
          </p>
          <p>
            <strong>Customer ID:</strong> {customerId}
          </p>
          {latestVersion && (
            <p>
              <strong>Latest Version:</strong> v{latestVersion.version} (Last edited:{' '}
              {new Date(latestVersion.createdAt).toLocaleString()})
            </p>
          )}
          {currentVersion && (
            <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              <strong>Viewing:</strong> v{currentVersion.version}
            </p>
          )}
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

