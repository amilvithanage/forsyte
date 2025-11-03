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
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #ccc' }}>
          <th style={{ textAlign: 'left', padding: '0.5rem' }}>Template</th>
          <th style={{ textAlign: 'left', padding: '0.5rem' }}>Customer ID</th>
          <th style={{ textAlign: 'left', padding: '0.5rem' }}>Created</th>
          <th style={{ textAlign: 'left', padding: '0.5rem' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {policies.map((policy) => (
          <tr key={policy.id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '0.5rem' }}>{policy.template.name}</td>
            <td style={{ padding: '0.5rem' }}>{policy.customerId}</td>
            <td style={{ padding: '0.5rem' }}>
              {new Date(policy.createdAt).toLocaleDateString()}
            </td>
            <td style={{ padding: '0.5rem' }}>
              <Link href={`/policies/${policy.id}/edit`}>
                Edit
              </Link>
              {' | '}
              <Link href={`/policies/${policy.id}/versions`}>
                Versions
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

