import Link from 'next/link'

interface VersionHistoryHeaderProps {
  templateName: string
  policyId: string
}

export function VersionHistoryHeader({ templateName, policyId }: VersionHistoryHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold mb-4">Version History</h1>
          <p>
            <strong>Template:</strong> {templateName}
          </p>
          <p>
            <strong>Policy ID:</strong> {policyId}
          </p>
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

