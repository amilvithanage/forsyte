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
    <div className="mb-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-4">Policy Viewer</h1>
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
            <p className="text-gray-600 text-sm mt-2">
              <strong>Viewing:</strong> v{currentVersion.version}
            </p>
          )}
        </div>
        <Link
          href="/policies"
          className="px-4 py-2 border border-gray-300 rounded inline-block hover:bg-gray-50"
        >
          ← Back to Policies
        </Link>
      </div>
    </div>
  )
}

