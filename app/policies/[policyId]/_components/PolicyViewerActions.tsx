'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface PolicyViewerActionsProps {
  policyId: string
  currentVersion?: number
}

export function PolicyViewerActions({ policyId, currentVersion }: PolicyViewerActionsProps) {
  const router = useRouter()

  return (
    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
      <button
        onClick={() =>
          router.push(
            `/policies/${policyId}/edit${currentVersion ? `?version=${currentVersion}` : ''}`
          )
        }
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Edit This Version
      </button>
      <Link
        href={`/policies/${policyId}/versions`}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: 'transparent',
          color: '#0070f3',
          border: '1px solid #0070f3',
          borderRadius: '4px',
          display: 'inline-block',
          textDecoration: 'none',
        }}
      >
        View Version History
      </Link>
      <Link
        href={`/policies/${policyId}/edit`}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: 'transparent',
          color: '#0070f3',
          border: '1px solid #0070f3',
          borderRadius: '4px',
          display: 'inline-block',
          textDecoration: 'none',
        }}
      >
        Edit Latest Version
      </Link>
    </div>
  )
}

