import { NextRequest, NextResponse } from 'next/server'
import { policyService } from '@/services/policyService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerId, templateId } = body

    if (!customerId || !templateId) {
      return NextResponse.json(
        { error: 'customerId and templateId are required' },
        { status: 400 }
      )
    }

    const policy = await policyService.createPolicy(customerId, templateId)
    return NextResponse.json(policy, { status: 201 })
  } catch (error: any) {
    console.error('Error creating policy:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Policy already exists for this customer and template' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create policy' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get('customerId')

    if (!customerId) {
      return NextResponse.json(
        { error: 'customerId query parameter is required' },
        { status: 400 }
      )
    }

    const policies = await policyService.listPolicies(customerId)
    return NextResponse.json(policies)
  } catch (error) {
    console.error('Error fetching policies:', error)
    return NextResponse.json(
      { error: 'Failed to fetch policies' },
      { status: 500 }
    )
  }
}

