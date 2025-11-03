'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface CreatePolicyButtonProps {
  templateId: string
}

export function CreatePolicyButton({ templateId }: CreatePolicyButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleCreatePolicy = async () => {
    const customerId = prompt('Enter Customer ID:')
    if (!customerId) return

    setLoading(true)
    try {
      const response = await fetch('/api/policies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, templateId }),
      })

      if (response.ok) {
        const policy = await response.json()
        router.push(`/policies/${policy.id}/edit`)
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to create policy')
      }
    } catch (error) {
      console.error('Error creating policy:', error)
      alert('Error creating policy')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleCreatePolicy}
      disabled={loading}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: loading ? '#ccc' : '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: loading ? 'not-allowed' : 'pointer',
      }}
    >
      {loading ? 'Creating...' : 'Create Policy'}
    </button>
  )
}

