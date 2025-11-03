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
    <div className="mb-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-4">Version Comparison</h1>
          <p>
            <strong>Template:</strong> {templateName}
          </p>
          <div className="mt-4 flex gap-8">
            <div>
              <strong>Version {version1.version}</strong>
              <div className="text-sm text-gray-600">
                {new Date(version1.createdAt).toLocaleString()}
              </div>
              {version1.changeNote && (
                <div className="text-xs text-gray-600 mt-1">
                  {version1.changeNote}
                </div>
              )}
            </div>
            <div>
              <strong>Version {version2.version}</strong>
              <div className="text-sm text-gray-600">
                {new Date(version2.createdAt).toLocaleString()}
              </div>
              {version2.changeNote && (
                <div className="text-xs text-gray-600 mt-1">
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
          className="px-4 py-2 bg-transparent text-blue-600 border border-blue-600 rounded inline-block no-underline hover:bg-blue-50"
        >
          ← Back to Version History
        </Link>
      </div>
    </div>
  )
}

