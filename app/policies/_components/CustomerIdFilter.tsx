'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const DEFAULT_CUSTOMER_ID = 'customer-1'

export function CustomerIdFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [customerId, setCustomerId] = useState(
    searchParams.get('customerId')?.trim() || DEFAULT_CUSTOMER_ID
  )

  useEffect(() => {
    // Default customer ID on mount if not in URL
    const urlCustomerId = searchParams.get('customerId')?.trim()
    if (!urlCustomerId || urlCustomerId.length === 0) {
      router.replace(`/policies?customerId=${DEFAULT_CUSTOMER_ID}`)
    } else {
      setCustomerId(urlCustomerId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCustomerIdChange = (newCustomerId: string) => {
    setCustomerId(newCustomerId)
    router.push(`/policies?customerId=${newCustomerId}`)
  }

  return (
    <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <label>
        Customer ID:
        <input
          type="text"
          value={customerId}
          onChange={(e) => handleCustomerIdChange(e.target.value)}
          style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
        />
      </label>
    </div>
  )
}

