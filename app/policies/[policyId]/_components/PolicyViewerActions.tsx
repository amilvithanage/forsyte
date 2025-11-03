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
    <div className="flex gap-4 mt-8 flex-wrap">
      <button
        onClick={() =>
          router.push(
            `/policies/${policyId}/edit${currentVersion ? `?version=${currentVersion}` : ''}`
          )
        }
        className="px-6 py-3 bg-green-600 text-white border-none rounded cursor-pointer hover:bg-yellow-700"
      >
        Edit This Version
      </button>
      <Link
        href={`/policies/${policyId}/versions`}
        className="px-6 py-3 bg-blue-600 text-white border-none rounded cursor-pointer hover:bg-blue-700"
      >
        View Version History
      </Link>
      <Link
        href={`/policies/${policyId}/edit`}
        className="px-6 py-3 bg-yellow-600 text-white border-none rounded cursor-pointer hover:bg-yellow-700"
      >
        Edit Latest Version
      </Link>
    </div>
  )
}

