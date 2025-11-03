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
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b-2 border-gray-300">
          <th className="text-left p-2">Version</th>
          <th className="text-left p-2">Change Note</th>
          <th className="text-left p-2">Created</th>
          <th className="text-left p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {versions.map((version) => (
          <tr key={version.id} className="border-b border-gray-200">
            <td className="p-2 font-bold">v{version.version}</td>
            <td className="p-2">
              {version.changeNote || <em className="text-gray-500">No change note</em>}
            </td>
            <td className="p-2">
              {new Date(version.createdAt).toLocaleString()}
            </td>
            <td className="p-2">
              <button
                onClick={() => router.push(`/policies/${policyId}?version=${version.version}`)}
                className="px-2 py-1 mr-2 bg-transparent text-blue-600 border border-blue-600 rounded cursor-pointer text-sm hover:bg-blue-50"
              >
                View
              </button>
              <button
                onClick={() => router.push(`/policies/${policyId}/edit?version=${version.version}`)}
                className="px-2 py-1 mr-2 bg-transparent text-green-600 border border-green-600 rounded cursor-pointer text-sm hover:bg-green-50"
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

