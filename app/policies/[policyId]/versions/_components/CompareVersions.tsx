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
    <div className="mb-8 p-4 bg-gray-100 rounded">
      <h3 className="text-lg font-bold mb-2">Compare Versions</h3>
      <div className="flex gap-4 items-center mt-2">
        <select
          value={compareVersion1 || ''}
          onChange={(e) => setCompareVersion1(e.target.value || null)}
          className="p-2 border border-gray-300 rounded"
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
          className="p-2 border border-gray-300 rounded"
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
          className="px-4 py-2 bg-blue-600 text-white border-none rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
        >
          Compare
        </button>
      </div>
    </div>
  )
}

