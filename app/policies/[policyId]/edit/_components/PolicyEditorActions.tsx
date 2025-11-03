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
    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
      <button
        onClick={onSave}
        disabled={saving}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: saving ? 'not-allowed' : 'pointer',
        }}
      >
        {saving ? 'Saving...' : 'Save New Version'}
      </button>
      <button
        onClick={() => router.push(`/policies/${policyId}`)}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: 'transparent',
          color: '#0070f3',
          border: '1px solid #0070f3',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        View Policy
      </button>
      <button
        onClick={() => router.push(`/policies/${policyId}/versions`)}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: 'transparent',
          color: '#0070f3',
          border: '1px solid #0070f3',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Version History
      </button>
    </div>
  )
}

