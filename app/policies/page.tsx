'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Policy {
  id: string
  customerId: string
  templateId: string
  createdAt: string
  template: {
    id: string
    name: string
  }
}

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>([])
  const [customerId, setCustomerId] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchPolicies = async () => {
    if (!customerId) return

    setLoading(true)
    try {
      const response = await fetch(`/api/policies?customerId=${customerId}`)
      if (response.ok) {
        const data = await response.json()
        setPolicies(data)
      }
    } catch (error) {
      console.error('Error fetching policies:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Default customer ID for demo
    setCustomerId('customer-1')
  }, [])

  useEffect(() => {
    if (customerId) {
      fetchPolicies()
    }
  }, [customerId])

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Policies</h1>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <label>
            Customer ID:
            <input
              type="text"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
            />
          </label>
          <button onClick={fetchPolicies} disabled={loading || !customerId}>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <Link href="/templates" style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', display: 'inline-block' }}>
          Create New Policy from Template
        </Link>
      </div>

      <div>
        {policies.length === 0 ? (
          <p>No policies found. Create a policy from a template.</p>
        ) : (
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
        )}
      </div>
    </main>
  )
}

