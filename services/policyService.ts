import { policyRepository } from '@/repositories/policyRepository'
import { Policy } from '@prisma/client'

export const policyService = {
  async createPolicy(customerId: string, templateId: string): Promise<Policy> {
    return policyRepository.create({ customerId, templateId })
  },

  async getPolicy(policyId: string): Promise<Policy | null> {
    return policyRepository.findById(policyId)
  },

  async listPolicies(customerId: string): Promise<Policy[]> {
    return policyRepository.findByCustomerId(customerId)
  },
}

