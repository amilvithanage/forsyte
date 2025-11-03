'use server'

import { policyService } from '@/services/policyService'

export async function createPolicy(customerId: string, templateId: string) {
  try {
    if (!customerId || !templateId) {
      throw new Error('customerId and templateId are required')
    }
    return await policyService.createPolicy(customerId, templateId)
  } catch (error: any) {
    console.error('Error creating policy:', error)
    if (error.code === 'P2002') {
      throw new Error('Policy already exists for this customer and template')
    }
    throw new Error(error.message || 'Failed to create policy')
  }
}

export async function listPolicies(customerId: string) {
  try {
    if (!customerId) {
      throw new Error('customerId is required')
    }
    return await policyService.listPolicies(customerId)
  } catch (error: any) {
    console.error('Error fetching policies:', error)
    throw new Error(error.message || 'Failed to fetch policies')
  }
}

export async function getPolicy(policyId: string) {
  try {
    const policy = await policyService.getPolicy(policyId)
    if (!policy) {
      throw new Error('Policy not found')
    }
    return policy
  } catch (error: any) {
    console.error('Error fetching policy:', error)
    throw new Error(error.message || 'Failed to fetch policy')
  }
}

