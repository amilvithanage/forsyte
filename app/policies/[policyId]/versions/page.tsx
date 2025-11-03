import { policyVersionService } from '@/services/policyVersionService'
import { VersionHistoryHeader } from './components/VersionHistoryHeader'
import { CompareVersions } from './components/CompareVersions'
import { VersionTable } from './components/VersionTable'
import { PolicyVersion } from '@/types/policy'
import { getPolicy } from '../../_lib/policyUtils'
import { notFound } from 'next/navigation'

async function getVersions(policyId: string): Promise<PolicyVersion[]> {
  try {
    const versions = await policyVersionService.listPolicyVersions(policyId)
    return versions.map((version) => ({
      id: version.id,
      version: version.version,
      contentJson: version.contentJson,
      changeNote: version.changeNote,
      createdAt: version.createdAt.toISOString(),
    }))
  } catch (error) {
    console.error('Error fetching versions:', error)
    return []
  }
}

interface VersionHistoryPageProps {
  params: { policyId: string }
}

export default async function VersionHistoryPage({ params }: VersionHistoryPageProps) {
  const { policyId } = params

  const [policy, versions] = await Promise.all([
    getPolicy(policyId),
    getVersions(policyId),
  ])

  if (!policy || !policy.template) {
    notFound()
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <VersionHistoryHeader templateName={policy.template.name} policyId={policyId} />
      <CompareVersions versions={versions} policyId={policyId} />
      <VersionTable versions={versions} policyId={policyId} />
    </main>
  )
}
