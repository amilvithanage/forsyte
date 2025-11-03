import { policyService } from '@/services/policyService'

interface GetPolicyOptions {
  includeSchemaJson?: boolean
}

interface PolicyResult {
  id: string
  customerId: string
  template: {
    id: string
    name: string
    schemaJson?: any
  }
}

export async function getPolicy(
  policyId: string,
  options: GetPolicyOptions = {}
): Promise<PolicyResult | null> {
  try {
    const policy = await policyService.getPolicy(policyId)
    if (!policy) {
      return null
    }
    const policyWithTemplate = policy as typeof policy & {
      template: { id: string; name: string; schemaJson?: any }
    }
    
    const basePolicy: PolicyResult = {
      id: policyWithTemplate.id,
      customerId: policyWithTemplate.customerId,
      template: {
        id: policyWithTemplate.template.id,
        name: policyWithTemplate.template.name,
        ...(options.includeSchemaJson && {
          schemaJson: policyWithTemplate.template.schemaJson,
        }),
      },
    }
    
    return basePolicy
  } catch (error) {
    console.error('Error fetching policy:', error)
    return null
  }
}

