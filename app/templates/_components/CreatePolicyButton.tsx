'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createPolicy } from '@/app/policies/actions'

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
      const policy = await createPolicy(customerId, templateId)
      router.push(`/policies/${policy.id}/edit`)
    } catch (error: any) {
      console.error('Error creating policy:', error)
      alert(error.message || 'Failed to create policy')
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

