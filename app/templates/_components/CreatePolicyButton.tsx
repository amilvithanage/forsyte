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
      className="px-4 py-2 bg-blue-600 text-white border-none rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 disabled:hover:bg-gray-400"
    >
      {loading ? 'Creating...' : 'Create Policy'}
    </button>
  )
}

