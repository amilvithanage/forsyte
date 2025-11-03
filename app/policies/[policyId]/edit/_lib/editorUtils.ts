import { PolicyVersion } from '@/types/policy'

export async function loadPolicyData(policyId: string): Promise<{
  policy: any | null
  latestVersion: PolicyVersion | null
}> {
  try {
    const [policyRes, latestRes] = await Promise.all([
      fetch(`/api/policies/${policyId}`),
      fetch(`/api/policies/${policyId}/versions/latest`),
    ])

    const policy = policyRes.ok ? await policyRes.json() : null
    const latestVersion = latestRes.ok ? await latestRes.json() : null

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
    const response = await fetch(`/api/policies/${policyId}/versions/${versionNumber}`)
    if (response.ok) {
      return await response.json()
    } else {
      // Fallback to latest version if specific version not found
      return fallbackLatestVersion || null
    }
  } catch (error) {
    console.error('Error loading version:', error)
    return fallbackLatestVersion || null
  }
}

