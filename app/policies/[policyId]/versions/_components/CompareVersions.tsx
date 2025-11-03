'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { PolicyVersion } from '@/types/policy'

interface CompareVersionsProps {
  versions: PolicyVersion[]
  policyId: string
}

export function CompareVersions({ versions, policyId }: CompareVersionsProps) {
  const router = useRouter()
  const [compareVersion1, setCompareVersion1] = useState<string | null>(null)
  const [compareVersion2, setCompareVersion2] = useState<string | null>(null)

  const handleCompare = () => {
    if (compareVersion1 && compareVersion2) {
      const v1 = versions.find((v) => v.id === compareVersion1)
      const v2 = versions.find((v) => v.id === compareVersion2)
      if (v1 && v2) {
        router.push(
          `/policies/${policyId}/compare?v1=${v1.version}&v2=${v2.version}`
        )
      }
    }
  }

  return (
    <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
      <h3>Compare Versions</h3>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
        <select
          value={compareVersion1 || ''}
          onChange={(e) => setCompareVersion1(e.target.value || null)}
          style={{ padding: '0.5rem' }}
        >
          <option value="">Select version 1...</option>
          {versions.map((v) => (
            <option key={v.id} value={v.id}>
              v{v.version}
            </option>
          ))}
        </select>
        <span>vs</span>
        <select
          value={compareVersion2 || ''}
          onChange={(e) => setCompareVersion2(e.target.value || null)}
          style={{ padding: '0.5rem' }}
        >
          <option value="">Select version 2...</option>
          {versions.map((v) => (
            <option key={v.id} value={v.id}>
              v{v.version}
            </option>
          ))}
        </select>
        <button
          onClick={handleCompare}
          disabled={!compareVersion1 || !compareVersion2}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: !compareVersion1 || !compareVersion2 ? 'not-allowed' : 'pointer',
          }}
        >
          Compare
        </button>
      </div>
    </div>
  )
}

