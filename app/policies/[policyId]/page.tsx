import { policyVersionService } from '@/services/policyVersionService'
import { PolicyViewerHeader } from './_components/PolicyViewerHeader'
import { PolicyViewerContent } from './_components/PolicyViewerContent'
import { PolicyViewerActions } from './_components/PolicyViewerActions'
import { PolicyVersion } from '@/types/policy'
import { getPolicy } from '../_lib/policyUtils'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getLatestVersion(policyId: string): Promise<PolicyVersion | null> {
  try {
    const version = await policyVersionService.getLatestPolicyVersion(policyId)
    if (!version) {
      return null
    }
    return {
      id: version.id,
      version: version.version,
      contentJson: version.contentJson,
      changeNote: version.changeNote,
      createdAt: version.createdAt.toISOString(),
    }
  } catch (error) {
    console.error('Error fetching latest version:', error)
    return null
  }
}

async function getVersionByNumber(
  policyId: string,
  versionNumber: number
): Promise<PolicyVersion | null> {
  try {
    const version = await policyVersionService.getPolicyVersionByPolicyAndVersion(
      policyId,
      versionNumber
    )
    if (!version) {
      return null
    }
    return {
      id: version.id,
      version: version.version,
      contentJson: version.contentJson,
      changeNote: version.changeNote,
      createdAt: version.createdAt.toISOString(),
    }
  } catch (error) {
    console.error('Error fetching version:', error)
    return null
  }
}

interface PolicyViewPageProps {
  params: { policyId: string }
  searchParams: { version?: string }
}

export default async function PolicyViewPage({ params, searchParams }: PolicyViewPageProps) {
  const { policyId } = params
  const versionParam = searchParams.version
    ? parseInt(searchParams.version, 10)
    : null

  const [policy, latestVersion] = await Promise.all([
    getPolicy(policyId, { includeSchemaJson: true }),
    getLatestVersion(policyId),
  ])

  if (!policy || !policy.template) {
    notFound()
  }

  // If version is specified, load that version; otherwise use latest
  let currentVersion: PolicyVersion | null = null
  if (versionParam && !isNaN(versionParam)) {
    currentVersion = await getVersionByNumber(policyId, versionParam)
    // Fallback to latest if specified version not found
    if (!currentVersion && latestVersion) {
      currentVersion = latestVersion
    }
  } else if (latestVersion) {
    currentVersion = latestVersion
  }

  const contentJson = currentVersion?.contentJson || {}
  const schemaJson = policy.template.schemaJson
  const sections = schemaJson?.sections || []

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <PolicyViewerHeader
        templateName={policy.template.name}
        customerId={policy.customerId}
        latestVersion={
          latestVersion
            ? {
                version: latestVersion.version,
                createdAt: latestVersion.createdAt,
              }
            : undefined
        }
        currentVersion={
          currentVersion
            ? {
                version: currentVersion.version,
              }
            : undefined
        }
        policyId={policyId}
      />
      <PolicyViewerContent
        sections={sections}
        contentJson={contentJson}
      />
      <PolicyViewerActions
        policyId={policyId}
        currentVersion={currentVersion?.version}
      />
    </main>
  )
}

