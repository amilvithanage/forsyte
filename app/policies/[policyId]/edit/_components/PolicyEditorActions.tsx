'use client'

import { useRouter } from 'next/navigation'

interface PolicyEditorActionsProps {
  policyId: string
  onSave: () => Promise<void>
  saving: boolean
}

export function PolicyEditorActions({
  policyId,
  onSave,
  saving,
}: PolicyEditorActionsProps) {
  const router = useRouter()

  return (
    <div className="flex gap-4 mt-8 flex-wrap">
      <button
        onClick={onSave}
        disabled={saving}
        className="px-6 py-3 bg-green-600 text-white border-none rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700"
      >
        {saving ? 'Saving...' : 'Save New Version'}
      </button>
      <button
        onClick={() => router.push(`/policies/${policyId}`)}
        className="px-6 py-3 bg-blue-600 text-white border-none rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
      >
        View latest version of Policy
      </button>
      <button
        onClick={() => router.push(`/policies/${policyId}/versions`)}
        className="px-6 py-3 bg-yellow-600 text-white border-none rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-700"
      >
        Version History
      </button>
    </div>
  )
}

