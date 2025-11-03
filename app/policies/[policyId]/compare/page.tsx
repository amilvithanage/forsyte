import { policyVersionService } from '@/services/policyVersionService'
import { CompareHeader } from './components/CompareHeader'
import { ComparisonView } from './components/ComparisonView'
import { PolicyVersion } from '@/types/policy'
import { getPolicy } from '../../_lib/policyUtils'
import { notFound, redirect } from 'next/navigation'

async function getVersionsByNumbers(
  policyId: string,
  version1: number,
  version2: number
): Promise<[PolicyVersion | null, PolicyVersion | null]> {
  try {
    const [v1, v2] = await Promise.all([
      policyVersionService.getPolicyVersionByPolicyAndVersion(policyId, version1),
      policyVersionService.getPolicyVersionByPolicyAndVersion(policyId, version2),
    ])

    return [
      v1
        ? {
            id: v1.id,
            version: v1.version,
            contentJson: v1.contentJson,
            changeNote: v1.changeNote,
            createdAt: v1.createdAt.toISOString(),
          }
        : null,
      v2
        ? {
            id: v2.id,
            version: v2.version,
            contentJson: v2.contentJson,
            changeNote: v2.changeNote,
            createdAt: v2.createdAt.toISOString(),
          }
        : null,
    ]
  } catch (error) {
    console.error('Error fetching versions:', error)
    return [null, null]
  }
}

interface ComparePageProps {
  params: { policyId: string }
  searchParams: { v1?: string; v2?: string }
}

export default async function ComparePage({ params, searchParams }: ComparePageProps) {
  const { policyId } = params
  const { v1: v1Param, v2: v2Param } = searchParams

  // Validate query parameters
  if (!v1Param || !v2Param) {
    redirect(`/policies/${policyId}/versions`)
  }

  const version1Num = parseInt(v1Param, 10)
  const version2Num = parseInt(v2Param, 10)

  if (isNaN(version1Num) || isNaN(version2Num)) {
    redirect(`/policies/${policyId}/versions`)
  }

  const [policy, [version1, version2]] = await Promise.all([
    getPolicy(policyId, { includeSchemaJson: true }),
    getVersionsByNumbers(policyId, version1Num, version2Num),
  ])

  if (!policy || !policy.template || !version1 || !version2) {
    notFound()
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <CompareHeader
        templateName={policy.template.name}
        version1={version1}
        version2={version2}
        policyId={policyId}
      />
      <ComparisonView
        version1={version1}
        version2={version2}
        schemaJson={policy.template.schemaJson}
      />
    </main>
  )
}
