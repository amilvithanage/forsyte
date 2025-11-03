import { PolicyVersion } from '@/types/policy'
import { getPolicy } from '@/app/policies/actions'
import { getLatestPolicyVersion, getPolicyVersionByNumber } from '../../actions'

export async function loadPolicyData(policyId: string): Promise<{
  policy: any | null
  latestVersion: PolicyVersion | null
}> {
  try {
    const [policy, latestVersionData] = await Promise.all([
      getPolicy(policyId).catch(() => null),
      getLatestPolicyVersion(policyId).catch(() => null),
    ])

    const latestVersion: PolicyVersion | null = latestVersionData
      ? {
          id: latestVersionData.id,
          version: latestVersionData.version,
          contentJson: latestVersionData.contentJson,
          changeNote: latestVersionData.changeNote,
          createdAt:
            latestVersionData.createdAt instanceof Date
              ? latestVersionData.createdAt.toISOString()
              : latestVersionData.createdAt,
        }
      : null

    return { policy, latestVersion }
  } catch (error) {
    console.error('Error loading policy data:', error)
    return { policy: null, latestVersion: null }
  }
}

export async function loadVersionData(
  policyId: string,
  versionNumber: number,
  fallbackLatestVersion?: PolicyVersion | null
): Promise<PolicyVersion | null> {
  try {
    const versionData = await getPolicyVersionByNumber(policyId, versionNumber)
    return {
      id: versionData.id,
      version: versionData.version,
      contentJson: versionData.contentJson,
      changeNote: versionData.changeNote,
      createdAt:
        versionData.createdAt instanceof Date
          ? versionData.createdAt.toISOString()
          : versionData.createdAt,
    }
  } catch (error) {
    console.error('Error loading version:', error)
    // Fallback to latest version if specific version not found
    return fallbackLatestVersion || null
  }
}

