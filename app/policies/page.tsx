import { policyService } from '@/services/policyService'
import { PolicyTable } from './_components/PolicyTable'
import { PolicyHeader } from './_components/PolicyHeader'
import { CustomerIdFilter } from './_components/CustomerIdFilter'
import { Policy } from '@/types/policy'

export const dynamic = 'force-dynamic'

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
    <main className="p-8 max-w-5xl mx-auto">
      <PolicyHeader />
      <CustomerIdFilter />
      <PolicyTable policies={policies} />
    </main>
  )
}
