import { NextRequest, NextResponse } from 'next/server'
import { policyService } from '@/services/policyService'

export async function GET(
  request: NextRequest,
  { params }: { params: { policyId: string } }
) {
  try {
    const policy = await policyService.getPolicy(params.policyId)

    if (!policy) {
      return NextResponse.json(
        { error: 'Policy not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(policy)
  } catch (error) {
    console.error('Error fetching policy:', error)
    return NextResponse.json(
      { error: 'Failed to fetch policy' },
      { status: 500 }
    )
  }
}

