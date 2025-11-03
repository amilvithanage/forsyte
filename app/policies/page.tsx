import { policyService } from '@/services/policyService'
import { PolicyTable } from './components/PolicyTable'
import { PolicyHeader } from './components/PolicyHeader'
import { CustomerIdFilter } from './components/CustomerIdFilter'
import { Policy } from '@/types/policy'

async function getPolicies(customerId: string): Promise<Policy[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const policies = await policyService.listPolicies(customerId)
    return policies.map((policy) => {
      const policyWithTemplate = policy as typeof policy & {
        template: { id: string; name: string }
      }
      return {
        id: policyWithTemplate.id,
        customerId: policyWithTemplate.customerId,
        templateId: policyWithTemplate.templateId,
        createdAt: policyWithTemplate.createdAt.toISOString(),
        template: {
          id: policyWithTemplate.template.id,
          name: policyWithTemplate.template.name,
        },
      }
    })
  } catch (error) {
    console.error('Error fetching policies:', error)
    return []
  }
}

interface PoliciesPageProps {
  searchParams: { customerId?: string }
}

export default async function PoliciesPage({ searchParams }: PoliciesPageProps) {
  const customerId = searchParams.customerId?.trim() || 'customer-1'
  const policies = await getPolicies(customerId)

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <PolicyHeader />
      <CustomerIdFilter />
      <PolicyTable policies={policies} />
    </main>
  )
}
