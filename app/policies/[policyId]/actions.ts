'use server'

import { policyVersionService } from '@/services/policyVersionService'

export async function createPolicyVersion(
  policyId: string,
  contentJson: any,
  changeNote?: string | null
) {
  try {
    if (!contentJson) {
      throw new Error('contentJson is required')
    }
    return await policyVersionService.createPolicyVersion(
      policyId,
      contentJson,
      changeNote
    )
  } catch (error: any) {
    console.error('Error creating policy version:', error)
    throw new Error(error.message || 'Failed to create policy version')
  }
}

export async function listPolicyVersions(policyId: string) {
  try {
    return await policyVersionService.listPolicyVersions(policyId)
  } catch (error: any) {
    console.error('Error fetching policy versions:', error)
    throw new Error(error.message || 'Failed to fetch policy versions')
  }
}

export async function getLatestPolicyVersion(policyId: string) {
  try {
    const version = await policyVersionService.getLatestPolicyVersion(policyId)
    if (!version) {
      throw new Error('No versions found for this policy')
    }
    return version
  } catch (error: any) {
    console.error('Error fetching latest policy version:', error)
    throw new Error(error.message || 'Failed to fetch latest policy version')
  }
}

export async function getPolicyVersionByNumber(
  policyId: string,
  version: number
) {
  try {
    if (isNaN(version)) {
      throw new Error('Invalid version number')
    }
    const versionData = await policyVersionService.getPolicyVersionByPolicyAndVersion(
      policyId,
      version
    )
    if (!versionData) {
      throw new Error('Policy version not found')
    }
    return versionData
  } catch (error: any) {
    console.error('Error fetching policy version:', error)
    throw new Error(error.message || 'Failed to fetch policy version')
  }
}

