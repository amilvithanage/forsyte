import Link from 'next/link'
import { Policy } from '@/types/policy'

interface PolicyTableProps {
  policies: Policy[]
}

export function PolicyTable({ policies }: PolicyTableProps) {
  if (policies.length === 0) {
    return (
      <p>No policies found. Create a policy from a template.</p>
    )
  }

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b-2 border-gray-300">
          <th className="text-left p-2">Template</th>
          <th className="text-left p-2">Customer ID</th>
          <th className="text-left p-2">Created</th>
          <th className="text-left p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {policies.map((policy) => (
          <tr key={policy.id} className="border-b border-gray-200">
            <td className="p-2">{policy.template.name}</td>
            <td className="p-2">{policy.customerId}</td>
            <td className="p-2">
              {new Date(policy.createdAt).toLocaleDateString()}
            </td>
            <td className="p-2">
              <Link href={`/policies/${policy.id}`} className="text-blue-600 hover:underline">
                View Latest Version
              </Link>
              {' | '}
              <Link href={`/policies/${policy.id}/edit`} className="text-blue-600 hover:underline">
                Edit Latest Version
              </Link>
              {' | '}
              <Link href={`/policies/${policy.id}/versions`} className="text-blue-600 hover:underline">
                Versions History
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

