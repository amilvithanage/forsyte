import { NextRequest, NextResponse } from 'next/server'
import { policyVersionService } from '@/services/policyVersionService'

export async function GET(
  request: NextRequest,
  { params }: { params: { policyId: string } }
) {
  try {
    const version = await policyVersionService.getLatestPolicyVersion(params.policyId)

    if (!version) {
      return NextResponse.json(
        { error: 'No versions found for this policy' },
        { status: 404 }
      )
    }

    return NextResponse.json(version)
  } catch (error) {
    console.error('Error fetching latest policy version:', error)
    return NextResponse.json(
      { error: 'Failed to fetch latest policy version' },
      { status: 500 }
    )
  }
}

