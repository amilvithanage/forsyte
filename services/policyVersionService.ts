import { policyVersionRepository } from '@/repositories/policyVersionRepository'
import { PolicyVersion } from '@prisma/client'

export const policyVersionService = {
  async createPolicyVersion(
    policyId: string,
    contentJson: any,
    changeNote?: string | null
  ): Promise<PolicyVersion> {
    const nextVersion = await policyVersionRepository.getNextVersionNumber(policyId)
    return policyVersionRepository.create({
      policyId,
      version: nextVersion,
      contentJson,
      changeNote: changeNote || null,
    })
  },

  async listPolicyVersions(policyId: string): Promise<PolicyVersion[]> {
    return policyVersionRepository.findByPolicyId(policyId)
  },

  async getPolicyVersion(policyVersionId: string): Promise<PolicyVersion | null> {
    return policyVersionRepository.findById(policyVersionId)
  },

  async getPolicyVersionByPolicyAndVersion(
    policyId: string,
    version: number
  ): Promise<PolicyVersion | null> {
    return policyVersionRepository.findByPolicyIdAndVersion(policyId, version)
  },

  async getLatestPolicyVersion(policyId: string): Promise<PolicyVersion | null> {
    return policyVersionRepository.getLatestVersion(policyId)
  },
}

